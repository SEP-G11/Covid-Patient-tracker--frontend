import React,{useState,useEffect} from 'react';
import { HorizontalBar } from 'react-chartjs-2';

const buildChartData = (data,countryInfo,rateType) => {
    let countryArr = [];
    let valueArr = [];
    countryArr.push(data[0].country);countryArr.push("Sri Lanka");
    switch (rateType) {
        case "recoveries":
            valueArr.push(((data[0].recovered/data[0].cases)*100).toFixed(2));
            valueArr.push(((countryInfo.recovered/countryInfo.cases)*100).toFixed(2));
            return {countryArr,valueArr};
        case "fatalities":
            valueArr.push(((data[0].deaths/data[0].cases)*100).toFixed(2));
            valueArr.push(((countryInfo.deaths/countryInfo.cases)*100).toFixed(2));
            return {countryArr,valueArr};
        default:
            valueArr.push(((data[0].recovered/data[0].cases)*100).toFixed(2));
            valueArr.push(((countryInfo.recovered/countryInfo.cases)*100).toFixed(2));
            return {countryArr,valueArr};
    }
};

const options = {
    indexAxis: 'y',
    // Elements options apply to all of the options unless overridden in a dataset
    // In this case, we are setting the border of each horizontal bar to be 2px wide
    elements: {
        bar: {
            borderWidth: 1,
        },
    },
    maintainAspectRatio: false,
    legend: {
        display: false
    },
    scales: {
        yAxes: [{
            categoryPercentage: 1.0,
            barPercentage: 1.0,
            barThickness: 40,
            gridLines: {
                display: false,

            }
        }],
        xAxes: [{
            gridLines: {
                drawBorder: false,

            }
        }],
    }
};

const GlobalGraph = ({rateType,countryInfo, ...props}) => {
    const [data,setData] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            fetch('https://coronavirus-19-api.herokuapp.com/countries')
                .then(response => response.json())
                .then(data => {
                    //console.log(data);
                    const chartData = buildChartData(data,countryInfo,rateType
                    );
                    setData(chartData);
                    //console.log(chartData)
                });
        };
        fetchData();
    },[rateType,countryInfo]);


    return (
        <div>
            <HorizontalBar data={{
                labels: data.countryArr,
                datasets: [
                    {
                        label: rateType==='recoveries'?'Recovery Rate': 'Fatality Rate'  ,
                        data: data.valueArr,
                        backgroundColor: [
                            'rgba(249, 136, 71, 0.8)',
                            rateType==='recoveries'?'rgba(121, 202, 33, 0.8)':'rgba(228, 73, 77, 0.8)',
                        ],
                        borderColor: [
                            'rgba(249, 136, 71, 1)',
                            rateType==='recoveries'?'rgba(121, 202, 33, 1)':'rgba(228, 73, 77, 1)',
                        ],
                        borderWidth: 1,
                    }
                ]
            }
            }
                           options={options}
            />
        </div>
    );
};

export default GlobalGraph;
