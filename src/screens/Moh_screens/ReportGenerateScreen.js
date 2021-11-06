import React, {useState, useEffect} from "react";
import {useSelector } from 'react-redux';
import axios from "axios";
import {PDFDownloadLink} from "@react-pdf/renderer";
import {ReportTemplate} from '../../report/ReportTemplate';
import moment from "moment";
import {Col, Form, Row} from "react-bootstrap";
import MOHSideNav from "./MOHSideNav";
import './ReportGenerateScreen.css';
import FormContainer from "../../components/FormContainer";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import {API_URL} from '../../config';
import {mutateFacilityStats} from '../../utils';

const ReportGenerateScreen = ({history}) => {
    const [date, setDate] = useState("");
    const [countryDetails, setCountryDetails] = useState({});
    const [countryDetailsFromDate, setCountryDetailsFromDate] = useState({});
    const [testsDetailsFromDate, setTestsDetailsFromDate] = useState({});
    const [districtsDetails, setDistrictsDetails] = useState({});
    const [facilitiesDetails, setFacilitiesDetails] = useState({});
    const [show, setShow] = useState(false);
    const [loader, setLoader] = useState(false);
    const [message, setMessage] = useState(null);

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    useEffect(() => {
        if (!(userInfo && userInfo.results.accType === 'MOH')){
            history.push('/login');
        }

    }, [userInfo,history]);


    const submitHandler = async(e) => {
        e.preventDefault();
        if (date===''){
            setMessage('Please select a date')
        }
        else {
            setShow(false);
            setLoader(true);
            const dateDiff = moment().diff(date,'days')+1;
            try {
                const config = {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${userInfo.results.token}`
                    }
                };
                let res2 = await axios.get(`${API_URL}/moh/districtStats/`,config);
                setDistrictsDetails(res2.data.results);
                let res3 = await axios.get(`${API_URL}/moh/countryStats/`,config);
                setCountryDetails(res3.data.results);
                let res4 = await axios.get(`${API_URL}/moh/historical/cases?lastdays=${dateDiff}`,config);
                let res5 = await axios.get(`${API_URL}/moh/historical/recovered?lastdays=${dateDiff}`,config);
                let res6 = await axios.get(`${API_URL}/moh/historical/deaths?lastdays=${dateDiff}`,config);
                let countryObj = {
                    cases: Object.values(res4.data.results).reduce((a, b) => a + b),
                    recovered: Object.values(res5.data.results).reduce((a, b) => a + b),
                    deaths: Object.values(res6.data.results).reduce((a, b) => a + b),
                };
                setCountryDetailsFromDate(countryObj);
                let res7 = await axios.get(`${API_URL}/moh/historical/tests?lastdays=${dateDiff}`,config);
                let testsObj = {
                    rat: Object.values(res7.data.results).reduce((a, b) => a + b.rat,0),
                    pcr: Object.values(res7.data.results).reduce((a, b) => a + b.pcr,0)
                };
                setTestsDetailsFromDate(testsObj);
                let res8 = await axios.get(`${API_URL}/moh/facilities`,config);
                let res9 = await axios.get(`${API_URL}/moh/facilities/active`,config);
                let res10 = await axios.get(`${API_URL}/moh/facilities/recovered`,config);
                let res11 = await axios.get(`${API_URL}/moh/facilities/deaths`,config);
                let facilitiesData = mutateFacilityStats(res8.data.results,res9.data.results,res10.data.results,res11.data.results);
                setLoader(false);
                setFacilitiesDetails(facilitiesData);
                setShow(true);


            } catch (error) {
                setMessage('Error generating PDF')
            }
        }
    };

    return (
        <React.Fragment>
            <Row>
                <Col sm={3}> <MOHSideNav from='rgs'/> </Col>
                <Col sm={8} >
                    <Row>
                        <Col sm={12}><h1 className='rgs__title'>Generate Report</h1> </Col>
                    </Row>
                    <hr className='rgs__hr'/>
                    <FormContainer className='rgs__formContainer'>
                        {message && <Message variant='danger'>{message}</Message>}
                        <Form onSubmit={submitHandler} >
                            <Form.Group controlId='date'>
                                <Form.Label className='rgs__formLabel'>Select from which date onwards the report should be generated</Form.Label>
                                <Form.Control
                                    type='date'
                                    placeholder='Select date'
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                    className='rgs__formControl'
                                    max={moment().format("YYYY-MM-DD")}
                                >
                                </Form.Control>
                            </Form.Group>
                            <Row>
                                <Col className='d-flex justify-content-center'>
                                    <button type='submit' className='rgs__button rgsButton'>
                                        GENERATE REPORT
                                    </button>
                                </Col>
                            </Row>
                        </Form>
                    </FormContainer>
                    <br></br>
                    <Row>
                        <Col className='d-flex justify-content-center'>
                            {loader && <Loader/>}
                            {show && (
                                <PDFDownloadLink
                                    document={<ReportTemplate
                                        districtData={districtsDetails}
                                        countryData={countryDetails}
                                        countryDataFromDate={countryDetailsFromDate}
                                        testsData={testsDetailsFromDate}
                                        facilitiesData={facilitiesDetails}
                                        date = {date}
                                    />}
                                    fileName={`report${moment(date).format("YYYY-MM-DD")}to${moment().format("YYYY-MM-DD")}.pdf`}
                                    className='btn btn-primary'
                                >
                                    {({ blob, url, loading, error }) =>
                                        loading ? "Loading..." : "Download PDF"
                                    }
                                </PDFDownloadLink>
                            )}
                        </Col>
                    </Row>
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default ReportGenerateScreen;
