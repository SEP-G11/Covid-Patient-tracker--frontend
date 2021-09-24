import React, { useState, useEffect, setState } from "react";
import { Form, Button, Row, Col, FloatingLabel } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import FormContainer from "../../components/FormContainer";
import HospitalAdminSideNav from "./HospitalAdminSideNav";
import PhoneInput from 'react-phone-input-2'
import { getPatientDetails, updatePatient } from '../../actions/patientActions'
import { PATIENT_UPDATE_RESET } from '../../constants/patientConstants'

const HAEditPatientInfo = ({ match , history }) => {
    const patientId = match.params.id 
 
    const [name, setName] = useState("");
    const [bday, setBday] = useState("");
    const [age, setAge] = useState("");
    const [gender, setGender] = useState("");
    const [address, setAddress] = useState("")
    const [contact_no, setContact_no] = useState("");
    const [blood_type, setBlood_type] = useState("")
    const [district , setDistrict] = useState("");
    const [is_Vaccinated, setIs_Vaccinated] = useState("");
    
    const dispatch = useDispatch();

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const patientDetails = useSelector((state) => state.patientDetails)
    const { loading_, error_, patient } = patientDetails

    const patientUpdate = useSelector((state) => state.patientUpdate);
    const { loading, error, response} = patientUpdate

    useEffect(() => {
    
        console.log(userInfo["results"])
        if (!userInfo) {
        history.push("/login");
        } else if (response){
            dispatch({ type: PATIENT_UPDATE_RESET })
            history.push(`/hospitalAdmin/viewPatientInfo/${patientId}`)
        } else {
          if (!patient.name || patient.patient_id !== patientId) {
            dispatch(getPatientDetails(patientId))
          } else {
            setName(patient.name)
            setBday(patient.bday)
            setAddress(patient.address)
            setDistrict(patient.district)
            setBlood_type(patient.blood_type)
            setAge(patient.age)
            setContact_no(patient.contact_no)
            setGender(patient.gender)
            setIs_Vaccinated(patient.is_Vaccinated)
          }
        }
    }, [history,userInfo, response, patient, patientId]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(
        updatePatient({ patient_id:patientId, name, bday, address, district, blood_type, age, contact_no, gender, is_Vaccinated}
        )
        );
    };


  return (
    <div>
      <Row >
        <Col sm={3}><HospitalAdminSideNav /></Col>
        <Col sm={8} >
          <Row>
            {/* <Col sm={1}> <img src={logo} width="200" height="90" ></img></Col> */}
            <Col sm={12}><h1 style={{ fontFamily: "arial", textAlign: "center", color: "#007c7a", fontSize: "40px", paddingLeft: "-50px" }}>Update Patient Information</h1> </Col>
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
            <Col sm={12}><h5 style={{ fontFamily: "arial", textAlign: "center", color: "#007c7a", paddingLeft: "-50px", paddingBottom: "10px"}}>Patient Id:{patientId}</h5> </Col>
          </Row>

          <FormContainer style={{ border: '2px solid #000000' }}>
            {error && <Message variant="danger">{error}</Message>}
            {response && <Message variant="success">{response["message"]}</Message>}
            {loading && <Loader />}
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

                    ></Form.Control> </Form.Group>
                </Col>        <Col>
                <Form.Group controlId="age">
                    <Form.Label style={{ color: "#008A77", fontWeight: "bold" }}>Age</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Enter Age"
                      value={age}
                      style={{ borderRadius: "20px", borderWidth: "1px", borderColor: "#007c7a", borderStyle: "solid", color: "#007c7a", outline: "#913163" }}
                      onChange={(e) => setAge(e.target.value)}
                    ></Form.Control>
                  </Form.Group> </Col>
              </Row>

              <Row>
                <Col>
                <Form.Group controlId="bloodtype">
                    <Form.Label style={{ color: "#008A77", fontWeight: "bold" }}>Blood Type</Form.Label>
                    <br />
                    <select className="form-control" value={blood_type} name="bloodtype" style={{ borderRadius: "20px", borderWidth: "1px", borderColor: "#007c7a", borderStyle: "solid", color: "#007c7a", outline: "#913163" }} onChange={(e) => setBlood_type(e.target.value)}>
                      <option>SELECT</option>
                      <option value="O+">O+ </option>
                      <option value="A+">A+</option>
                      <option value="B+">B+</option>
                      <option value="AB+">AB+</option>
                      <option value="O-">O-</option>
                      <option value="A-">A-</option>
                      <option value="B-">B-</option>
                      <option value="AB-">AB-</option>
                    </select>
                  </Form.Group>
                </Col>
                <Col>
                <Form.Group controlId="gender">
                    <Form.Label style={{ color: "#008A77", fontWeight: "bold" }}>Gender</Form.Label>
                    <br />
                    <select className="form-control" value={gender} name="gender" style={{ borderRadius: "20px", borderWidth: "1px", borderColor: "#007c7a", borderStyle: "solid", color: "#007c7a", outline: "#913163" }} onChange={(e) => setGender(e.target.value)}>
                      <option>SELECT</option>
                      <option value="Male">Male </option>
                      <option value="Female">Female</option>
                    </select>
                  </Form.Group>
                </Col>
                
              </Row>


              <Form.Group controlId="contactnumber">
                <Form.Label style={{ color: "#008A77", fontWeight: "bold" }} >Contact Number</Form.Label>
                <Row>
                <Col>
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
                    onChange={phone => setContact_no(phone)}
                  />
                </Col>
                <Col>
                </Col>
              </Row>
              </Form.Group>
              

              <Form.Group controlId="address">
            <Form.Label style={{ color: "#008A77", fontWeight: "bold" }}>Address</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              type="text"
              placeholder="Enter address"
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
                    <br />
                    <select className="form-control" value={is_Vaccinated} name="isvaccinated" style={{ borderRadius: "20px", borderWidth: "1px", borderColor: "#007c7a", borderStyle: "solid", color: "#007c7a", outline: "#913163" }} onChange={(e) => setIs_Vaccinated(e.target.value)}>
                      <option>SELECT</option>
                      <option value="Vaccinated">Vaccinated </option>
                      <option value="Not Vaccinated">Not Vaccinated</option>
                    </select>
                  </Form.Group>
                </Col>
                
              </Row>

              <br />
              <Row>
                <Col sm={3}></Col>
                <Col>
                  <button class="button button1" type="submit" >SAVE CHANGES</button>
                </Col>
              </Row>
            </Form>
          </FormContainer>
        </Col>
        <Col sm={1}></Col>
      </Row>


    </div>
  );

};


export default HAEditPatientInfo;
