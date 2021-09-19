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
        <div>
            <h1 align='center'>Patient Information</h1>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant='danger'>{error}</Message>
            ) : (
            <Col md={12} align='center'>
                <ListGroup variant='flush'>
                    <ListGroup.Item className='listGroup'>
                        <p class="text-dark">
                            <strong>Id: </strong> {patient.patient_id}
                        </p>
                        <p class="text-dark">
                            <strong>Name: </strong> {patient.name}
                        </p>
                        <p class="text-dark">
                            <strong>Age: </strong> {patient.age}
                        </p>
                        <p class="text-dark">
                            <strong>Blood Type: </strong> {patient.blood_type}
                        </p>
                        <p class="text-dark">
                            <strong>Address: </strong> {patient.address}
                        </p>
                        <p class="text-dark">
                            <strong>Contact No: </strong> {patient.contact_no}
                        </p>
                    </ListGroup.Item>
                </ListGroup>
                <Col md={6} align='center'>
                    <LinkContainer to={`/hospitalAdmin/editPatientInfo/${patient.patient_id}`}>
                        <Button className='btn-sm btn-default-pages'>
                            Update
                        </Button>
                    </LinkContainer>
                </Col>
                <Col md={6} align='center'>
                    <LinkContainer to={"/hospitalAdmin/patientList"}>
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

export default HospitalAdminViewPatientInfo;