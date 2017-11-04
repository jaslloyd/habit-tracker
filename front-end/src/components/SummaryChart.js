import React, { Component } from 'react';
import { Chart } from 'react-google-charts';

class SummaryChart extends Component {

    state = {
        'name': this.props.habitDetails.name,
        'successes': this.props.habitDetails.total_completions,
        'fails': this.props.habitDetails.total_target - this.props.habitDetails.total_completions
    }

    render(){
        let success_arr = ['Success', this.state.successes]
        let fails_arr = ['Fails', this.state.fails]

        return (
            <div className={'my-pretty-chart-container'}>
                <Chart
                chartType="PieChart"
                data={[
                    ['Target', 'Completed'], 
                    [...success_arr],
                    [...fails_arr]
                    ]}
                options={{
                    'pieHole': 0.4,
                    'pieSliceTextStyle': {
                        color: 'white',
                    },
                    'slices': {
                        0: { color: 'green' },
                        1: { color: 'red' }
                    },
                    'backgroundColor': 'transparent',
                    'legend': 'none'
                }}
                graph_id={this.state.name}
                width="100%"
                height="200px"
                legend_toggle
                />
            </div>
        );
    }
}

export default SummaryChart;