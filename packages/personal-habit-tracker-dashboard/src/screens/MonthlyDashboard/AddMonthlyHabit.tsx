import React from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import HabitSuggestion from "../../components/HabitSuggestion";
import FormGroup from "../../components/FormGroup";
import networkHelper from "../../services/network-helper";
import Habit from "../../types/habit.interface";
import FormField from "../../components/FormField";
import "./addmonthlyhabit.css";
import "../formComponents.css";

interface AddMonthlyHabitProps {
  location: {
    search: string;
  };
  history: string[];
}

interface AddMonthlyHabitState {
  name: string;
  description: string;
  category: string;
  target: string;
  existing_habits: Habit[];
  filter_obj: string;
  year: string;
  currentMonthIndex: number;
  msg: string;
  month: string;
  categories: string[];
}

class AddMonthlyHabit extends React.Component<
  AddMonthlyHabitProps,
  AddMonthlyHabitState
> {
  constructor(props: AddMonthlyHabitProps) {
    super(props);
    this.state = {
      name: "",
      description: "To be removed",
      category: "",
      target: "1",
      existing_habits: [],
      filter_obj: `{"where": {"target_month": "${moment()
        .subtract(0, "month")
        .format("MMMM")}"}}`,
      year: "",
      currentMonthIndex: parseInt(moment().format("M"), 10) - 1, // Seems to be 0 indexed
      msg: "",
      month: moment().format("MMMM"),
      categories: []
    };
  }

  componentDidMount() {
    this.getHabits();
    const params = new URLSearchParams(this.props.location.search);
    this.setState({ month: params.get("month"), year: params.get("year") });
  }

  getHabits = async () => {
    const results: Habit[] = await networkHelper.fetchHelper(
      `${process.env.REACT_APP_API_ENDPOINT}/api/occurrence_habits?filter=${
        this.state.filter_obj
      }`
    );
    this.setState({
      existing_habits: results,
      categories: [...new Set(results.map(result => result.category))]
    });
  };

  onSubmit = e => {
    e.preventDefault();

    const { name, description, category, target, month, year } = this.state;

    // TODO: Add Habit Type
    const newHabit = {
      name,
      description,
      type: "Monthly",
      category,
      target: parseInt(target, 10),
      lastUpdated: [],
      completed: 0,
      month,
      year
    };

    this.addHabit(newHabit);
  };

  handleSelectedHabit = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    this.setState({
      name: e.target.getAttribute("data-name"),
      category: e.target.getAttribute("data-category"),
      target: e.target.getAttribute("data-target")
    });
  };

  addHabit = async habit => {
    const requestObj = {
      method: "POST",
      body: JSON.stringify(habit)
    };

    const response = await networkHelper.fetchHelper(
      `${process.env.REACT_APP_API_ENDPOINT}/api/occurrence_habits`,
      requestObj
    );
    if (response.success === false) {
      this.setState({ msg: response.msg });
    } else {
      this.props.history.push(
        `/?month=${this.state.month}&year=${this.state.year}`
      );
    }
  };

  handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    // Any needs to be set because of this: https://stackoverflow.com/questions/46305939/dynamic-object-key-with-typescript-in-react-event-handler
    this.setState({ [name]: value } as any);
  };

  setCategory = (e, category: string) => {
    e.preventDefault();
    this.setState({ category });
  };

  render() {
    const msgDisplaying =
      this.state.msg.length > 0 ? (
        <div className="alert alert-danger text-center">{this.state.msg}</div>
      ) : (
        ""
      );
    const { name, category, target, month, currentMonthIndex } = this.state;
    return (
      <React.Fragment>
        <div className="btn__container">
          <Link
            to={{
              pathname: "/",
              search: `month=${this.state.month}&year=${this.state.year}`
            }}
            className="btn btn__info"
          >
            Back
          </Link>
        </div>

        <div className="addhabit__title">
          <h1>Add Habit</h1>
        </div>

        {msgDisplaying}
        <div className="form__container">
          <div className="form__container__item">
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
                    className="btn btn-info mr-2 mt-2"
                    onClick={e => this.setCategory(e, category)}
                  >
                    {category}{" "}
                  </button>
                ))}
              </FormGroup>
              <FormGroup>
                <label htmlFor="habit_mon">Month of Habit:</label>
                <select
                  className="form__control"
                  name="month"
                  value={month}
                  onChange={this.handleInputChange}
                  required
                >
                  <option disabled>Choose Month</option>
                  {[0, 1, 2, 3, 4, 5].map(val => (
                    <option
                      key={val}
                      value={moment.months(currentMonthIndex + val)}
                    >
                      {moment.months(currentMonthIndex + val)}
                    </option>
                  ))}
                </select>
              </FormGroup>
              <FormGroup>
                <FormField
                  label="How many days do you want to do this habit?"
                  type="number"
                  name="target"
                  step="1"
                  min="1"
                  max="30"
                  placeholder="1"
                  value={target}
                  onChange={this.handleInputChange}
                  required
                />
              </FormGroup>

              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </form>
          </div>
          <div className="habit__suggestions">
            <div className="row">
              {this.state.existing_habits.map(habit => (
                <HabitSuggestion
                  key={habit._id}
                  habit={habit}
                  onSelect={this.handleSelectedHabit}
                />
              ))}
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default AddMonthlyHabit;
