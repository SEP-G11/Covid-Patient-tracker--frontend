import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col, FloatingLabel } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import FormContainer from "../../components/FormContainer";
import { admit } from "../../actions/patientActions";
import DoctorSideNav from "./DoctorSideNav";


const DoctorAdmitPatientScreen = ({ location, history }) => {
  const name = "";
  const [id, setId] = useState("");
  const age = "";
  const gender = "";
  const address = "";
  const contactnumber = "";
  const bloodtype = "";
  const district = "";
  const [testId, setTestId] = useState("");
  const isvaccinated = "";
  const [RATresult, setRATresult] = useState("");
  const [medicalHistory, setMedicalHistory] = useState("");
  const [reportId, setReportId] = useState("");
  const [bedId, setBedId] = useState("");
  const [allocationId, setAllocationId] = useState("");
  const [admitDateTime, setAdmitDateTime] = useState("");

  const dispatch = useDispatch();

  const patientAdmit = useSelector((state) => state.patientAdmit);
  const { loading, error, response } = patientAdmit;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {

    if (!userInfo) {
      history.push("/login");
    } else if (response) {
      setId("");
      setTestId("");
      setRATresult("");
      setMedicalHistory("");
      setReportId("");
      setBedId("");
      setAllocationId("");
      setAdmitDateTime("");      

    }
  }, [history, response]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      admit(
        name,
        id,
        age,
        gender,
        address,
        contactnumber,
        bloodtype,
        district,
        testId,
        isvaccinated,
        RATresult,
        medicalHistory,
        reportId,
        bedId,
        allocationId,
        admitDateTime
      )
    );

  
  };

  return (
    <div>
       <DoctorSideNav/>
      <FormContainer>
        <h1>Admit New Patient</h1>
        {error && <Message variant="danger">{error}</Message>}
        {response && <Message variant="success">{response["message"]}</Message>}
        {loading && <Loader />}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="id">
            <Form.Label>Patient Id</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Id"
              value={id}
              onChange={(e) => setId(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="reportId">
            <Form.Label>Report Id</Form.Label>
            <Form.Control
              type="text"
              placeholder="Report Id"
              value={reportId}
              onChange={(e) => setReportId(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Row>
            <Col>
              {" "}
              <Form.Group controlId="allocationId">
                <Form.Label>Allocation Id</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Allocation Id"
                  value={allocationId}
                  onChange={(e) => setAllocationId(e.target.value)}
                ></Form.Control>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="bedId">
                <Form.Label>Bed Id</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Bed Id"
                  value={bedId}
                  onChange={(e) => setBedId(e.target.value)}
                ></Form.Control>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col>
              <Form.Group controlId="testId">
                <Form.Label>Test Id</Form.Label>

                <Form.Control
                  type="text"
                  placeholder="Test Id"
                  value={testId}
                  onChange={(e) => setTestId(e.target.value)}
                ></Form.Control>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="RATresult">
                <Form.Label>RAT Result</Form.Label>
                <br />
                <select onChange={(e) => setRATresult(e.target.value)}>
                  <option>select </option>
                  <option value="1">POSITIVE </option>
                  <option value="0">NEGATIVE</option>
                </select>
              </Form.Group>
            </Col>
          </Row>

          <Form.Group controlId="medicalHistory">
            <Form.Label>Medical History</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              type="text"
              placeholder="Enter Any Medical History"
              value={medicalHistory}
              onChange={(e) => setMedicalHistory(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Row>
            <Col>
              <Form.Group controlId="admitDateTime">
                <Form.Label>Admit Date Time</Form.Label>
                <Form.Control
                  type="datetime-local"
                  placeholder="Enter Date Time"
                  value={admitDateTime}
                  onChange={(e) => setAdmitDateTime(e.target.value)}
                ></Form.Control>
              </Form.Group>
            </Col>
            <Col></Col>
          </Row>

          <Button
            type="submit"
            style={{
              color: "white",
              background: "#007c7a",
              marginBottom: "50px",
            }}
          >
            Admit
          </Button>
        </Form>
      </FormContainer>
     
    </div>
  );
};

export default DoctorAdmitPatientScreen;
