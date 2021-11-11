import React, { useState, useEffect }  from "react";
import { Form, Button, Row, Col, ListGroup } from "react-bootstrap";
import { LinkContainer } from 'react-router-bootstrap'
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import FormContainer from '../../components/FormContainer'
import { getPatientReportDetails , updatePatientReport } from '../../actions/reportActions'
import { REPORT_UPDATE_RESET } from '../../constants/reportConstants'
import DoctorSideNav from "./DoctorSideNav";

const DoctorEditMedicalReport = ({ match, history }) => {
    const patientId = match.params.id 

    const [status, setStatus] = useState('')
    const [symptoms, setSymptoms] = useState('')
    const [description, setDescription] = useState('')
    const [admitted_at, setAdmittedAt] = useState('')
    
    const dispatch = useDispatch()

    const patientReportDetails = useSelector((state) => state.patientReportDetails)
    const { loading, error, report } = patientReportDetails

    const patientReportUpdate = useSelector((state) => state.patientReportUpdate)
    const {
        loading: loadingUpdate,
        error: errorUpdate,
        success: successUpdate,
    } = patientReportUpdate

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    useEffect(() => {
        if (!userInfo) {
            history.push("/login");
        } else{
        if (successUpdate) {
          dispatch({ type: REPORT_UPDATE_RESET })
          history.push(`/doctor/viewMedicalReport/${patientId}`)
        } else {
          if (report.patient_id !== patientId) {
            dispatch(getPatientReportDetails(patientId))
          } else {
            setSymptoms(report.symptoms)
            setAdmittedAt(report.admitted_at)
            setDescription(report.description)
            setStatus(report.status)
          }
        }
        }
      }, [dispatch, history, patientId, report, successUpdate, userInfo])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updatePatientReport({ report_id:report.report_id , patient_id:patientId, symptoms, admitted_at, description, status }))
    }

    return (
        <div> 
          <Row >
            <Col sm={3}><DoctorSideNav from='viewPatientsList'/></Col>
            <Col sm={8} >
              <Row>
                {/* <Col sm={1}> <img src={logo} width="200" height="90" ></img></Col> */}
                <Col sm={12}><h1 style={{ fontFamily: "arial", textAlign: "center", color: "#007c7a", fontSize: "40px", paddingLeft: "-50px" }}>Edit Medical Report</h1> </Col>
              </Row>
              <hr
                style={{
                  color: "white",
                  backgroundColor: "#007c7a",
                  height: 2,
                }}
              />

              <Row>
                {/* <Col sm={1}> <img src={logo} width="200" height="90" ></img></Col> */}
                <Col sm={12}><h6 style={{ fontFamily: "arial", textAlign: "center", color: "#007c7a", fontSize: "15px", paddingLeft: "-50px", marginBottom: "20px" }}>Patient Id: {patientId}</h6> </Col>
              </Row>
              <Row>
                {/* <Col sm={1}> <img src={logo} width="200" height="90" ></img></Col> */}
                <Col sm={12}><h6 style={{ fontFamily: "arial", textAlign: "center", color: "#007c7a", fontSize: "15px", paddingLeft: "-50px", marginBottom: "20px" }}>Report Id: {report.report_id}</h6> </Col>
              </Row>
              <Row>
                {/* <Col sm={1}> <img src={logo} width="200" height="90" ></img></Col> */}
                <Col sm={6}><h6 style={{ fontFamily: "arial", textAlign: "right", color: "#007c7a", fontSize: "13px", paddingLeft: "-50px", marginBottom: "20px" }}>Ward: {report.ward}</h6> </Col>
                <Col sm={6}><h6 style={{ fontFamily: "arial", textAlign: "left", color: "#007c7a", fontSize: "13px", paddingLeft: "-50px", marginBottom: "20px" }}>Bed No: {report.bed_no}</h6> </Col>
              </Row>

              <FormContainer style={{ border: '2px solid #000000' }}>
                {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
                {loadingUpdate && <Loader />}
                <Form onSubmit={submitHandler}>
                  <Row>
                    <Col>
                      <Form.Group controlId="status">
                        <Form.Label style={{ color: "#008A77", fontWeight: "bold" }}>Status</Form.Label>
                        <br />
                        <select className="form-control" value={status} name="status" style={{ borderRadius: "20px", borderWidth: "1px", borderColor: "#007c7a", borderStyle: "solid", color: "#007c7a", outline: "#913163" }} onChange={(e) => setStatus(e.target.value)}>
                          <option >SELECT</option>
                          <option value="Active">Active</option>
                          <option value="Dead">Dead</option>
                          <option value="Recovered">Recovered</option>
                        </select>
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group controlId="aymptoms">
                        <Form.Label style={{ color: "#008A77", fontWeight: "bold" }}>Symptoms</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter symptoms"
                          value={symptoms}
                          onChange={(e) => setSymptoms(e.target.value)}
                          style={{ borderRadius: "20px", borderWidth: "1px", borderColor: "#007c7a", borderStyle: "solid", color: "#007c7a", outline: "#913163" }}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
    
                  <Form.Group controlId="description">
                    <Form.Label style={{ color: "#008A77", fontWeight: "bold" }}>Medical History</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        type="text"
                        placeholder="Enter medical history"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        style={{ borderRadius: "20px", borderWidth: "1px", borderColor: "#007c7a", borderStyle: "solid", color: "#007c7a", outline: "#913163" }}    
                      ></Form.Control>
                  </Form.Group>

                  <Row>
                    <Col>
                      <Form.Group controlId="date">
                        <Form.Label style={{ color: "#008A77", fontWeight: "bold" }}>Admitted Date</Form.Label>
                        <Form.Control
                            type="datetime-local"
                            placeholder="Enter Date"
                            value={admitted_at}
                            onChange={(e) => setAdmittedAt(e.target.value)
                            }
                            style={{ borderRadius: "20px", borderWidth: "1px", borderColor: "#007c7a", borderStyle: "solid", color: "#007c7a", outline: "#913163" }}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col sm={3}></Col>
                    <Col>
                    <Button type='submit' variant='primary' className='btn-sm button button1'>
                            Save Changes
                        </Button>
                    </Col>
                  </Row>
                </Form>
              </FormContainer>
            </Col>
          <Col sm={1}></Col>
        </Row>
      </div>
    )
}

export default DoctorEditMedicalReport;
