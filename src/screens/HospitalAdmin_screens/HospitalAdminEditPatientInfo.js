import React, { useState, useEffect }  from "react";
import { Form, Button, Row, Col, ListGroup } from "react-bootstrap";
import { LinkContainer } from 'react-router-bootstrap'
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import FormContainer from '../../components/FormContainer'
import { getPatientDetails, updatePatient } from '../../actions/patientActions'
import { PATIENT_UPDATE_RESET } from '../../constants/patientConstants'

const HospitalAdminEditPatientInfo = ({ match, history }) => {
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
          history.push('/hospitalAdmin/patientList')
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
        <>
            <Link to='/doctor/patientList' className='btn btn-light my-3'>
                Go Back
            </Link>
            <FormContainer>
                <h1>Update Patient</h1>
                {loadingUpdate && <Loader />}
                {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
                {loading ? (
                    <Loader />
                ) : error ? (
                    <Message variant='danger'>{error}</Message>
                ) : (
                <Form onSubmit={submitHandler}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <p>
                                <strong>Patient Id: </strong> {patientId}
                            </p>
                        </ListGroup.Item>
                    </ListGroup>
                    <Form.Group controlId='name'>
                    <Form.Label>Name</Form.Label>
                        <Form.Control
                            type='name'
                            placeholder='Enter name'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group controlId='age'>
                    <Form.Label>Age</Form.Label>
                        <Form.Control
                            type='age'
                            placeholder='Enter age'
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group controlId='blood_type'>
                    <Form.Label>Blood Type</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='Enter blood_type'
                            value={blood_type}
                            onChange={(e) => setBloodType(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group controlId='address'>
                    <Form.Label>Address</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='Enter address'
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group controlId='contact_no'>
                    <Form.Label>Name</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='Enter contact_no'
                            value={contact_no}
                            onChange={(e) => setContactNo(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    <Button type='submit' variant='primary'>
                        Save Changes
                    </Button>
                </Form>
                )}
            </FormContainer>
        </>
    )

}

export default HospitalAdminEditPatientInfo;