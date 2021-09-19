import React, { useState, useEffect }  from "react";
import { Form, Button, Row, Col, ListGroup, ListGroupItem } from "react-bootstrap";
import { LinkContainer } from 'react-router-bootstrap'
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import FormContainer from '../../components/FormContainer'
import { getPatientDetails, updatePatient } from '../../actions/patientActions'
import { PATIENT_UPDATE_RESET } from '../../constants/patientConstants'

const DoctorEditPatientInfo = ({ match, history }) => {
    const patientId = match.params.id 

    const [name, setName] = useState('')
    const [age, setAge] = useState('')
    const [blood_type, setBloodType] = useState('')
    const [address, setAddress] = useState('')
    const [contact_no, setContactNo] = useState('')

    const dispatch = useDispatch()

    const patientDetails = useSelector((state) => state.patientDetails)
    const { loading, error, patient } = patientDetails

    const patientUpdate = useSelector((state) => state.patientUpdate)
    const {
        loading: loadingUpdate,
        error: errorUpdate,
        success: successUpdate,
    } = patientUpdate

    useEffect(() => {
        if (successUpdate) {
          dispatch({ type: PATIENT_UPDATE_RESET })
          history.push(`/doctor/viewPatientInfo/${patientId}`)
        } else {
          if (!patient.name || patient.patient_id !== patientId) {
            dispatch(getPatientDetails(patientId))
          } else {
            setName(patient.name)
            setAge(patient.age)
            setBloodType(patient.blood_type)
            setAddress(patient.address)
            setContactNo(patient.contact_no)
          }
        }
      }, [dispatch, history, patientId, patient, successUpdate])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updatePatient({ patient_id:patientId, name, age, blood_type, address, contact_no }))
    }

    return (
        <div>
            <h1 align='center'>Update Patient</h1>
            {loadingUpdate && <Loader />}
            {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant='danger'>{error}</Message>
            ) : (
            <FormContainer>
                <Form onSubmit={submitHandler}>
                    <ListGroup variant='flush' align='center'>
                        <ListGroup.Item className='id'>
                            <p class="text-dark">
                                <strong>Patient Id: </strong> {patientId}
                            </p>
                        </ListGroup.Item>
                    </ListGroup>
                    <Form.Group controlId='name'>
                        <Form.Label class="text-dark">Name</Form.Label>
                            <Form.Control
                                type='name'
                                placeholder='Enter name'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            ></Form.Control>
                    </Form.Group>
                    <Form.Group controlId='age'>
                        <Form.Label class="text-dark">Age</Form.Label>
                            <Form.Control
                                type='age'
                                placeholder='Enter age'
                                value={age}
                                onChange={(e) => setAge(e.target.value)}
                            ></Form.Control>
                    </Form.Group>
                    <Form.Group controlId='blood_type'>
                        <Form.Label class="text-dark">Blood Type</Form.Label>
                            <Form.Control
                                as='select'
                                value={blood_type}
                                onChange={(e) => setBloodType(e.target.value)}
                            >
                                <option value='' disabled selected hidden>Select Blood Type</option>
                                <option value='O+'>O+</option>
                                <option value='O-'>O-</option>
                                <option value='A+'>A+</option>
                                <option value='A-'>A-</option>
                                <option value='B+'>B+</option>
                                <option value='B-'>B-</option>
                                <option value='AB+'>AB+</option>
                                <option value='AB-'>AB-</option>
                            </Form.Control> 
                    </Form.Group>
                    <Form.Group controlId='address'>
                        <Form.Label class="text-dark">Address</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Enter address'
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                            ></Form.Control>
                    </Form.Group>
                    <Form.Group controlId='contact_no'>
                        <Form.Label class="text-dark">Contact No.</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Enter contact_no'
                                value={contact_no}
                                onChange={(e) => setContactNo(e.target.value)}
                            ></Form.Control>
                    </Form.Group>
                    <Button type='submit' variant='primary' className='btn-sm btn-default'>
                        Save Changes
                    </Button>
                </Form>
            </FormContainer>
            )}
        </div>
    )

}

export default DoctorEditPatientInfo;