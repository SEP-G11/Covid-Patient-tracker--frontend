import React, { useEffect, useState } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col, Form } from 'react-bootstrap'
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { listPatients } from '../../actions/patientActions'
import Pagination from '../../components/Pagination';

const HospitalAdminViewPatientList = () => {
    const dispatch = useDispatch()

    const patientList = useSelector((state) => state.patientList)
    const { loading, error, patients } = patientList

    const [currentPage, setCurrentPage] = useState(1);
    const [PageSize, setPageSize] = useState(10);

    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;

    const myFunction = () => {
        let input = document.getElementById("myInput");
        let filter = input.value.toUpperCase();
        let table = document.getElementById("myTable");
        let tr = table.getElementsByTagName("tr");
        for ( let i = 0; i < tr.length; i++) {
            let td = tr[i].getElementsByTagName("td")[1];
            if (td) {
                let txtValue = td.textContent || td.innerText;
                if (txtValue.toUpperCase().indexOf(filter) > -1) {
                    tr[i].style.display = "";
                } else {
                    tr[i].style.display = "none";
                } 
            }    
        }
    }

    useEffect(() => {
        dispatch(listPatients())
    }, [dispatch])
    
    return (
        <div>
            <h1 align='center'>Patients List</h1>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant='danger'>{error}</Message>
            ) : (
            <Col md={12} align='center'>
            <Row>
            <Col md={10} align='left'>
                <input type="text" id="myInput" onKeyUp={myFunction} placeholder="Search for names.." title="Type in a name"></input>
            </Col>
            <Col md={2} align="right">
                <Form.Group controlId='pageSize'>
                    <Form.Label class="text-dark">Rows Per Page</Form.Label>
                        <Form.Control className="dropdown" 
                            as='select'
                            value={PageSize}
                            onChange={(e) => setPageSize(e.target.value)}
                        >
                            <option value='' disabled selected hidden>Select Page Size</option>
                            <option value='10'>10</option>
                            <option value='20'>20</option>
                            <option value='30'>30</option>
                            <option value='40'>40</option>
                            <option value='50'>50</option>
                            <option value={patients.length}>All</option>
                        </Form.Control> 
                </Form.Group>
            </Col>
            </Row>
            <Table id="myTable" striped bordered hover responsive className='table-sm'>
                <thead className="thead-dark">
                <tr>
                    <th className="text-center table-head">Patient Id</th>
                    <th className="text-center table-head">Name</th>
                    <th className="text-center table-head">Patient Information</th>
                    <th className="text-center table-head">Discharge</th>
                                    <th className="text-center table-head">Transfer</th>
                                    <th className="text-center table-head"> Enter Result</th>
                </tr>
                </thead>
                <tbody className="text-dark">
                    {(patients.slice(firstPageIndex, lastPageIndex)).map((patient) => (
                        <tr key={patient.patient_id}>
                            <td className="text-center">{patient.patient_id}</td>
                            <td className="text-center">{patient.name}</td>
                            <td className="text-center">
                                <LinkContainer to={`/hospitalAdmin/viewPatientInfo/${patient.patient_id}`}>
                                    <Button className='btn-sm btn-default'>
                                        Patient Info
                                    </Button>
                                </LinkContainer>
                            </td>
                            <td className="text-center">
                                <LinkContainer to={`/hospitalAdmin/discharge/${patient.patient_id}`}>
                                    <Button className='btn-sm btn-default'>
                                        Discharge
                                    </Button>
                                </LinkContainer>
                            </td>
                            <td className="text-center">
                                <LinkContainer to={`/hospitalAdmin/transfer/${patient.patient_id}`}>
                                    <Button className='btn-sm btn-default'>
                                        Transfer
                                    </Button>
                                </LinkContainer>
                            </td>
                            <td className="text-center">
                                <LinkContainer to={`/hospitalAdmin/enter/${patient.patient_id}`}>
                                    <Button className='btn-sm btn-default'>
                                    Enter Result
                                    </Button>
                                </LinkContainer>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <Pagination
                className="pagination-bar"
                currentPage={currentPage}
                totalCount={patients.length}
                pageSize={PageSize}
                onPageChange={page => setCurrentPage(page)}
            />
        </Col>
        )}
    </div>
    );
}

export default HospitalAdminViewPatientList;
