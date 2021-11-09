import React,{useState,useEffect} from 'react';
import { Bar } from 'react-chartjs-2';
import numeral from 'numeral';
import {API_URL} from '../config';

const buildChartData = (data) => {
    let labels= [];
    let datasets = [
        {
            label: 'PCR Tests',
            data: [],
            backgroundColor: '#f98847',
        },
        {
            label: 'Rapid Antigen Tests',
            data: [],
            backgroundColor: '#0384c5',
        }
    ];
    for (let date in data.results) {
        labels.push(date);
        datasets[0].data.push(data.results[date].pcr);
        datasets[1].data.push(data.results[date].rat);

    }
    //Math.random() * (18000 - 10000) + 10000
    return {labels,datasets};
};

const options = {
    legend: {
        position: 'bottom',
    },
    scales: {
        xAxes: [
            {
                type: "time",
                time: {
                    format: "MM/DD/YY",
                    tooltipFormat: "ll",
                },
                offset: true
            },
        ],
        yAxes: [
            {
                gridLines: {
                    display: false,
                },
                ticks: {
                    // Include a dollar sign in the ticks
                    callback: function (value, index, values) {
                        return numeral(value).format("0a");
                    },
                },
            },
        ],
    },
    tooltips: {
        mode: "x",
        intersect: false,
        callbacks: {
            label: function (tooltipItem,data) {
                return (tooltipItem.datasetIndex===0?'PCR: ':'RAT: ')+numeral(tooltipItem.value).format("0,0");
            },
        },
    },
};


const TestsGraph = ({...props}) => {

    const [data,setData] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            fetch(`${API_URL}/moh/historical/tests?lastdays=30`)
                .then(response => response.json())
                .then(data => {
                    const chartData = buildChartData(data);
                    setData(chartData);
                });
        };
        fetchData();
    },[]);

    return (
        <div className={props.className}>
            <Bar data={data} options={options} />
        </div>
    );
};

export default React.memo(TestsGraph);
