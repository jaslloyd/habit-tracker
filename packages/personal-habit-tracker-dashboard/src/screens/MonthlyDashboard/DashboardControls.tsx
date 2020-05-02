import React from "react";
import "./dashboardControls.css";

interface ControlProps {
  onMonthChange: any;
  displayedMonth: string;
  displayedYear: string;
}

const DashboardControls: React.SFC<ControlProps> = ({
  onMonthChange,
  displayedMonth,
  displayedYear
}) => (
  <div className="dashboard__controls">
    <div className="dashboard__prevbtn">
      <button
        onClick={onMonthChange}
        className="btn-link "
        data-operation="+1"
        aria-hidden="true"
      >
        Prev
      </button>
    </div>
    <div className="dashboard__dates">
      <span className="header__title--big">
        {displayedMonth} - {displayedYear}
      </span>
    </div>
    <div className="dashboard__nextbtn">
      <button onClick={onMonthChange} className="btn-link" data-operation="-1">
        Next
      </button>
    </div>
  </div>
);

export default DashboardControls;
