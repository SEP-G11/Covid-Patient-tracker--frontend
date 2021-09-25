import React, { useEffect } from "react";
import { Form, Button, Row, Col, ListGroup } from "react-bootstrap";
import { LinkContainer } from 'react-router-bootstrap'
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { useDispatch, useSelector } from 'react-redux'
import { getPatientDetails } from '../../actions/patientActions'
import HospitalAdminSideNav from "./HospitalAdminSideNav";

const HAViewPatientInfo = ({ match , history }) =>{
    const patientId = match.params.id

    const dispatch = useDispatch()

    const patientDetails = useSelector((state) => state.patientDetails)
    const { loading, error, patient } = patientDetails

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    useEffect(() => {
        if (!userInfo) {
        history.push("/login");
    } else{
        dispatch(getPatientDetails(patientId))
    }
    },[dispatch,history,userInfo,patientId])

    return (
        <div>
            <Row >
                <Col sm={3}><HospitalAdminSideNav from='viewPatientsList'/></Col>
                <Col sm={8} >
                <Row>
                    {/* <Col sm={1}> <img src={logo} width="200" height="90" ></img></Col> */}
                    <Col sm={12}><h1 style={{ fontFamily: "arial", textAlign: "center", color: "#007c7a", fontSize: "40px", paddingLeft: "-50px" }}>Patient Information</h1> </Col>
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
                                <strong>Birth Day: </strong> {patient.bday}
                            </p>
                            <p class="text-dark">
                                <strong>Gender: </strong> {patient.gender}
                            </p>
                            <p class="text-dark">
                                <strong>Blood Type: </strong> {patient.blood_type}
                            </p>
                            <p class="text-dark">
                                <strong>Contact No: </strong> {patient.contact_no}
                            </p>
                            <p class="text-dark">
                                <strong>Address: </strong> {patient.address}
                            </p>
                            <p class="text-dark">
                                <strong>District: </strong> {patient.district}
                            </p>
                            <p class="text-dark">
                                <strong>Vaccination Details: </strong> {patient.is_Vaccinated}
                            </p>
                        </ListGroup.Item>
                    </ListGroup>

                    <Row>
                        <Col sm={6} align="left">
                            <LinkContainer to={'/hospitalAdmin/patientList'}>
                                <Button className='btn-sm button button1'>
                                    Back
                                </Button>
                            </LinkContainer>
                        </Col>
                        <Col sm={6} align="right">
                            <LinkContainer to={`/hospitalAdmin/editPatientInfo/${patient.patient_id}`}>
                                <Button className='btn-sm button button1'>
                                    Update
                                </Button>
                            </LinkContainer>
                        </Col>
                    </Row>
                </Col>
                )}
            </Col>
            <Col sm={1}></Col>
        </Row>
    </div>
    );
}

export default HAViewPatientInfo;