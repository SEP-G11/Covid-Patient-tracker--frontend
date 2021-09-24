import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col, Table } from "react-bootstrap";
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import FormContainer from "../../components/FormContainer";
import HospitalAdminSideNav from "./HospitalAdminSideNav";
import Pagination from '../../components/Pagination';
import { listPatients } from '../../actions/patientActions'

const HAViewPatientList = ({ history }) => {

    const dispatch = useDispatch();

    const patientList = useSelector((state) => state.patientList)
    const { loading, error, patients } = patientList

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const [currentPage, setCurrentPage] = useState(1);
    const [PageSize, setPageSize] = useState(10);

    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;

    const myFunction = () => {
        let input = document.getElementById("myInput");
        let filter = input.value.toUpperCase();
        let table = document.getElementById("myTable");
        let tr = table.getElementsByTagName("tr");
        for (let i = 0; i < tr.length; i++) {
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
        console.log(userInfo["results"])
        if (!userInfo) {
          history.push("/login");
        } else {
            dispatch(listPatients());
        }
      }, [history,userInfo,dispatch]);

    return (
        <div>

            <Row >
                <Col sm={3}>    <HospitalAdminSideNav /></Col>
                <Col sm={8} >
                <Row>
                    {/* <Col sm={1}> <img src={logo} width="200" height="90" ></img></Col> */}
                    <Col sm={12}><h1 style={{ fontFamily: "arial", textAlign: "center", color: "#007c7a", fontSize: "40px", paddingLeft: "-50px" }}>Patients List</h1> </Col>
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
                    <Row>
                        <Col md={5} align='left'>
                            <Form.Group controlId="name">
                                <Form.Label style={{ color: "#008A77", fontWeight: "bold" }}>Patient Name</Form.Label>
                                <Form.Control
                                id="myInput"
                                type="text"
                                placeholder="Search for names.."
                                onKeyUp={myFunction}
                                style={{ borderRadius: "20px", borderWidth: "1px", borderColor: "#007c7a", borderStyle: "solid", color: "#007c7a", outline: "#913163" }}
                                ></Form.Control>
                            </Form.Group>
                        </Col>
                        <Col md={2} align="right">
                        <Form.Group controlId="RATresult">
                            <Form.Label style={{ color: "#008A77", fontWeight: "bold" }}>Rows Per Page</Form.Label>
                            <select className="form-control" value={PageSize} name="PageSize" style={{ borderRadius: "20px", borderWidth: "1px", borderColor: "#007c7a", borderStyle: "solid", color: "#007c7a", outline: "#913163" }} onChange={(e) => setPageSize(e.target.value)}>
                                <option value='10'>10</option>
                                <option value='20'>20</option>
                                <option value='30'>30</option>
                                <option value='40'>40</option>
                                <option value='50'>50</option>
                                <option value={patients.length}>All</option>
                            </select>
                        </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                    <Table id="myTable" striped bordered hover responsive className='table-sm'>
                        <thead className="thead-dark">
                            <tr>
                                <th className="text-center table-head">Patient Id</th>
                                <th className="text-center table-head">Name</th>
                                <th className="text-center table-head">Patient Information</th>
                            </tr>
                        </thead>
                        <tbody className="text-dark">
                            {(patients.slice(firstPageIndex, lastPageIndex)).map((patient) => (
                                <tr key={patient.patient_id}>
                                    <td className="text-center">{patient.patient_id}</td>
                                    <td className="text-center">{patient.name}</td>
                                    <td className="text-center">
                                        <LinkContainer to={`/hospitalAdmin/viewPatientInfo/${patient.patient_id}`}>
                                            <Button className='btn-sm button5'>
                                                View Patient Info
                                            </Button>
                                        </LinkContainer>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    </Row>
                    <Row>
                    <Pagination
                        className="pagination-bar"
                        currentPage={currentPage}
                        totalCount={patients.length}
                        pageSize={PageSize}
                        onPageChange={page => setCurrentPage(page)}
                    />
                    </Row>
                    </Col>
                )}
                    </Col>
                <Col sm={2} ></Col>
            </Row >
        </div>
    );
};
export default HAViewPatientList;

