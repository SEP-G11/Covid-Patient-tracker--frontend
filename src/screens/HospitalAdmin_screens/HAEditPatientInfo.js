import React, { useState, useEffect }  from "react";
import { Form, Button, Row, Col, ListGroup, ListGroupItem } from "react-bootstrap";
import { LinkContainer } from 'react-router-bootstrap'
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import FormContainer from '../../components/FormContainer'
import { getPatientDetails, updatePatient } from '../../actions/patientActions'
import { PATIENT_UPDATE_RESET } from '../../constants/patientConstants'
import HospitalAdminSideNav from "./HospitalAdminSideNav";
import PhoneInput from 'react-phone-input-2'

const HAEditPatientInfo = ({ match, history }) => {
    const patientId = match.params.id 

    const [name, setName] = useState('')
    const [bday, setBday] = useState("");
    const [gender, setGender] = useState('')
    const [blood_type, setBloodType] = useState('')
    const [contact_no, setContactNo] = useState('')
    const [address, setAddress] = useState('')
    const [district, setDistrict] = useState('')
    const [is_Vaccinated, setIs_Vaccinated] = useState('')


    const dispatch = useDispatch()

    const patientDetails = useSelector((state) => state.patientDetails)
    const { loading, error, patient } = patientDetails

    const patientUpdate = useSelector((state) => state.patientUpdate)
    const {
        loading: loadingUpdate,
        error: errorUpdate,
        success: successUpdate,
    } = patientUpdate

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    useEffect(() => {
      console.log(userInfo["results"])
      if (!userInfo) {
        history.push("/login");
      } else {
        if (successUpdate) {
          dispatch({ type: PATIENT_UPDATE_RESET })
            history.push(`/hospitalAdmin/viewPatientInfo/${patientId}`)
        } else {
          if (!patient.name || patient.patient_id !== patientId) {
            dispatch(getPatientDetails(patientId))
          } else {
            setName(patient.name)
            setBday(patient.bday)
            setGender(patient.gender)
            setBloodType(patient.blood_type)
            setContactNo(patient.contact_no)
            setAddress(patient.address)
            setDistrict(patient.district)
            setIs_Vaccinated(patient.is_Vaccinated)
          }
        }
      }
    }, [dispatch, history, patientId, patient, successUpdate,userInfo])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updatePatient({ patient_id:patientId, name, bday,gender,blood_type,contact_no,address,district,is_Vaccinated}))
    }

    return (
        <div>
            <Row >
              <Col sm={3}><HospitalAdminSideNav from='viewPatientsList'/></Col>
              <Col sm={8} >
              <Row>
                {/* <Col sm={1}> <img src={logo} width="200" height="90" ></img></Col> */}
                <Col sm={12}><h1 style={{ fontFamily: "arial", textAlign: "center", color: "#007c7a", fontSize: "40px", paddingLeft: "-50px" }}>Edit Patient Information</h1> </Col>
              </Row>
              <hr
                style={{
                  color: "white",
                  backgroundColor: "#007c7a",
                  height: 2,
                }}
              />

              <Row>
                {/* <Col sm={1}> <img src={logo} width="200" height="90" ></img></Col> */}
                <Col sm={12}><h6 style={{ fontFamily: "arial", textAlign: "center", color: "#007c7a", fontSize: "15px", paddingLeft: "-50px",marginBottom: "20px" }}>Patient Id: {patientId}</h6> </Col>
              </Row>

              <FormContainer style={{ border: '2px solid #000000' }}>
                {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
                {loadingUpdate && <Loader />}
                <Form onSubmit={submitHandler}>
                  <Form.Group controlId="name">
                    <Form.Label style={{ color: "#008A77", fontWeight: "bold" }}>Patient Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      style={{ borderRadius: "20px", borderWidth: "1px", borderColor: "#007c7a", borderStyle: "solid", color: "#007c7a", outline: "#913163" }}
                    ></Form.Control>
                  </Form.Group>

                  <Row>
                    <Col>
                      <Form.Group controlId="bday">
                        <Form.Label style={{ color: "#008A77", fontWeight: "bold" }}>Date of Birth</Form.Label>
                          <Form.Control
                            type="date"
                            placeholder="Enter Birthday"
                            value={bday}
                            style={{ borderRadius: "20px", borderWidth: "1px", borderColor: "#007c7a", borderStyle: "solid", color: "#007c7a", outline: "#913163" }}
                            onChange={(e) => setBday(e.target.value)}
                          ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col>
                    </Col>
                  </Row>

                  <Row>
                    <Col>
                      <Form.Group controlId="bloodtype">
                          <Form.Label style={{ color: "#008A77", fontWeight: "bold" }}>Blood Type</Form.Label>
                          <select className="form-control" value={blood_type} name="RATresult" style={{ borderRadius: "20px", borderWidth: "1px", borderColor: "#007c7a", borderStyle: "solid", color: "#007c7a", outline: "#913163" }} onChange={(e) => setBloodType(e.target.value)}>
                              <option >SELECT</option>
                              <option value='O+'>O+</option>
                              <option value='O-'>O-</option>
                              <option value='A+'>A+</option>
                              <option value='A-'>A-</option>
                              <option value='B+'>B+</option>
                              <option value='B-'>B-</option>
                              <option value='AB+'>AB+</option>
                              <option value='AB-'>AB-</option>
                          </select>
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group controlId="gender">
                        <Form.Label style={{ color: "#008A77", fontWeight: "bold" }}>Gender</Form.Label>
                        <select className="form-control" value={gender} name="RATresult" style={{ borderRadius: "20px", borderWidth: "1px", borderColor: "#007c7a", borderStyle: "solid", color: "#007c7a", outline: "#913163" }} onChange={(e) => setGender(e.target.value)}>
                          <option >SELECT</option>
                          <option value="Male">MALE </option>
                          <option value="Female">FEMALE</option>
                        </select>
                      </Form.Group>
                    </Col>
                  </Row>
                  
                  <Row>     
                    <Form.Group controlId="contactnumber">
                      <Col>
                      <Form.Label style={{ color: "#008A77", fontWeight: "bold" }} >Contact Number</Form.Label>
                        <PhoneInput
                          containerStyle={{ color: "#007c7a" }}
                          containerClass="border-6 rounded"
                          country="lk"
                          onlyCountries={["lk"]}
                          fullWidth="true"
                          placeholder="Contact Number"
                          name="contactnumber"
                          style={{ borderRadius: "20px", borderWidth: "1px", borderColor: "#007c7a", borderStyle: "solid", color: "#007c7a", outline: "#913163" }}
                          value={contact_no}
                          onChange={phone => setContactNo(phone)}
                        />
                      </Col>
                    </Form.Group>
                  </Row>
                  
                  <Form.Group controlId="address">
                    <Form.Label style={{ color: "#008A77", fontWeight: "bold" }}>Address</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        type="text"
                        placeholder="Enter Address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        style={{ borderRadius: "20px", borderWidth: "1px", borderColor: "#007c7a", borderStyle: "solid", color: "#007c7a", outline: "#913163" }}
                      ></Form.Control>
                  </Form.Group>

                  <Row>
                    <Col>
                      <Form.Group controlId="district">
                        <Form.Label style={{ color: "#008A77", fontWeight: "bold" }}>District</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter district"
                          value={district}
                          onChange={(e) => setDistrict(e.target.value)}
                          style={{ borderRadius: "20px", borderWidth: "1px", borderColor: "#007c7a", borderStyle: "solid", color: "#007c7a", outline: "#913163" }}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group controlId="isvaccinated">
                        <Form.Label style={{ color: "#008A77", fontWeight: "bold" }}>Vaccination Details</Form.Label>
                        <select className="form-control" value={is_Vaccinated} name="RATresult" style={{ borderRadius: "20px", borderWidth: "1px", borderColor: "#007c7a", borderStyle: "solid", color: "#007c7a", outline: "#913163" }} onChange={(e) => setIs_Vaccinated(e.target.value)}>
                          <option >SELECT</option>
                          <option value="Vaccinated">Vaccinated </option>
                          <option value="Not Vaccinated">Not Vaccinated</option>
                        </select>
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

export default HAEditPatientInfo;