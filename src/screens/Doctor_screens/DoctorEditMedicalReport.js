import React, { useState, useEffect }  from "react";
import { Form, Button, Row, Col, ListGroup } from "react-bootstrap";
import { LinkContainer } from 'react-router-bootstrap'
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import FormContainer from '../../components/FormContainer'
import { getPatientReportDetails , updatePatientReport } from '../../actions/patientActions'
import { REPORT_UPDATE_RESET } from '../../constants/patientConstants'

const DoctorEditMedicalReport = ({ match, history }) => {
    const patientId = match.params.id 

    const [symptoms, setSymptoms] = useState('')
    const [admitted_at, setAdmittedAt] = useState('')
    const [discharged_at, setDischargedAt] = useState('')
    const [description, setDescription] = useState('')
    const [status, setStatus] = useState('')

    const dispatch = useDispatch()

    const patientReportDetails = useSelector((state) => state.patientReportDetails)
    const { loading, error, report } = patientReportDetails

    const patientReportUpdate = useSelector((state) => state.patientReportUpdate)
    const {
        loading: loadingUpdate,
        error: errorUpdate,
        success: successUpdate,
    } = patientReportUpdate

    useEffect(() => {
        if (successUpdate) {
          dispatch({ type: REPORT_UPDATE_RESET })
          history.push('/doctor/patientList')
        } else {
          if (report.patient_id !== patientId) {
            dispatch(getPatientReportDetails(patientId))
          } else {
            setSymptoms(report.symptoms)
            setAdmittedAt(report.admitted_at)
            setDischargedAt(report.discharged_at)
            setDescription(report.description)
            setStatus(report.status)
          }
        }
      }, [dispatch, history, patientId, report, successUpdate])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updatePatientReport({ report_id:report.report_id , patient_id:patientId, symptoms, admitted_at, discharged_at, description, status }))
    }

    return (
        <>
            <Link to='/doctor/patientList' className='btn btn-light my-3'>
                Go Back
            </Link>
            <FormContainer>
                <h1>Update Medical Report</h1>
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
                                <strong>Report Id: </strong> {report.report_id}
                            </p>
                            <p>
                                <strong>Patient Id: </strong> {patientId}
                            </p>
                        </ListGroup.Item>
                    </ListGroup>
                    <Form.Group controlId='symptoms'>
                    <Form.Label>Symptoms</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='Enter symptoms'
                            value={symptoms}
                            onChange={(e) => setSymptoms(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group controlId='admitted_at'>
                    <Form.Label>Admitted At</Form.Label>
                        <Form.Control
                            type='datetime'
                            placeholder='Enter admitted_at'
                            value={admitted_at}
                            onChange={(e) => setAdmittedAt(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group controlId='discharged_at'>
                    <Form.Label>Discharged At</Form.Label>
                        <Form.Control
                            type='datetime'
                            placeholder='Enter discharged-at'
                            value={discharged_at}
                            onChange={(e) => setDischargedAt(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group controlId='description'>
                    <Form.Label>Description</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='Enter description'
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group controlId='status'>
                    <Form.Label>Status</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='Enter status'
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
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

export default DoctorEditMedicalReport;