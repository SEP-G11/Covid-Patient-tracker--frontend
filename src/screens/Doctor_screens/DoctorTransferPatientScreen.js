import React, { useState, useEffect } from "react";
import { Form,  Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import FormContainer from "../../components/FormContainer";
import {  transfer } from "../../actions/patientActions";
import DoctorSideNav from "./DoctorSideNav";


const DoctorTransferPatientScreen = ({ match, history }) => {

  const [patient_id, setId] = useState(match.params.id ===":id" ? (""):(match.params.id));

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
  }, [history, response, userInfo]);
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
      <Row >
        <Col sm={3}>    <DoctorSideNav from='transfer' /></Col>
        <Col sm={8} >
          <Row>
            {/* <Col sm={1}> <img src={logo} width="200" height="90" ></img></Col> */}
            <Col sm={12}><h1 style={{ fontFamily: "arial", textAlign: "center", color: "#007c7a", fontSize: "40px", paddingLeft: "-50px", paddingTop: "60px" }}> Transfer Patient</h1> </Col>
          </Row>
          <hr
            style={{
              color: "white",
              backgroundColor: "#007c7a",
              height: 2,
            }}
          />
          <br />
          <FormContainer>

            {error && <Message variant="danger">{error}</Message>}
            {response && <Message variant="success">{response["message"]}</Message>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler}>
              <Form.Group controlId="id">
                <Form.Label style={{ color: "#008A77", fontWeight: "bold" }}>Patient Id</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Id"
                  value={patient_id}
                  onChange={(e) => setId(e.target.value)}
                  style={{ borderRadius: "20px", borderWidth: "1px", borderColor: "#007c7a", borderStyle: "solid", color: "#007c7a", outline: "#913163" }}

                ></Form.Control>
              </Form.Group>


              <Row>

              <Col>
                  {" "}
                  <Form.Group controlId="dest_bed_id">
                    <Form.Label style={{ color: "#008A77", fontWeight: "bold" }}>Destination Bed Id</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Dest: Bed Id"
                      value={dest_bed_id}
                      onChange={(e) => setDestinationBedId(e.target.value)}
                      style={{ borderRadius: "20px", borderWidth: "1px", borderColor: "#007c7a", borderStyle: "solid", color: "#007c7a", outline: "#913163" }}

                    ></Form.Control>
                  </Form.Group>
                </Col>
                <Col>

                 
                  
                </Col>

           
              </Row>


              <Row>
                <Col>
                  <Form.Group controlId="transferDateTime">
                    <Form.Label style={{ color: "#008A77", fontWeight: "bold" }}>Transfer Date Time</Form.Label>
                    <Form.Control
                      type="datetime-local"
                      placeholder="Enter Date Time"
                      value={transfer_date}
                      onChange={(e) => setTransferDateTime(e.target.value)}
                      style={{ borderRadius: "20px", borderWidth: "1px", borderColor: "#007c7a", borderStyle: "solid", color: "#007c7a", outline: "#913163" }}

                    ></Form.Control>
                  </Form.Group>
                </Col>

              </Row>

              <br /><br />
              <div style={{ paddingLeft: "110px" }}>
                <button class="button button1"
                  type="submit"
                >
                  TRANSFER
                </button></div>
            </Form>
          </FormContainer></Col>
        <Col sm={3}></Col>
      </Row>
    </div>
  );
};
export default DoctorTransferPatientScreen;
