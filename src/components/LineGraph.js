import React,{useState,useEffect} from 'react';
import { Line } from 'react-chartjs-2';
import { useSelector } from 'react-redux';
import numeral from 'numeral';

const options = {
    legend: {
        display: false,
    },
    elements: {
        point: {
            radius: 0,
        },
    },
    maintainAspectRatio: false,
    tooltips: {
        mode: "index",
        intersect: false,
        callbacks: {
            label: function (tooltipItem,data) {
                return numeral(tooltipItem.value).format("+0,0");
            },
        },
    },
    scales: {
        xAxes: [
            {
                type: "time",
                time: {
                    format: "MM/DD/YY",
                    tooltipFormat: "ll",
                },
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
    }
};

const buildChartData = (data) => {
    const chartData = [];
    for (let date in data.results) {
        let newDataPoint = {
            x: date,
            y: data.results[date]
        };
        chartData.push(newDataPoint);
    }
    return chartData;
};


const LineGraph = ({casesType='cases', ...props}) => {
    const [data,setData] = useState({});

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    let url = `http://localhost:8000/moh/`;
    if (props.facilities){
        url+=`facilities/historical?lastdays=30&type=${casesType}`
    }
    else {
        url += `historical/${casesType}?lastdays=30`;
    }
    if (props.facilityId){
        url += `&facility=${props.facilityId}`
    }

    let config={};
    if (props.protected){
        config['headers'] = {
                Authorization: `Bearer ${userInfo.results.token}`
        }
    }
    console.log(config);

    useEffect(() => {
        const fetchData = async () => {
            fetch(url,config)
                .then(response => response.json())
                .then(data => {
                    //console.log(data);
                    const chartData = buildChartData(data);
                    setData(chartData);
                    //console.log(chartData)
                });
        };
        fetchData();
    },[casesType,props.facilityId,url]);


    return (
        <div className={props.className}>
            {data?.length>0 && (
                <Line
                    data={{
                        datasets: [
                            {
                                backgroundColor: casesType!=='recovered' ? 'rgba(204, 16, 52, 0.5)': 'rgba(125, 215, 29, 0.5)',
                                borderColor: casesType!=='recovered' ? '#CC1034': '#7dd71d',
                                data: data
                            }
                        ]
                    }}
                    options={options}
                />
            )}
        </div>
    );
};

export default LineGraph;
