import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import FormGroup from "../../components/FormGroup";
import FormField from "../../components/FormField";
import networkHelper from "../../services/network-helper";
import "../formComponents.css";

interface EditState {
  id: string;
  name: string;
  description: string;
  category: string;
  type: string;
  month: string;
  days: string;
  completed: number;
  year: string;
  lastUpdated: [];
  endDate: string;
  referrer: string;
}

interface EditProps {
  match: {
    params: {
      id: string;
    };
  };
  history: string[];
}

class EditHabit extends React.Component<EditProps, EditState> {
  constructor(props: EditProps) {
    super(props);
    this.state = {
      id: "",
      name: "",
      description: "",
      category: "",
      type: "",
      month: "",
      days: "0",
      completed: 0,
      year: "",
      lastUpdated: [],
      endDate: "",
      referrer: ""
    };
  }

  componentDidMount() {
    this.setState(
      {
        id: this.props.match.params.id
      },
      () => {
        this.getHabitById();
      }
    );
  }

  onSubmit = async e => {
    e.preventDefault();
    const {
      name,
      description,
      type,
      category,
      days,
      completed,
      month,
      lastUpdated,
      year,
      endDate
    } = this.state;

    const editedHabit = {
      name,
      description,
      type,
      category,
      target: parseInt(days, 10),
      completed,
      month,
      lastUpdated,
      year,
      endDate: moment(endDate).format("X")
    };

    const requestObj = {
      method: "PUT",
      body: JSON.stringify(editedHabit)
    };

    await networkHelper.fetchHelper(
      `${process.env.REACT_APP_API_ENDPOINT}/api/occurrence_habits/${
        this.state.id
      }`,
      requestObj
    );
    if (this.state.type === "challenge") {
      this.props.history.push("/challenge");
    } else {
      this.props.history.push("/");
    }
  };

  getHabitById = async () => {
    const {
      name,
      description,
      type,
      category,
      month,
      target,
      completed,
      lastUpdated,
      year,
      endDate
    } = await networkHelper.fetchHelper(
      `${process.env.REACT_APP_API_ENDPOINT}/api/occurrence_habits/${
        this.state.id
      }`
    );
    this.setState({
      name,
      description,
      type,
      category,
      month,
      days: target,
      completed,
      lastUpdated,
      year,
      endDate: moment.unix(endDate).format("YYYY-MM-DD"),
      referrer: type === "challenge" ? "/challenge" : "/"
    });
  };

  handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    } as any);
  };

  render() {
    return (
      <React.Fragment>
        <div className="btn__container">
          <Link
            to={{
              pathname: this.state.referrer,
              search: `month=${this.state.month}`
            }}
            className="btn btn__info"
          >
            Back
          </Link>
        </div>
        <div className="addhabit__title">
          <h1>Edit Habit</h1>
        </div>
        <div className="form__container">
          <div className="form__container__item">
            <form onSubmit={this.onSubmit}>
              <FormGroup>
                <FormField
                  label="Habit Name:"
                  name="name"
                  placeholder="Habit Name e.g. Wake up before 8am each day"
                  value={this.state.name}
                  onChange={this.handleInputChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <FormField
                  label="Description:"
                  name="description"
                  placeholder="Why do you want to complete it?"
                  value={this.state.description}
                  onChange={this.handleInputChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <FormField
                  label="Category:"
                  name="category"
                  placeholder="Why do you want to complete it?"
                  value={this.state.category}
                  onChange={this.handleInputChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <label>Month of Habit: {this.state.month}</label>
              </FormGroup>
              {this.state.type === "Challenge" && (
                <FormGroup>
                  <FormField
                    type="date"
                    label="When would you like to achieve this by?"
                    name="endDate"
                    value={this.state.endDate}
                    onChange={this.handleInputChange}
                    required
                  />
                </FormGroup>
              )}
              <FormGroup>
                <FormField
                  type="number"
                  label="How many days do you want to do this habit?"
                  name="days"
                  value={this.state.days}
                  onChange={this.handleInputChange}
                  step="1"
                  min="1"
                  required
                />
              </FormGroup>
              <button type="submit" className="btn btn__submit">
                Update Habit
              </button>
            </form>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default EditHabit;
