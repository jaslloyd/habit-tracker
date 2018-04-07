import React from 'react';
import PropTypes from 'prop-types';

const DashboardControls = ({ onMonthChange, displayedMonth, displayedYear }) => (
  <div className="row">
    <div className="col-3">
      <i onClick={e => onMonthChange(e)} data-operation="+1" className="mr-3 fa fa-chevron-left btn-link" aria-hidden="true" role="button" />
    </div>
    <div className="col-6">
      <span className="header-title-big">
        {displayedMonth} - {displayedYear}
      </span>
    </div>
    <div className="col-3">
      <i onClick={e => onMonthChange(e)} data-operation="-1" className="ml-3 fa fa-chevron-right btn-link" aria-hidden="true" role="button" />
    </div>
  </div>
);

DashboardControls.propTypes = {
  onMonthChange: PropTypes.func.isRequired,
  displayedMonth: PropTypes.string.isRequired,
  displayedYear: PropTypes.string.isRequired,
};

export default DashboardControls;
