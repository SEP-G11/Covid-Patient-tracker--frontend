import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col, FloatingLabel } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import FormContainer from "../../components/FormContainer";
import {  transfer } from "../../actions/patientActions";
import DoctorSideNav from "./DoctorSideNav";


const DoctorTransferPatientScreen = ({ location, history }) => {

  const [patient_id , setId] = useState("");
  const [origin_bed_id, setOriginBedId] = useState("");
  const [dest_bed_id, setDestinationBedId] = useState("");
  const [transfer_date, setTransferDateTime] = useState("");
 
  const dispatch = useDispatch();
  const patientTransfer = useSelector((state) => state.patientTransfer);
  const { loading, error, response } = patientTransfer;

  
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else if (response) {
      setId("");
      setOriginBedId("");     
      setDestinationBedId("");
      setTransferDateTime("");
    
    }
  }, [history, response]);
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      transfer(
        patient_id,
        origin_bed_id,
        dest_bed_id,
        transfer_date
      
      )
    );
  };

  return (
    <div>
      <DoctorSideNav/>
      <FormContainer>
        <h1>Transfer Patient</h1>
        {error && <Message variant="danger">{error}</Message>}
        {response && <Message variant="success">{response["message"]}</Message>}
        {loading && <Loader />}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="id">
            <Form.Label>Patient Id</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Id"
              value={patient_id}
              onChange={(e) => setId(e.target.value)}
            ></Form.Control>
          </Form.Group>

              
          <Row>
            <Col>
              {" "}
              <Form.Group controlId="origin_bed_id">
            <Form.Label>Origin Bed Id</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Origin Bed Id"
              value={origin_bed_id}
              onChange={(e) => setOriginBedId(e.target.value)}
            ></Form.Control>
          </Form.Group>
            </Col>

            <Col>
              {" "}
              <Form.Group controlId="dest_bed_id">
            <Form.Label>Destination Bed Id</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Destination Bed Id"
              value={dest_bed_id}
              onChange={(e) => setDestinationBedId(e.target.value)}
            ></Form.Control>
          </Form.Group>
            </Col>
          </Row>
         

          <Row>
            <Col>
              <Form.Group controlId="transferDateTime">
                <Form.Label>Transfer Date Time</Form.Label>
                <Form.Control
                   type="datetime-local"
                  placeholder="Enter Date Time"
                  value={transfer_date}
                  onChange={(e) => setTransferDateTime(e.target.value)}
                ></Form.Control>
              </Form.Group>
            </Col>
            <Col>              
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
            Transfer
          </Button>
        </Form>
      </FormContainer>
     
    </div>
  );
};

export default DoctorTransferPatientScreen;
