import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col, FloatingLabel } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import FormContainer from "../../components/FormContainer";
import { discharge } from "../../actions/patientActions";
import HospitalAdminSideNav from "./HospitalAdminSideNav";

const HADischargePatientScreen = ({ location, history }) => {
  const [patient_id, setId] = useState("");
  const [discharged_at, setDischargeDateTime] = useState("");  
  const description=""
  const [status, setStatus] = useState("");

  const dispatch = useDispatch();

  const patientDischarge = useSelector((state) => state.patientDischarge);
  const { loading, error, response } = patientDischarge;

  
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin;


  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else if (response) {     
      setId("");     
      setStatus("");  
      setDischargeDateTime("");
    }
  }, [history, response]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      discharge(
        patient_id,discharged_at,description,status
      )
    );
  };

  return (
    <div>
      <HospitalAdminSideNav/>
      <FormContainer>
        <h1>Discharge Patient</h1>
        {error && <Message variant="danger">{error}</Message>}
        {response && <Message variant="success">{response["message"]}</Message>}
        {loading && <Loader />}
        <Form onSubmit={submitHandler}>         

          <Row>
            <Col>
              <Form.Group controlId="id">
                <Form.Label>Patient Id</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter PatientId"
                  value={patient_id}
                  onChange={(e) => setId(e.target.value)}
                ></Form.Control>
              </Form.Group>
            </Col>
            
          </Row>
         
                           
          <Row>
            <Col>
              <Form.Group controlId="dischargeDateTime">
                <Form.Label>Discharge Date Time</Form.Label>
                <Form.Control
                  type="datetime-local"
                  placeholder="Enter Discharge Date Time"
                  value={discharged_at}
                  onChange={(e) => setDischargeDateTime(e.target.value)}
                ></Form.Control>
              </Form.Group>
            </Col>
            <Col>   <Form.Group controlId="status">
                <Form.Label>Status</Form.Label>
                <br />
                <select onChange={(e) => setStatus(e.target.value)}>
                  <option>select </option>                 
                  <option value="Dead">Dead</option>
                  <option value="Recovered">Recovered</option>
                 
                </select>
              </Form.Group>            
            </Col>
          </Row>

          <Button
            type="submit"
            style={{
              color: "white",
              background: "#007c7a",
              marginBottom: "50px",
            }}
          >
            DISCHRGE
          </Button>
        </Form>
      </FormContainer>
     
    </div>
  );
};
export default HADischargePatientScreen;
