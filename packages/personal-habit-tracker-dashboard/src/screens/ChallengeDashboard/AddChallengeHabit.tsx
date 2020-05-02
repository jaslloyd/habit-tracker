import React, { Component, Fragment } from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import HabitSuggestion from "../../components/HabitSuggestion";
import FormGroup from "../../components/FormGroup";
import networkHelper from "../../services/network-helper";
import Habit from "../../types/habit.interface";
import FormField from "../../components/FormField";
import "./addChallengeHabit.css";
import "../formComponents.css";

interface AddChallengeProps {
  history: string[];
}

interface AddChallengeState {
  name: string;
  description: string;
  category: string;
  target: string;
  existing_habits: Habit[];
  msg: string;
  endDate: string;
  reward: string;
  categories: string[];
}

class AddChallengeHabit extends React.Component<
  AddChallengeProps,
  AddChallengeState
> {
  constructor(props: AddChallengeProps) {
    super(props);
    this.state = {
      name: "",
      description: "",
      category: "",
      target: "5",
      existing_habits: [],
      msg: "",
      endDate: "",
      reward: "",
      categories: []
    };
  }

  componentDidMount() {
    this.getHabits();
  }

  onSubmit = async e => {
    e.preventDefault();

    const { name, description, category, target, endDate, reward } = this.state;

    const newHabit = {
      name,
      description,
      type: "Challenge",
      category,
      reward,
      target: parseInt(target, 10),
      lastUpdated: [],
      completed: 0,
      month: "",
      year: `${moment().format("YYYY")}`,
      endDate: moment(endDate).format("X")
    };

    this.addHabit(newHabit);
  };

  getHabits = async () => {
    const results: Habit[] = await networkHelper.fetchHelper(
      `${
        process.env.REACT_APP_API_ENDPOINT
      }/api/occurrence_habits?type=Challenge`
    );
    this.setState({
      existing_habits: results,
      categories: [...new Set(results.map(result => result.category))]
    });
  };

  addHabit = async habit => {
    const requestObj = {
      method: "POST",
      body: JSON.stringify(habit)
    };

    await networkHelper.fetchHelper(
      `${process.env.REACT_APP_API_ENDPOINT}/api/occurrence_habits/challenge`,
      requestObj
    );
    this.props.history.push("/challenge");
  };

  handleInputChange = e => {
    const { name, value } = e.target;
    if (this.isValidInput(name, value)) {
      this.setState({ [name]: value } as any);
    }
  };

  isValidInput(input, value) {
    if (input === "endDate") {
      // Check if it is impossible to complete the habit by comparing the date the user wants to complete the habit and how many days they want to complete this challenge.
      // todo: still has issues with 1 day...
      const startDateIncludingTarget = moment()
        .add(this.state.target, "day")
        .format("X");
      const endDate = moment(value)
        .endOf("day")
        .format("X");

      if (startDateIncludingTarget > endDate) {
        this.setState({
          msg: `You cannot complete ${this.state.target} days before ${moment(
            value
          ).format("DD-MM-YYYY")}`
        });
        return false;
      }
    }
    return true;
  }

  handleSelectedHabit = e => {
    this.setState({
      name: e.target.getAttribute("data-name"),
      category: e.target.getAttribute("data-category"),
      target: e.target.getAttribute("data-target")
    });
    e.preventDefault();
  };

  fillCategory = (e, category: string) => {
    e.preventDefault();
    this.setState({
      category
    });
  };

  render() {
    const {
      name,
      category,
      target,
      endDate,
      reward,
      msg,
      existing_habits
    } = this.state;
    return (
      <Fragment>
        <div className="btn__container">
          <Link to="/challenge" className="btn btn__info">
            Back
          </Link>
        </div>

        <div className="addhabit__title">
          <h1>Add Habit</h1>
        </div>

        {msg.length > 0 ? (
          <div className="alert alert-info text-center">{msg}</div>
        ) : (
          ""
        )}
        <div className="form__container">
          <div className="col-md-8 col-sm-12 form__container__item">
            <form onSubmit={this.onSubmit}>
              <FormGroup>
                <FormField
                  label="Habit Name:"
                  name="name"
                  placeholder="Habit Name e.g. Wake up before 8am each day"
                  value={name}
                  onChange={this.handleInputChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <FormField
                  label="Category:"
                  name="category"
                  placeholder="Health / Finance / Career"
                  value={category}
                  onChange={this.handleInputChange}
                  required
                />
                {this.state.categories.map(category => (
                  <button
                    key={category}
                    className="btn btn__info"
                    onClick={e => this.fillCategory(e, category)}
                  >
                    {category}
                  </button>
                ))}
              </FormGroup>
              <FormGroup>
                <FormField
                  label="How many days do you want to do this challenge?"
                  type="number"
                  name="target"
                  placeholder="1"
                  step="1"
                  min="1"
                  value={target}
                  onChange={this.handleInputChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <FormField
                  label="When would you like to achieve this by?"
                  type="date"
                  name="endDate"
                  value={endDate}
                  onChange={this.handleInputChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <FormField
                  label="Reward for completing this challenge:"
                  name="reward"
                  value={reward}
                  onChange={this.handleInputChange}
                  required
                />
              </FormGroup>
              <button type="submit" className="btn btn__submit">
                Submit
              </button>
            </form>
          </div>
          <div className="habit__suggestions">
            {existing_habits.map(habit => (
              <HabitSuggestion
                key={habit._id}
                habit={habit}
                onSelect={this.handleSelectedHabit}
              />
            ))}
          </div>
        </div>
      </Fragment>
    );
  }
}

export default AddChallengeHabit;
