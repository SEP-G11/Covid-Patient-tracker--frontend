import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import numeral from "numeral";

const options = {
    legend: {
        position: 'bottom',
        labels: {
            usePointStyle: true,
        },
    },
    tooltips: {
        callbacks: {
            label: function (tooltipItem,data) {
                let idx = tooltipItem.index;
                let caseType = data.labels[idx]+": ";
                return caseType+numeral(data.datasets[0].data[idx]).format("0,0");
            },
        }
    }

};

const BreakdownGraph = ({info,...props}) => {

    const data = {
        labels: ['Active','Recoveries', 'Deaths'],
        datasets: [
            {
                data: [info.active, info.recovered,info.deaths],
                backgroundColor: [
                    "#0384c5",
                    "#79ca53",
                    "#e4494d"
                ],
                borderWidth: 1,
            },
        ],
    };

    return (
        <div>
            <Doughnut data={data} options={options} />
        </div>
    );
};

export default BreakdownGraph;
