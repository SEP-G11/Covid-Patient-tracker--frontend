import React, { useEffect } from "react";
import { Form, Button, Row, Col, ListGroup } from "react-bootstrap";
import { LinkContainer } from 'react-router-bootstrap'
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { useDispatch, useSelector } from 'react-redux'
import { getPatientDetails } from '../../actions/patientActions'
import DoctorSideNav from "./DoctorSideNav";

const DoctorViewPatientInfo = ({ match , history }) =>{
    const patientId = match.params.id

    const dispatch = useDispatch()

    const patientDetails = useSelector((state) => state.patientDetails)
    const { loading, error, patient } = patientDetails

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const getAge = (bday) => {
        if(Math.floor((new Date() - new Date(bday).getTime()) / 3.15576e+10)){
          return (Math.floor((new Date() - new Date(bday).getTime()) / 3.15576e+10));
        }
        else{
          return Math.round(((new Date() - new Date(bday).getTime()) / 3.15576e+10 + Number.EPSILON) * 1000) / 1000; 
        }       
    };

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
                <Col sm={3}><DoctorSideNav from='viewPatientsList'/></Col>
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
                    <p class="text-dark">
                        <strong>Id: </strong> {patient.patient_id}
                    </p>
                    <p class="text-dark">
                        <strong>Name: </strong> {patient.name}
                    </p>
                    <p class="text-dark">
                        <strong>Age: </strong> {getAge(patient.bday)}
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
                    <p className="text-dark">
                        <strong>Vaccination
                            Details: </strong> {patient.is_Vaccinated}{patient.Type_vaccine}{patient.Num_vaccine}
                    </p>
                    <Row>
                        <Col sm={6} align="left">
                            <LinkContainer to={'/doctor/patientList'}>
                                <Button className='btn-sm button button1'>
                                    Back
                                </Button>
                            </LinkContainer>
                        </Col>
                        <Col sm={6} align="right">
                            <LinkContainer to={`/doctor/editPatientInfo/${patient.patient_id}`}>
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

export default DoctorViewPatientInfo;