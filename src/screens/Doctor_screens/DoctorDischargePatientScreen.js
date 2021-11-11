import React, { useState, useEffect } from "react";
import { Form,  Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/Message";
import Meta from '../../components/Meta';
import Loader from "../../components/Loader";
import FormContainer from "../../components/FormContainer";
import { discharge } from "../../actions/patientActions";
import DoctorSideNav from "./DoctorSideNav";
import './DoctorDischargePatientScreen.css';

const DoctorDischargePatientScreen = ({ match, history }) => {

  const [patient_id, setId] = useState(match.params.id ===":id" ? (""):(match.params.id));
  const [discharged_at, setDischargeDateTime] = useState("");
  const [description, setMedicalHistory] = useState("");
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
      setMedicalHistory("");
    }
  }, [match,history, response, userInfo]);

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
        <Meta title={'Doctor Discharge'}/>
        <Row >
          <Col sm={3}>    <DoctorSideNav from='discharge'/></Col>
          <Col sm={8} >
            <Row>
              <Col sm={12}><h1 className='ddps__title'> Discharge Patient</h1> </Col>
            </Row>
            <hr className='ddps__hr'/>
            <br />


            <FormContainer>

              {error && <Message variant="danger">{error}</Message>}
              {response && <Message variant="success">{response["message"]}</Message>}
              {loading && <Loader />}
              <Form onSubmit={submitHandler}>

                <Row>
                  <Col>
                    <Form.Group controlId="id">
                      <Form.Label className='ddps__formLabel'>Patient ID</Form.Label>
                      <Form.Control
                          type="text"
                          placeholder="Enter Patient ID"
                          value={patient_id}
                          onChange={(e) => setId(e.target.value)}
                          className='ddps__formControl'>
                      </Form.Control>
                    </Form.Group>
                  </Col>

                </Row>


                <Row>
                  <Col>
                    <Form.Group controlId="status">
                      <Form.Label className='ddps__formLabel'>Status</Form.Label>
                      <br />
                      <select className="form-control ddps__formControl" value={status} name="status" onChange={(e) => setStatus(e.target.value)}>
                        <option >SELECT</option>
                        <option value="Dead">Dead</option>
                        <option value="Recovered">Recovered</option>

                      </select>
                    </Form.Group>

                  </Col>
                  <Col>
                    <Form.Group controlId="dischargeDateTime">
                      <Form.Label className='ddps__formLabel'>Discharge Date Time</Form.Label>
                      <Form.Control
                          type="datetime-local"
                          placeholder="Enter Discharge Date Time"
                          value={discharged_at}
                          onChange={(e) => setDischargeDateTime(e.target.value)}
                          className='ddps__formControl'>
                      </Form.Control>
                    </Form.Group>

                  </Col>
                </Row>


                <Form.Group controlId="description">
                  <Form.Label className='ddps__formLabel'>Medical History</Form.Label>
                  <Form.Control
                      as="textarea"
                      rows="3"
                      type="text"
                      placeholder="Enter Any Medical History"
                      value={description}
                      onChange={(e) => setMedicalHistory(e.target.value)}
                      className='ddps__formControl'>
                  </Form.Control>
                </Form.Group>

                <br /><br />
                <div style={{ paddingLeft: "120px" }}>
                  <button class="button button1"
                          type="submit"
                  >
                    DISCHRGE
                  </button></div>
              </Form>
            </FormContainer>
          </Col>
          <Col sm={2} ></Col>
        </Row >  <br /><br />
      </div>
  );
};

export default DoctorDischargePatientScreen;
