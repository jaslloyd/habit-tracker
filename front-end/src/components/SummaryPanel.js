import React from 'react';
import SummaryChart from './SummaryChart';

const SummaryPanel = ({habit}) => (
    <div className="col-sm-2 mb-2">
        <div className="card text-white bg-inverse p-4">
            <div className="card-body">
                <h4 className="card-title">{habit.name}</h4>
                {/* <h6 className="card-subtitle mb-2 text-muted">[Desc here]</h6> */}
                <p className="card-text">
                    Total: {habit.total_completions} / {habit.total_target}
                </p>
                <SummaryChart habitDetails={habit} />
            </div>
        </div>
    </div>
);

export default SummaryPanel;