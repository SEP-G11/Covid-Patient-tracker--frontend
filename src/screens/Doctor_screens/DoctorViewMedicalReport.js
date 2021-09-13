import React, { useEffect } from "react";
import { Form, Button, Row, Col, ListGroup } from "react-bootstrap";
import { LinkContainer } from 'react-router-bootstrap'
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { useDispatch, useSelector } from 'react-redux'
import { getPatientReportDetails } from '../../actions/patientActions'

const DoctorViewMedicalReport = ({ match }) => {
    const patientId = match.params.id

    const dispatch = useDispatch()

    const patientReportDetails = useSelector((state) => state.patientReportDetails)
    const { loading, error, report } = patientReportDetails

    useEffect(() => {
        dispatch(getPatientReportDetails(patientId))
    },[dispatch, patientId])

    return (
        <Row>
            <Col md={12} align='center'>
                <h2>Medical Report</h2>
            </Col>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant='danger'>{error}</Message>
            ) : (
            <Col md={12} align='center'>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <p>
                            <strong>Report Id: </strong> {report.report_id}
                        </p>
                        <p>
                            <strong>Patient Id: </strong> {report.patient_id}
                        </p>
                        <p>
                            <strong>Symptoms: </strong> {report.symptoms}
                        </p>
                        <p>
                            <strong>Admitted At: </strong> {report.admitted_at}
                        </p>
                        <p>
                            <strong>Discharged At: </strong> {report.discharged_at}
                        </p>
                        <p>
                            <strong>Description: </strong> {report.description}
                        </p>
                        <p>
                            <strong>Status: </strong> {report.status}
                        </p>
                    </ListGroup.Item>
                </ListGroup>
                <LinkContainer to={`/doctor/editMedicalReport/${report.patient_id}`}>
                    <Button variant='dark' className='btn-sm'>
                        Update
                    </Button>
                </LinkContainer>
            </Col>
            )}
        </Row>
    );
}

export default DoctorViewMedicalReport;