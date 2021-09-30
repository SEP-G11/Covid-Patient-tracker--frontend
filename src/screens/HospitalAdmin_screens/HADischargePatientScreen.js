import React, { useState, useEffect } from "react";
import { Form,  Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import FormContainer from "../../components/FormContainer";
import { discharge } from "../../actions/patientActions";
import HospitalAdminSideNav from "./HospitalAdminSideNav";

const HADischargePatientScreen = ({match, location, history }) => {
  
  const [patient_id, setId] = useState(match.params.id ==":id" ? (""):(match.params.id));
 
  const [discharged_at, setDischargeDateTime] = useState("");
  const description = ""
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
  }, [history, response, userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      discharge(
        patient_id, discharged_at, description, status
      )
    );
  };

  return (
    <div>

      <Row >
        <Col sm={3}>    <HospitalAdminSideNav from='discharge'/></Col>
        <Col sm={8} >
          <Row>
            {/* <Col sm={1}> <img src={logo} width="200" height="90" ></img></Col> */}
            <Col sm={12}><h1 style={{ fontFamily: "arial", textAlign: "center", color: "#007c7a", fontSize: "40px", paddingLeft: "-50px", paddingTop: "60px" }}> Discharge Patient</h1> </Col>
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

              <Row>
                <Col>
                  <Form.Group controlId="id">
                    <Form.Label style={{ color: "#008A77", fontWeight: "bold" }}>Patient Id</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter PatientId"
                      value={patient_id}
                      onChange={(e) => setId(e.target.value)}
                      style={{ borderRadius: "20px", borderWidth: "1px", borderColor: "#007c7a", borderStyle: "solid", color: "#007c7a", outline: "#913163" }}
                    ></Form.Control>
                  </Form.Group>
                </Col>

              </Row>


              <Row>
                <Col>
                <Form.Group controlId="status">
                    <Form.Label style={{ color: "#008A77", fontWeight: "bold" }}>Status</Form.Label>
                    <br />
                    <select className="form-control" value={status} name="status" style={{ borderRadius: "20px", width: "150px", borderWidth: "1px", borderColor: "#007c7a", borderStyle: "solid", color: "#007c7a", outline: "#913163" }} onChange={(e) => setStatus(e.target.value)}>
                      <option >SELECT</option>
                      <option value="Dead">Dead</option>
                      <option value="Recovered">Recovered</option>

                    </select>
                  </Form.Group>
              
                </Col>
                <Col>

                <Form.Group controlId="dischargeDateTime">
                    <Form.Label style={{ color: "#008A77", fontWeight: "bold" }}>Discharge Date Time</Form.Label>
                    <Form.Control
                      type="datetime-local"
                      placeholder="Enter Discharge Date Time"
                      value={discharged_at}
                      onChange={(e) => setDischargeDateTime(e.target.value)}
                      style={{ borderRadius: "20px", borderWidth: "1px", borderColor: "#007c7a", borderStyle: "solid", color: "#007c7a", outline: "#913163" }}
                    ></Form.Control>
                  </Form.Group>
                  
                </Col>
              </Row>
              <br/><br/>
              <div style={{ paddingLeft: "120px" }}>
                <button class="button button1"
                  type="submit"
                >
                  DISCHRGE
                </button></div>
            </Form>
          </FormContainer></Col>
        <Col sm={2} ></Col>
      </Row >
    </div>
  );
};
export default HADischargePatientScreen;
