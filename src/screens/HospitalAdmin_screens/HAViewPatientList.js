import React, { useEffect, useState } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../../components/Message';
import Meta from '../../components/Meta';
import Loader from '../../components/Loader';
import { listPatients , filterPatients } from '../../actions/patientActions'
import Pagination from '../../components/Pagination';
import HospitalAdminSideNav from "./HospitalAdminSideNav";
import './HAViewPatientList.css';

const HAViewPatientList = ( { history }) => {
    const dispatch = useDispatch()

    const patientList = useSelector((state) => state.patientList)
    const { loading, error, patients } = patientList

    const [currentPage, setCurrentPage] = useState(1);
    const [PageSize, setPageSize] = useState(10);

    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const filteredPatients = useSelector((state) => state.filteredPatients)
    const { loading:loading_, error:error_, filtered_Patients } = filteredPatients

    const myFunction = () => {
        let input = document.getElementById("myInput");
        if (input.value.length != 0){
            dispatch(filterPatients(input.value))
        }else{
            let table2 = document.getElementById("myTable2");
            let tr = table2.getElementsByTagName("tr");
            for (let i = 0; i < tr.length; i++) {
                    tr[i].style.display = "none";
            }
        }
    }

    useEffect(() => {
        if (!userInfo) {
            history.push("/login");
        } else {
            dispatch(listPatients())
        }
    }, [dispatch,history,userInfo])

    return (
        <div>
            <Meta title={'Patient List'}/>
            <Row >
                <Col sm={3}><HospitalAdminSideNav from='viewPatientsList'/></Col>
                <Col sm={8} >
                <Row>
                    {/* <Col sm={1}> <img src={logo} width="200" height="90" ></img></Col> */}
                    <Col sm={12}><h1 className='havpl__title'>Patients List</h1> </Col>
                </Row>
                <hr className='havpl__hr'/>

                {loading ? (
                    <Loader />
                ) : error ? (
                    <Message variant='danger'>{error}</Message>
                ) : (
                    <Col md={12} align='center'>
                        <Row>
                        <Col md={5} align='left'>
                                <Form.Group controlId="searchname">
                                    <Form.Label className='havpl__formLabel'>Search</Form.Label>
                                        <Form.Control
                                        id="myInput"
                                        type="text"
                                        placeholder="Search for patients.."
                                        onKeyUp={myFunction}
                                        className='havpl__formControl'
                                        style={{ borderRadius: "20px", borderWidth: "1px", borderColor: "#007c7a", borderStyle: "solid", outline: "#913163" }}
                                        ></Form.Control>
                                </Form.Group>
                            </Col>
                            <Col md={2} align="left">
                                <Form.Group controlId='pageSize'>
                                    <Form.Label className='havpl__formLabel'>Rows Per Page</Form.Label>
                                        <select className="form-control havpl__formControl" as='select'
                                        value={PageSize}
                                        onChange={(e) => setPageSize(e.target.value)}>
                                            <option value="10">10</option>
                                            <option value="20">20</option>
                                            <option value="30">30</option>
                                            <option value="40">40</option>
                                            <option value="50">50</option>
                                            <option value={patients.length}>All</option>
                                        </select>
                                </Form.Group>
                            </Col>
                        </Row>
                        {loading_ ? (
                        <Loader />
                    ) : (
                    <Col md={12} align='center'>
                    <Table id="myTable2" striped bordered hover responsive className='table-sm'>
                            <tbody className="text-dark">
                                {filtered_Patients.map((patient) => (
                                    <tr key={patient.patient_id}>
                                        <td className="text-center">{patient.patient_id}</td>
                                        <td className="text-center">{patient.name}</td>
                                        <td className="text-center">
                                            <LinkContainer to={`/hospitalAdmin/viewPatientInfo/${patient.patient_id}`}>
                                                <Button className='btn-sm button button5'>
                                                    View Patient Info
                                                </Button>
                                            </LinkContainer>
                                        </td>
                                        <td className="text-center">
                                            <LinkContainer to={`/hospitalAdmin/viewMedicalReport/${patient.patient_id}`}>
                                                <Button className='btn-sm button button5' >
                                                    View Medical Report
                                                </Button>
                                            </LinkContainer>
                                        </td>
                                        <td className="text-center">
                                            <LinkContainer to={`/hospitalAdmin/discharge/${patient.patient_id}`}>
                                                <Button className='btn-sm button button5' >
                                                    Discharge
                                                </Button>
                                            </LinkContainer>
                                        </td>
                                        <td className="text-center">
                                            <LinkContainer to={`/hospitalAdmin/transfer/${patient.patient_id}`}>
                                                <Button className='btn-sm button button5' >
                                                Transfer
                                                </Button>
                                            </LinkContainer>
                                        </td>
                                        <td className="text-center">
                                            <LinkContainer to={`/hospitalAdmin/enter/${patient.patient_id}`}>
                                                <Button className='btn-sm button button5' >
                                                Enter Result
                                                </Button>
                                            </LinkContainer>
                                        </td>

                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                </Col>
                    )}
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
                                                <Button className='btn-sm button button5'>
                                                    View Patient Info
                                                </Button>
                                            </LinkContainer>
                                        </td>
                                        <td className="text-center">
                                            <LinkContainer to={`/hospitalAdmin/discharge/${patient.patient_id}`}>
                                                <Button className='btn-sm button button5' >
                                                    Discharge
                                                </Button>
                                            </LinkContainer>
                                        </td>
                                        <td className="text-center">
                                            <LinkContainer to={`/hospitalAdmin/transfer/${patient.patient_id}`}>
                                                <Button className='btn-sm button button5' >
                                                Transfer
                                                </Button>
                                            </LinkContainer>
                                        </td>
                                        <td className="text-center">
                                            <LinkContainer to={`/hospitalAdmin/enter/${patient.patient_id}`}>
                                                <Button className='btn-sm button button5' >
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
            </Col>
            <Col sm={1}></Col>
        </Row>
    </div>
    );
}

export default HAViewPatientList;
