import React, { useEffect } from "react";
import { Form, Button, Row, Col, ListGroup } from "react-bootstrap";
import { LinkContainer } from 'react-router-bootstrap'
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { useDispatch, useSelector } from 'react-redux'
import { getPatientDetails } from '../../actions/patientActions'

const HospitalAdminViewPatientInfo = ({ match }) =>{
    const patientId = match.params.id

    const dispatch = useDispatch()

    const patientDetails = useSelector((state) => state.patientDetails)
    const { loading, error, patient } = patientDetails

    useEffect(() => {
        dispatch(getPatientDetails(patientId))
    },[dispatch, patientId])

    return (
        <Row>
            <Col md={12} align='center'>
                <h2>Patient Information</h2>
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
                            <strong>Id: </strong> {patient.patient_id}
                        </p>
                        <p>
                            <strong>Name: </strong> {patient.name}
                        </p>
                        <p>
                            <strong>Age: </strong> {patient.age}
                        </p>
                        <p>
                            <strong>Blood Type: </strong> {patient.blood_type}
                        </p>
                        <p>
                            <strong>Address: </strong> {patient.address}
                        </p>
                        <p>
                            <strong>Contact No: </strong> {patient.contact_no}
                        </p>
                    </ListGroup.Item>
                </ListGroup>
                <LinkContainer to={`/hospitalAdmin/editPatientInfo/${patient.patient_id}`}>
                    <Button variant='dark' className='btn-sm'>
                        Update
                    </Button>
                </LinkContainer>
            </Col>
            )}
        </Row>
    );
}

export default HospitalAdminViewPatientInfo;