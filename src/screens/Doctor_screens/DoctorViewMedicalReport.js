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
        <div>
            <h1 align='center'>Medical Report</h1>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant='danger'>{error}</Message>
            ) : (
            <Col md={12} align='center'>
                <ListGroup variant='flush'>
                    <ListGroup.Item className='listGroup'>
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
                            <strong>Admitted At: </strong> {report.admitted_at}
                        </p>
                        <p class="text-dark">
                            <strong>Discharged At: </strong> {report.discharged_at}
                        </p>
                        <p class="text-dark">
                            <strong>Description: </strong> {report.description}
                        </p>
                        <p class="text-dark">
                            <strong>Status: </strong> {report.status}
                        </p>
                    </ListGroup.Item>
                </ListGroup>
                <Col md={6} align='center'>
                    <LinkContainer to={`/doctor/editMedicalReport/${report.patient_id}`}>
                        <Button className='btn-sm btn-default-pages'>
                            Update
                        </Button>
                    </LinkContainer>
                </Col>
                <Col md={6} align='center'>
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