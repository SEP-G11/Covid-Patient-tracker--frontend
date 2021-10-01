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

const BedsGraph = ({info,type,...props}) => {
    let graphData;
    if (type==='Covid'){
        graphData = [info.covidOccupied,(info.totalCovid-info.covidOccupied)]
    }
    else if (type==='Normal'){
        graphData = [info.normalOccupied,(info.totalNormal-info.normalOccupied)];
    }
    else if (type==='Total'){
        graphData = [info.normalOccupied+info.covidOccupied,(info.totalNormal-info.normalOccupied)+(info.totalCovid-info.covidOccupied)];
    }

   // const graphData = type==='Covid' ? [info.covidOccupied,(info.totalCovid-info.covidOccupied)]: [info.normalOccupied,(info.totalNormal-info.normalOccupied)];


    const data = {
        labels: ['Used','Vacant'],
        datasets: [
            {
                data: graphData,
                backgroundColor: [
                    "#0384c5",
                    "#79ca53",
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

export default BedsGraph;
