import React,{useState,useEffect} from 'react';
import { Row, Col, Card, Container, Image} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Select from 'react-select';
import { listFacilities,listFacilitiesActive ,listFacilitiesRecovered,listFacilitiesDeaths,listFacilitiesBeds} from '../../actions/facilityActions';
import './MohHomeScreen.css';
import InfoBox from '../../components/InfoBox';
import BedsGraph from '../../components/BedsGraph';
import {prettyPrintStat} from '../../utils';
import MOHSideNav from './MOHSideNav';
import LineGraph from "../../components/LineGraph";
import Meta from '../../components/Meta';
import {FaHospitalAlt,FaPhoneAlt,FaSearch} from "react-icons/fa";
import {MdLocationOn} from "react-icons/md";

const MohHomeScreen = ({ history }) => {
    const dispatch = useDispatch();

    const [facility,setFacility] = useState({});
    const [casesType, setCasesType]=useState('cases');
    const [facilityStats, setFacilityStats]=useState({});

    const facilityList = useSelector(state => state.facilityList);
    const {loading:loadingFacilityList, error:errorFacilityList, facilitiesList} = facilityList;

    const facilitiesActive = useSelector(state => state.facilitiesActive);
    const {loading:loadingFacilitiesActive, error:errorFacilitiesActive, facilitiesActiveList} = facilitiesActive;

    const facilitiesRecovered = useSelector(state => state.facilitiesRecovered);
    const {loading:loadingFacilitiesRecovered, error:errorFacilitiesRecovered, facilitiesRecoveredList} = facilitiesRecovered;

    const facilitiesDeaths = useSelector(state => state.facilitiesDeaths);
    const {loading:loadingFacilitiesDeaths, error:errorFacilitiesDeaths, facilitiesDeathsList} = facilitiesDeaths;

    const facilitiesBeds = useSelector(state => state.facilitiesBeds);
    const {loading:loadingFacilitiesBeds, error:errorFacilitiesBeds, facilitiesBedsList} = facilitiesBeds;

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    useEffect(() => {
        if (userInfo && userInfo.results.accType === 'MOH'){
            dispatch(listFacilities());
            dispatch(listFacilitiesActive());dispatch(listFacilitiesRecovered());dispatch(listFacilitiesDeaths());dispatch(listFacilitiesBeds());
        }
        else {
            history.push('/login')
        }

    }, [dispatch,history,userInfo]);

    const selectFacilityHandler = (e) => {
        setFacility(e);
        let arr = {cases: 0, active: 0, recovered: 0, deaths: 0, todayCases: 0, todayDeaths: 0, todayRecovered: 0,
            totalCovid: 0, covidOccupied: 0, totalNormal: 0, normalOccupied: 0};
        let res1 = facilitiesActiveList.results.reduce((acc, curr)=>{
            const { facility_id, count,todayCount } = curr;
            if (facility_id===e.value){
                acc['cases']+=count;
                acc['active']+=count;
                acc['todayCases']+=todayCount;
            }
            return acc;
        },arr);
        let res2 = facilitiesRecoveredList.results.reduce((acc, curr)=>{
            const { facility_id, count,todayCount } = curr;
            if (facility_id===e.value){
                acc['cases']+=count;
                acc['recovered']+=count;
                acc['todayRecovered']+=todayCount;
            }
            return acc;
        },res1);
        let res3 = facilitiesDeathsList.results.reduce((acc, curr)=>{
            const { facility_id, count,todayCount } = curr;
            if (facility_id===e.value){
                acc['cases']+=count;
                acc['deaths']+=count;
                acc['todayDeaths']+=todayCount;
            }
            return acc;
        },res2);
        let res4 = Object.entries(facilitiesBedsList.results).reduce((acc,curr)=>{
            const {totalCovidBeds,occupiedCovidBeds,totalNormalBeds,occupiedNormalBeds} = curr[1];
            if (parseInt(curr[0])===e.value){
                acc['totalCovid']+=totalCovidBeds;
                acc['covidOccupied']+=occupiedCovidBeds;
                acc['totalNormal']+=totalNormalBeds;
                acc['normalOccupied']+=occupiedNormalBeds;
            }
            return acc;
        },res3);
        setFacilityStats(res4);

    };

    const hospitalDropdown = () => {
        const options = facilitiesList.results.map(facility =>({ value: facility.facility_id, label: facility.name, address: facility.address, contactNo: facility.contact_no }));
        return (
            <Select
                value={facility}
                onChange={selectFacilityHandler}
                options={options}
            />
        );

    };


    return (
        <React.Fragment>
            <Meta title={'Dashboard | MOH Admin'}/>
            <Row>
                <Col sm={3}> <MOHSideNav from='home'/> </Col>
            </Row>
            <Container>

                <Row className='moh-home__sidemargins'>
                    <Col>
                        <Card className='moh-home__header_card'>
                            <Card.Body>
                                <Row>
                                    <Col>
                                        <Image src='/national_emblem.png' className='float-right'/>
                                    </Col>
                                    <Col sm={7}>
                                        <Card.Text>
                                            <h1>MOH Dashboard</h1>
                                        </Card.Text>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <Row className='moh-home__sidemargins'>
                    <Col>
                        <Card className='moh-home__margintop'>
                            <Card.Body>
                                <h4><FaSearch/> Search Facility</h4>
                                {hospitalDropdown()}
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                {Object.keys(facility).length !== 0 ? (
                    <div>
                        <Row className='moh-home__sidemargins'>
                            <Col>
                            <Card className='moh-home__margintop'>
                                <Card.Body>
                                    <Row>
                                        <Col className='moh-home__text' sm={7}>
                                            <h2><FaHospitalAlt/> {facility.label}</h2>
                                        </Col>
                                        <Col sm={3}>
                                            <h6><MdLocationOn/> {facility.address}</h6>
                                        </Col>
                                        <Col sm={2}>
                                            <h7><FaPhoneAlt/> {facility.contactNo}</h7>
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Card>
                            </Col>
                        </Row>
                        <Row className='moh-home__margintop moh-home__sidemargins'>
                            <Col>
                                <InfoBox
                                    isRed
                                    active={casesType === 'cases'}
                                    onClick={(e) => setCasesType('cases')}
                                    title='Coronavirus Cases'
                                    cases={prettyPrintStat(facilityStats.todayCases)}
                                    total={prettyPrintStat(facilityStats.cases)}
                                    img='/cases.gif'
                                />
                            </Col>
                            <Col>
                                <InfoBox
                                    active={casesType === 'recovered'}
                                    onClick={(e) => setCasesType('recovered')}
                                    title='Recovered'
                                    cases={prettyPrintStat(facilityStats.todayRecovered)}
                                    total={prettyPrintStat(facilityStats.recovered)}
                                    img='/recovered.gif'
                                />
                            </Col>
                            <Col>
                                <InfoBox
                                    isRed
                                    active={casesType === 'deaths'}
                                    onClick={(e) => setCasesType('deaths')}
                                    title='Deaths'
                                    cases={prettyPrintStat(facilityStats.todayDeaths)}
                                    total={prettyPrintStat(facilityStats.deaths)}
                                    img='/deaths.gif'
                                />
                            </Col>
                        </Row>
                        <Row className='moh-home__margintop moh-home__sidemargins'>
                            <Col sm={4}>
                                <Card>
                                    <Card.Body>
                                        <Card.Title><h7>Covid Beds</h7></Card.Title>
                                        <Row>
                                            <Col sm={9}>
                                                <BedsGraph info={facilityStats} type='Covid'/>
                                            </Col>
                                            <Col className='moh-home__text' sm={3}>
                                                <h7>Used</h7>
                                                <h3>{facilityStats.covidOccupied}</h3>
                                                <h7>Total</h7>
                                                <h3>{facilityStats.totalCovid}</h3>
                                            </Col>
                                        </Row>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col sm={4}>
                                <Card>
                                    <Card.Body>
                                        <Card.Title><h7>Normal Beds</h7></Card.Title>
                                        <Row>
                                            <Col sm={9}>
                                                <BedsGraph info={facilityStats} type='Normal'/>
                                            </Col>
                                            <Col className='moh-home__text' sm={3}>
                                                <h7>Used</h7>
                                                <h3>{facilityStats.normalOccupied}</h3>
                                                <h7>Total</h7>
                                                <h3>{facilityStats.totalNormal}</h3>
                                            </Col>
                                        </Row>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col sm={4}>
                                <Card>
                                    <Card.Body>
                                        <Card.Title><h7>Total Beds</h7></Card.Title>
                                        <Row>
                                            <Col sm={9}>
                                                <BedsGraph info={facilityStats} type='Total'/>
                                            </Col>
                                            <Col className='moh-home__text' sm={3}>
                                                <h7>Used</h7>
                                                <h3>{facilityStats.normalOccupied+facilityStats.covidOccupied}</h3>
                                                <h7>Total</h7>
                                                <h3>{facilityStats.totalNormal+facilityStats.totalCovid}</h3>
                                            </Col>
                                        </Row>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                        <Row className='moh-home__margintop moh-home__sidemargins'>
                            <Col>
                            <Card>
                                <Card.Body>
                                    <h4 className='pd__graphTitle'>Daily new {casesType} for {facility.label}</h4>
                                    <LineGraph casesType={casesType} facilities facilityId={facility.value} protected/>
                                </Card.Body>
                            </Card>
                            </Col>
                        </Row>
                    </div>
                ):(
                    <Row className='moh-home__margintop moh-home__sidemargins'>
                        <Col>
                            <h1>Select/Search for a Facility from above to get detailed statistics</h1>
                        </Col>
                    </Row>
                )}
                <Row className='moh-home__margintop'>

                </Row>
            </Container>

        </React.Fragment>
    );
};
export default MohHomeScreen;
