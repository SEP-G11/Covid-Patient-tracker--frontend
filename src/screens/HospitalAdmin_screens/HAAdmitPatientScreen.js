import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col, FloatingLabel } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import FormContainer from "../../components/FormContainer";
import { admit } from "../../actions/patientActions";
import HospitalAdminSideNav from "./HospitalAdminSideNav";

const HAAdmitPatientScreen = ({ location, history }) => {
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [contactnumber, setContactnumber] = useState("");
  const [bloodtype, setBloodtype] = useState("");
  const [district, setDistrict] = useState("");
  const [testId, setTestId] = useState("");
  const [isvaccinated, setIsvaccinated] = useState("");
  const [RATresult, setRATresult] = useState("");
  const medicalHistory = "";
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
      setName("");
      setId("");
      setAge("");
      setGender("");
      setAddress("");
      setContactnumber("");
      setBloodtype("");
      setDistrict("");
      setTestId("");
      setIsvaccinated("");
      setRATresult("");
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
      <HospitalAdminSideNav />
      <FormContainer>
        <h1>Admit New Patient</h1>
        {error && <Message variant="danger">{error}</Message>}
        {response && <Message variant="success">{response["message"]}</Message>}
        {loading && <Loader />}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="name">
            <Form.Label>Patient Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="id">
            <Form.Label>Patient Id</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter ID"
              value={id}
              onChange={(e) => setId(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Row>
            <Col>
              <Form.Group controlId="age">
                <Form.Label>Age</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter Age"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                ></Form.Control>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="gender">
                <Form.Label>Gender</Form.Label>
                <Row className="px-3 py-2">
                  <Form.Check
                    type="radio"
                    label="Male"
                    name="Male"
                    id="Male"
                    onChange={(e) => setGender(e.target.value)}
                  />
                  <br />
                  <Form.Check
                    type="radio"
                    label="Female"
                    name="Female"
                    id="Female"
                    style={{ marginLeft: "20px" }}
                    onChange={(e) => setGender(e.target.value)}
                  />
                </Row>
              </Form.Group>
            </Col>
          </Row>

          <Form.Group controlId="address">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="address"
              placeholder="Enter Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="contactnumber">
            <Form.Label>Contact Number</Form.Label>
            <Form.Control
              type="mobile number"
              placeholder="Enter Contact Number"
              value={contactnumber}
              onChange={(e) => setContactnumber(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Row>
            <Col>
              <Form.Group controlId="bloodType">
                <Form.Label>Blood Type</Form.Label>
                <br />
                <select onChange={(e) => setBloodtype(e.target.value)}>
                  <option>select </option>
                  <option value="A+">A+ </option>
                  <option value="O+">O+</option>
                  <option value="B+">B+</option>
                  <option value="AB+">AB+</option>
                  <option value="A-">A-</option>
                  <option value="O-">O-</option>
                  <option value="B-">B-</option>
                  <option value="AB-">AB-</option>
                </select>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="district">
                <Form.Label>District</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter District"
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                ></Form.Control>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col>
              <Form.Group controlId="isvaccinated">
                <Form.Label>Isvaccinated</Form.Label>

                <Row className="px-3 py-2">
                  <Form.Check
                    type="radio"
                    label="Yes"
                    name="1"
                    id="1"
                    onChange={(e) => setIsvaccinated(e.target.value)}
                  />
                  <br />
                  <Form.Check
                    type="radio"
                    label="No"
                    name="0"
                    id="0"
                    style={{ marginLeft: "20px" }}
                    onChange={(e) => setIsvaccinated(e.target.value)}
                  />
                </Row>
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
              <Form.Group controlId="reportId">
                <Form.Label>Report Id</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Report Id"
                  value={reportId}
                  onChange={(e) => setReportId(e.target.value)}
                ></Form.Control>
              </Form.Group>
            </Col>
          </Row>
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

          <Form.Group controlId="admitDateTime">
            <Form.Label>Admit Date Time</Form.Label>
            <Form.Control
              type="datetime-local"
              placeholder="Enter Date Time"
              value={admitDateTime}
              onChange={(e) => setAdmitDateTime(e.target.value)}
            ></Form.Control>
          </Form.Group>

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

export default HAAdmitPatientScreen;
