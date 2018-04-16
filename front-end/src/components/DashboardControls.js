import React from 'react';
import PropTypes from 'prop-types';

const DashboardControls = ({ onMonthChange, displayedMonth, displayedYear }) => (
  <div className="row">
    <div className="col-3">
      <button onClick={e => onMonthChange(e)} className="btn-link"  data-operation="+1" aria-hidden="true">
        Prev
      </button>
    </div>
    <div className="col-6">
      <span className="header-title-big">
        {displayedMonth} - {displayedYear}
      </span>
    </div>
    <div className="col-3">
      <button onClick={e => onMonthChange(e)} className="btn-link" data-operation="-1">
        Next
      </button>
    </div>
  </div>
);

DashboardControls.propTypes = {
  onMonthChange: PropTypes.func.isRequired,
  displayedMonth: PropTypes.string.isRequired,
  displayedYear: PropTypes.string.isRequired,
};

export default DashboardControls;
