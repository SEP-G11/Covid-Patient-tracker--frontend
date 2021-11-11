import React, { useState, useEffect }  from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../../components/FormContainer'
import { getPatientReportDetails , updatePatientReport } from '../../actions/reportActions'
import { REPORT_UPDATE_RESET } from '../../constants/reportConstants'
import DoctorSideNav from "./DoctorSideNav";
import Meta from "../../components/Meta";
import './DoctorEditMedicalReport.css';

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
            <Meta title={'Edit Medical Report'}/>
          <Row >
            <Col sm={3}><DoctorSideNav from='viewPatientsList'/></Col>
            <Col sm={8} >
              <Row>
                <Col sm={12}><h1 className='demr__title'>Edit Medical Report</h1> </Col>
              </Row>
              <hr className='demr__hr'/>

              <Row>
                {/* <Col sm={1}> <img src={logo} width="200" height="90" ></img></Col> */}
                <Col sm={12}><h6 className='demr__IDValues'>Patient ID: {patientId}</h6> </Col>
              </Row>
              <Row>
                {/* <Col sm={1}> <img src={logo} width="200" height="90" ></img></Col> */}
                <Col sm={12}><h6 className='demr__IDValues'>Report ID: {report.report_id}</h6> </Col>
              </Row>
              <Row>
                {/* <Col sm={1}> <img src={logo} width="200" height="90" ></img></Col> */}
                <Col sm={6}><h6 style={{ fontFamily: "arial", textAlign: "right", color: "#007c7a", fontSize: "13px", paddingLeft: "-50px", marginBottom: "20px" }}>Ward: {report.ward}</h6> </Col>
                <Col sm={6}><h6 style={{ fontFamily: "arial", textAlign: "left", color: "#007c7a", fontSize: "13px", paddingLeft: "-50px", marginBottom: "20px" }}>Bed No: {report.bed_no}</h6> </Col>
              </Row>

              <FormContainer className='demr__formContainer'>
                {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
                {loadingUpdate && <Loader />}
                <Form onSubmit={submitHandler}>
                  <Row>
                    <Col>
                      <Form.Group controlId="status">
                        <Form.Label className='demr__formLabel'>Status</Form.Label>
                        <br />
                        <select className="form-control demr__formControl" value={status} name="status" onChange={(e) => setStatus(e.target.value)}>
                          <option >SELECT</option>
                          <option value="Active">Active</option>
                          <option value="Dead">Dead</option>
                          <option value="Recovered">Recovered</option>
                        </select>
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group controlId="aymptoms">
                        <Form.Label className='demr__formLabel'>Symptoms</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter symptoms"
                          value={symptoms}
                          onChange={(e) => setSymptoms(e.target.value)}
                          className='demr__formControl'>
                        </Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
    
                  <Form.Group controlId="description">
                    <Form.Label className='demr__formLabel'>Medical History</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        type="text"
                        placeholder="Enter medical history"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className='demr__formControl'>
                      </Form.Control>
                  </Form.Group>

                  <Row>
                    <Col>
                      <Form.Group controlId="date">
                        <Form.Label className='demr__formLabel'>Admitted Date</Form.Label>
                        <Form.Control
                            type="datetime-local"
                            placeholder="Enter Date"
                            value={admitted_at}
                            onChange={(e) => setAdmittedAt(e.target.value)}
                            className='demr__formControl'>
                        </Form.Control>
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
