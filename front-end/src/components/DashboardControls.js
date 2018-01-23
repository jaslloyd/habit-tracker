import React from 'react';
import PropTypes from 'prop-types';

const DashboardControls = props => (
  <div className="row">
    <div className="col-3">
      <i onClick={e => props.onMonthChange(e)} data-operation="+1" className="mr-3 fa fa-chevron-left btn-link" aria-hidden="true" role="button" />
    </div>
    <div className="col-6">
      <span className="header-title-big">
        {props.displayedMonth} - {props.displayedYear}
      </span>
    </div>
    <div className="col-3">
      <i onClick={e => props.onMonthChange(e)} data-operation="-1" className="ml-3 fa fa-chevron-right btn-link" aria-hidden="true" role="button" />
    </div>
  </div>
);

DashboardControls.propTypes = {

};
export default DashboardControls;
