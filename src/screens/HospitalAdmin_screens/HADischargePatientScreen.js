import React, { useState, useEffect } from "react";
import { Form, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/Message";
import Meta from '../../components/Meta';
import Loader from "../../components/Loader";
import FormContainer from "../../components/FormContainer";
import { discharge } from "../../actions/patientActions";
import HospitalAdminSideNav from "./HospitalAdminSideNav";
import './HADischargePatientScreen.css';

const HADischargePatientScreen = ({ match, history }) => {

  const [patient_id, setId] = useState(match.params.id === ":id" ? ("") : (match.params.id));
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
       <Meta title={'Hospital Admin Discharge'}/>
      <Row >
        <Col sm={3}>    <HospitalAdminSideNav from='discharge' /></Col>
        <Col sm={8} >
          <Row>
            <Col sm={12}><h1 className='hadps__title'> Discharge Patient</h1> </Col>
          </Row>
          <hr className='hadps__hr'/>
          <br />
          <FormContainer>
            {error && <Message variant="danger">{error}</Message>}
            {response && <Message variant="success">{response["message"]}</Message>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler}>

              <Row>
                <Col>
                  <Form.Group controlId="id">
                    <Form.Label className='hadps__formLabel'>Patient Id</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Patient ID"
                      value={patient_id}
                      onChange={(e) => setId(e.target.value)}
                      className='hadps__formControl'>
                    </Form.Control>
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col>
                  <Form.Group controlId="status">
                    <Form.Label className='hadps__formLabel'>Status</Form.Label>
                    <br />
                    <select className="form-control hadps__formControl" value={status} name="status" onChange={(e) => setStatus(e.target.value)}>
                      <option >SELECT</option>
                      <option value="Dead">Dead</option>
                      <option value="Recovered">Recovered</option>

                    </select>
                  </Form.Group>

                </Col>
                <Col>
                  <Form.Group controlId="dischargeDateTime">
                    <Form.Label className='hadps__formLabel'>Discharge Date Time</Form.Label>
                    <Form.Control
                      type="datetime-local"
                      placeholder="Enter Discharge Date Time"
                      value={discharged_at}
                      onChange={(e) => setDischargeDateTime(e.target.value)}
                      className='hadps__formControl'>
                    </Form.Control>
                  </Form.Group>

                </Col>
              </Row>
              <br /><br />
              <div style={{ paddingLeft: "120px" }}>
                <button class="button button1" type="submit" > DISCHARGE </button></div>
            </Form>
          </FormContainer></Col>
        <Col sm={2} ></Col>
      </Row >
    </div>
  );
};
export default HADischargePatientScreen;
