import React, { useState, useEffect } from "react";
import { Form,  Row, Col,  } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/Message";
import Meta from '../../components/Meta';
import Loader from "../../components/Loader";
import FormContainer from "../../components/FormContainer";
import {  transfer } from "../../actions/patientActions";
import HospitalAdminSideNav from "./HospitalAdminSideNav";
import './HATransferPatientScreen.css';

const HATransferPatientScreen = ({match,  history }) => {

  const [patient_id, setId] = useState(match.params.id ===":id" ? (""):(match.params.id));
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
      setDestinationBedId("");
      setTransferDateTime("");

    }
  }, [history, response, userInfo]);
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
        transfer(
            patient_id,
            dest_bed_id,
            transfer_date
        )
    );
  };

  return (
      <div>
        <Meta title={'Hospital Admin Transfer'}/>
        <Row >
          <Col sm={3}>  <HospitalAdminSideNav from='transfer'/></Col>
          <Col sm={8} >
            <Row>
              <Col sm={12}><h1 className='hatps__title'> Transfer Patient</h1> </Col>
            </Row>
            <hr className='hatps__hr'/>
            <br />
            <FormContainer>

              {error && <Message variant="danger">{error}</Message>}
              {response && <Message variant="success">{response["message"]}</Message>}
              {loading && <Loader />}
              <Form onSubmit={submitHandler}>
                <Form.Group controlId="id">
                  <Form.Label className='hatps__formLabel'>Patient ID</Form.Label>
                  <Form.Control
                      type="text"
                      placeholder="Enter ID"
                      value={patient_id}
                      onChange={(e) => setId(e.target.value)}
                      className='hatps__formControl'>
                  </Form.Control>
                </Form.Group>

                <Row>
                  <Col>
                    {" "}
                    <Form.Group controlId="dest_bed_id">
                      <Form.Label className='hatps__formLabel'>Destination Bed ID</Form.Label>
                      <Form.Control
                          type="text"
                          placeholder="Enter Dest: Bed ID"
                          value={dest_bed_id}
                          onChange={(e) => setDestinationBedId(e.target.value)}
                          className='hatps__formControl'>
                      </Form.Control>
                    </Form.Group>
                  </Col>
                  <Col>
                  </Col>
                </Row>

                <Row>
                  <Col>
                    <Form.Group controlId="transferDateTime">
                      <Form.Label className='hatps__formLabel'>Transfer Date Time</Form.Label>
                      <Form.Control
                          type="datetime-local"
                          placeholder="Enter Date Time"
                          value={transfer_date}
                          onChange={(e) => setTransferDateTime(e.target.value)}
                          className='hatps__formControl'>
                      </Form.Control>
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

export default HATransferPatientScreen;
