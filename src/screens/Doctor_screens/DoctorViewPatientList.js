import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { listPatients } from '../../actions/patientActions'

const DoctorViewPatientList = () => {
    const dispatch = useDispatch()

    const patientList = useSelector((state) => state.patientList)
    const { loading, error, patients } = patientList

    useEffect(() => {
        dispatch(listPatients())
    }, [dispatch])
    

    return (
        <Row>
        <Col md={12} align='center'>
            <h1>Patients List</h1>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant='danger'>{error}</Message>
            ) : (
            <Table striped bordered hover responsive className='table-sm'>
                <thead>
                <tr>
                    <th className="text-center">Patient Id</th>
                    <th className="text-center">Name</th>
                    <th className="text-center">Patient Information</th>
                    <th className="text-center">Medical Report</th>
                </tr>
                </thead>
                <tbody>
                    {patients.map((patient) => (
                        <tr key={patient.patient_id}>
                            <td className="text-center">{patient.patient_id}</td>
                            <td className="text-center">{patient.name}</td>
                            <td className="text-center">
                                <LinkContainer to={`/doctor/viewPatientInfo/${patient.patient_id}`}>
                                    <Button variant='dark' className='btn-sm'>
                                        Patient Info
                                    </Button>
                                </LinkContainer>
                            </td>
                            <td className="text-center">
                                <LinkContainer to={`/doctor/viewMedicalReport/${patient.patient_id}`}>
                                    <Button variant='dark' className='btn-sm'>
                                        Medical Report
                                    </Button>
                                </LinkContainer>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            )}
        </Col>
        </Row>
    );
}

export default DoctorViewPatientList;
