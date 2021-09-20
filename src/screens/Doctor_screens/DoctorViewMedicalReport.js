import React, { useEffect } from "react";
import { Form, Button, Row, Col, ListGroup, Table } from "react-bootstrap";
import { LinkContainer } from 'react-router-bootstrap'
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { useDispatch, useSelector } from 'react-redux'
import { getPatientReportDetails } from '../../actions/patientActions'
import { getPatientTestDetails } from '../../actions/patientActions'

const DoctorViewMedicalReport = ({ match }) => {
    const patientId = match.params.id

    const dispatch = useDispatch()

    const patientReportDetails = useSelector((state) => state.patientReportDetails)
    const { loading, error, report } = patientReportDetails

    const patientTestDetails = useSelector((state) => state.patientTestDetails)
    const { loading:loading_, error:error_, tests } = patientTestDetails

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
        if (dt < 10) {
            dt = '0' + dt;
        }
        if (month < 10) {
            month = '0' + month;
        }
        return (year+'-' + month + '-'+dt)
    }

    useEffect(() => {
        dispatch(getPatientReportDetails(patientId))
    },[dispatch, patientId])

    useEffect(() => {
        dispatch(getPatientTestDetails(patientId))
    },[dispatch])

    return (
        <div>
            <h1 align='center'>Medical Report</h1>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant='danger'>{error}</Message>
            ) : (
            <Col md={12}>
                <Row>
                <Col md={6} align='center'>
                    <ListGroup variant='flush'>
                        <ListGroup.Item className='listGroup-mr'>
                            <p class="text-dark">
                                <strong>Report Id: </strong> {report.report_id}
                            </p>
                            <p class="text-dark">
                                <strong>Patient Id: </strong> {report.patient_id}
                            </p>
                            <p class="text-dark">
                                <strong>Symptoms: </strong> {report.symptoms}
                            </p>
                            <p class="text-dark">
                                <strong>Admitted At: </strong> {getdate(report.admitted_at)}
                            </p>
                            <p class="text-dark">
                                <strong>Discharged At: </strong> {getdate(report.discharged_at)}
                            </p>
                            <p class="text-dark">
                                <strong>Description: </strong> {report.description}
                            </p>
                            <p class="text-dark">
                                <strong>Status: </strong> {report.status}
                            </p>
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                {loading_ ? (
                <Loader />
                ) : error_ ? (
                    <Message variant='danger'>{error_}</Message>
                ) : (
                <Col md={6} align='center'>
                    <h5>Test Results</h5>
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
                </Row>
                <Col md={12} align='center'>
                    <LinkContainer to={`/doctor/editMedicalReport/${report.patient_id}`}>
                        <Button className='btn-sm btn-default-pages'>
                            Update
                        </Button>
                    </LinkContainer>
                </Col>
                <Col md={12} align='center'>
                    <LinkContainer to={"/doctor/patientList"}>
                        <Button className='btn-sm btn-default-pages'>
                            Back to Patient List
                        </Button>
                    </LinkContainer>
                </Col>
            </Col>
            )}
        </div>
    );
}

export default DoctorViewMedicalReport;