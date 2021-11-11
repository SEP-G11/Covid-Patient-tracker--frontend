import React, { useEffect } from "react";
import { Form, Button, Row, Col, ListGroup, Table } from "react-bootstrap";
import { LinkContainer } from 'react-router-bootstrap'
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { useDispatch, useSelector } from 'react-redux'
import { getPatientReportDetails } from '../../actions/reportActions'
import { getPatientTestDetails } from '../../actions/testActions'
import DoctorSideNav from "./DoctorSideNav";

const DoctorViewMedicalReport = ({ match , history }) => {
    const patientId = match.params.id

    const dispatch = useDispatch()

    const patientReportDetails = useSelector((state) => state.patientReportDetails)
    const { loading, error, report } = patientReportDetails

    const patientTestDetails = useSelector((state) => state.patientTestDetails)
    const { loading:loading_, error:error_, tests } = patientTestDetails

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const convert = (result) => {
        if (result=='true'){
            return "Positive"
        }else{
            return "Negative"
        }
    }

    const getdate = (date) => {
        date = new Date(date)
        let year = date.getFullYear();
        let month = date.getMonth()+1;
        let dt = date.getDate();
        let hr = date.getHours();
        let min = date.getMinutes(0);
        if (dt < 10) {
            dt = '0' + dt;
        }
        if (month < 10) {
            month = '0' + month;
        }
        if ( hr<12 ) {
            if ( min <10 ) {
                min = '0' + min 
            } 
            min = min + "AM"     
        } else {
            if ( min <10 ) {
                min = '0' + min 
            } 
            min = min + "PM" 
        }
        return (year+'-' + month + '-'+dt+ " "+hr+"."+min)
    }

    useEffect(() => {
        console.log(userInfo["results"])
        if (!userInfo) {
            history.push("/login");
        } else{
            dispatch(getPatientReportDetails(patientId))
        }
    },[dispatch, patientId,history,userInfo,])

    useEffect(() => {
        if (!userInfo) {
            history.push("/login");
        } else{
            dispatch(getPatientTestDetails(patientId))
        }
    },[dispatch,history,userInfo,])

    return (
        <div>
            <Row >
                <Col sm={3}><DoctorSideNav from='viewPatientsList'/></Col>
                <Col sm={8} >
                <Row>
                    {/* <Col sm={1}> <img src={logo} width="200" height="90" ></img></Col> */}
                    <Col sm={12}><h1 style={{ fontFamily: "arial", textAlign: "center", color: "#007c7a", fontSize: "40px", paddingLeft: "-50px" }}>Medical Report</h1> </Col>
                </Row>
                <hr
                    style={{
                    color: "white",
                    backgroundColor: "#007c7a",
                    height: 2,
                    }}
                />
                {loading ? (
                    <Loader />
                ) : error ? (
                    <Message variant='danger'>{error}</Message>
                ) : (
                    <Col md={12} align='center'>
                    <Col md={6} align='center'>
                        <p class="text-dark">
                            <strong>Report Id: </strong> {report.report_id}
                        </p>
                        <p class="text-dark">
                            <strong>Patient Id: </strong> {report.patient_id}
                        </p>
                        <p class="text-dark">
                            <strong>Bed No: </strong> {report.bed_no}
                        </p>
                        <p class="text-dark">
                            <strong>Ward No: </strong> {report.ward}
                        </p>
                        <p class="text-dark">
                            <strong>Symptoms: </strong> {report.symptoms}
                        </p>
                        <p class="text-dark">
                            <strong>Status: </strong> {report.status}
                        </p>
                        <p class="text-dark">
                            <strong>Medical History: </strong> {report.description}
                        </p>
                        <p class="text-dark">
                            <strong>Admitted At: </strong> {getdate(report.admitted_at)}
                        </p>
                    </Col>
                    {loading_ ? (
                    <Loader />
                    ) : error_ ? (
                        <Message variant='danger'>{error_}</Message>
                    ) : (
                    <Col md={12} align='center'>
                        <h5 className="text-dark" style={{paddingTop: "15px"}}>TEST RESULTS</h5>
                        <Table id="myTable" className='table-sm'>
                            <thead>
                                <tr>
                                    <th className="text-center table-head-test">Test Id</th>
                                    <th className="text-center table-head-test">Date</th>
                                    <th className="text-center table-head-test">Test</th>
                                    <th className="text-center table-head-test">Result</th>
                                </tr>
                            </thead>
                            <tbody className="text-dark">
                                {tests.map((test) => (
                                    <tr key={test.test_id}>
                                        <td className="text-center">{test.test_id}</td>
                                        <td className="text-center">{getdate(test.date)}</td>
                                        <td className="text-center">{test.test_type}</td>
                                        <td className="text-center">{convert(test.result.toString())}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Col>
                    )}
                    <Row>
                        <Col sm={6} align="left">
                            <LinkContainer to={'/doctor/patientList'}>
                                <Button className='btn-sm button button1'>
                                    Back
                                </Button>
                            </LinkContainer>
                        </Col>
                        <Col sm={6} align="right">
                            <LinkContainer to={`/doctor/editMedicalReport/${report.patient_id}`}>
                                <Button className='btn-sm button button1'>
                                    Update
                                </Button>
                            </LinkContainer>
                        </Col>
                    </Row>
                </Col>
                )}
                </Col>
            </Row>
        </div>
    );
}

export default DoctorViewMedicalReport;