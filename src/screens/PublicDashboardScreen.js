import React,{useState,useEffect} from 'react';
import {Form, Card,Image,ButtonGroup,Button,Container,Row,Col} from 'react-bootstrap';
import InfoBox from '../components/InfoBox';
import Map from '../components/Map';
import Table from '../components/Table';
import LineGraph from '../components/LineGraph';
import TestsGraph from '../components/TestsGraph';
import BreakdownGraph from '../components/BreakdownGraph';
import GlobalGraph from  '../components/GlobalGraph';
import Meta from '../components/Meta';
import {sortData,prettyPrintStat,capitalize} from '../utils';
import Zoom from 'react-reveal/Zoom';
import 'leaflet/dist/leaflet.css';
import './PublicDashboardScreen.css';
import {API_URL} from '../config';

const PublicDashboard = () => {
    const [districts,setDistricts] = useState([]);
    const [district, setDistrict] = useState('islandwide');
    const [districtInfo,setDistrictInfo] = useState({});
    const [tableData,setTableData] = useState([]);
    const [mapCenter,setMapCenter] = useState({lat: 7.8731, lng: 80.7718});
    const [mapZoom,setMapZoom] = useState(7);
    const [mapDistricts, setMapDistricts] = useState([]);
    const [casesType, setCasesType]=useState('cases');
    const [countryInfo,setCountryInfo] = useState({});
    const [rateType,setRateType] = useState('recoveries');

    useEffect(() => {
        fetch(`${API_URL}/moh/countryStats`)
            .then((response) => response.json())
            .then(data => {
                setDistrictInfo(data.results);
                setCountryInfo(data.results);
            })
    },[]);

    useEffect(() => {
        const getDistrictsData = async () => {
            await fetch(`${API_URL}/moh/districtStats`)
                .then((response) => response.json())
                .then((data) => {
                    //console.log(data.results);
                    const desiredArray = Object.entries(data.results).map(([district, data]) => ({
                        district, ...data
                    }));
                    const districts = desiredArray.map((district) => (
                        {
                            name: district.district,
                            value: district.district
                        }
                    ));
                    // console.log(desiredArray)
                    const sortedData = sortData(desiredArray,casesType);
                    setTableData(sortedData);
                    setMapDistricts(desiredArray);
                    setDistricts(districts);
                })
        };

        getDistrictsData();
    },[casesType]);

    const onDistrictChange = async (e) => {
        const district = e.target.value;
        const url = district === 'islandwide' ?
            `${API_URL}/moh/countryStats` :
            `${API_URL}/moh/districtStats/${district}`;

        await fetch(url)
            .then(response => response.json())
            .then(data => {
                setDistrict(district);

                if (district!=='islandwide'){
                    setDistrictInfo(data.results[district]);
                    setMapCenter([parseFloat(data.results[district].districtInfo.latitude), parseFloat(data.results[district].districtInfo.longitude)]);
                    setMapZoom(9);
                }
                else {
                    setDistrictInfo(data.results);
                    setMapCenter([7.8731, 80.7718]);
                    setMapZoom(7);
                }
            })

    };

    return (
        <React.Fragment>
            <Meta title={'COVID-19 Live Dashboard - Sri Lanka'} description={'Live dashboard for Covid-19 situational analysis in Sri Lanka'} keywords={'covid19, dashboard, analytics, coronavirus, sri lanka, moh'}/>
            <div className='pd'>
                <div className='pd__left'>
                    <div className='pd__header'>
                        <Image className='float-right' src='/national_emblem.png' />
                        <h1>COVID-19 DASHBOARD</h1>

                        <Form onChange={onDistrictChange}>
                            <Form.Group>
                                <Form.Control size="sm" as="select" defaultValue={district} className='custom-select pd__dropdown'>
                                    <option value='islandwide'>Islandwide</option>
                                    {
                                        districts.map(district => (
                                            <option value={district.value}>{district.name}</option>
                                        ))
                                    }
                                </Form.Control>
                            </Form.Group>
                        </Form>

                    </div>
                    <Zoom>
                        <div className='pd__stats'>
                            <InfoBox
                                isRed
                                active={casesType === 'cases'}
                                onClick={(e) => setCasesType('cases')}
                                title='Coronavirus Cases'
                                cases={prettyPrintStat(districtInfo.todayCases)}
                                total={prettyPrintStat(districtInfo.cases)}
                                img='/cases.gif'
                            />
                            <InfoBox
                                active={casesType === 'recovered'}
                                onClick={(e) => setCasesType('recovered')}
                                title='Recovered'
                                cases={prettyPrintStat(districtInfo.todayRecovered)}
                                total={prettyPrintStat(districtInfo.recovered)}
                                img='/recovered.gif'
                            />
                            <InfoBox
                                isRed
                                active={casesType === 'deaths'}
                                onClick={(e) => setCasesType('deaths')}
                                title='Deaths'
                                cases={prettyPrintStat(districtInfo.todayDeaths)}
                                total={prettyPrintStat(districtInfo.deaths)}
                                img='/deaths.gif'
                            />
                        </div>
                    </Zoom>
                    <Zoom>
                        <Map casesType={casesType} districts={mapDistricts} center={mapCenter} zoom={mapZoom}/>
                    </Zoom>
                </div>
                <Zoom>
                    <div className='pd__right '>
                        <Card>
                            <Card.Body>
                                <h4>Live {capitalize(casesType)} by District</h4>
                                <Table districts={tableData} casesType={casesType}/>
                                <h4 className='pd__graphTitle'>Islandwide new {casesType}</h4>
                                <LineGraph className='pd__graph' casesType={casesType} />
                            </Card.Body>
                        </Card>
                    </div>
                </Zoom>
            </div>
            <div className='pd'>
                <Zoom>
                    <div className='pd__left'>
                        <Card>
                            <Card.Body>
                                <h4 className='pd__graphTitle'>Daily Investigations</h4>
                                <TestsGraph className='pd__graph' />
                            </Card.Body>
                        </Card>
                    </div>
                </Zoom>
                <Zoom>
                    <div className='pd__right'>
                        <Card className='bottomrightheight'>
                            <Card.Body>
                                <h4 className='pd__graphTitle'>Summary of Total Cases </h4>
                                <BreakdownGraph className='pd__graph' info={countryInfo}/>
                                <hr></hr>
                                <h4 className='pd__graphTitle'>{rateType} Comparison</h4>
                                <GlobalGraph countryInfo={countryInfo} rateType={rateType}/>
                                <ButtonGroup size='sm' className='d-flex'>
                                    <Button variant='outline-success' onClick={(e) => {e.preventDefault();setRateType('recoveries')}} active={rateType==='recoveries'}>Recoveries</Button>
                                    <Button variant='outline-danger' onClick={(e) => {e.preventDefault();setRateType('fatalities')}} active={rateType==='fatalities'}>Fatalities</Button>
                                </ButtonGroup>
                            </Card.Body>
                        </Card>
                    </div>
                </Zoom>
            </div>
            <footer>
                <Container>
                    <Row>
                        <Col className='text-center py-3'>
                            &copy; 2021 RLC Solutions
                        </Col>
                    </Row>
                </Container>
            </footer>
        </React.Fragment>
    );
};

export default PublicDashboard;
