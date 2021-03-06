import React, { useState, useEffect } from "react";
import { Form, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/Message";
import Meta from '../../components/Meta';
import Loader from "../../components/Loader";
import FormContainer from "../../components/FormContainer";
import { admit } from "../../actions/patientActions";
import HospitalAdminSideNav from "./HospitalAdminSideNav";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import '../../components/buttonstyle.css';
import './HAAdmitPatientScreen.css';

const HAAdmitPatientScreen = ({ history }) => {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [bday, setBday] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [contactnumber, setContactnumber] = useState("");
  const [bloodtype, setBloodtype] = useState("");
  const [district, setDistrict] = useState("");
  const [isvaccinated, setIsvaccinated] = useState("");
  const [Num_vaccine, setNumvaccinated] = useState("0");
  const [Type_vaccine, setTypevaccinated] = useState(null);
  const [RATresult, setRATresult] = useState("");
  const medicalHistory = "";
  const [admitDateTime, setAdmitDateTime] = useState("");

  //calculate the age of patient
  const getAge = bday => {
    if (Math.floor((new Date() - new Date(bday).getTime()) / 3.15576e+10)) {
      return (Math.floor((new Date() - new Date(bday).getTime()) / 3.15576e+10));
    }
    else {
      return Math.round(((new Date() - new Date(bday).getTime()) / 3.15576e+10 + Number.EPSILON) * 1000) / 1000;
    }
  };

  //Automatically assgin bed ID for the patient
  const getBedId = bedInfo => {
    let covidFree = [];
    let normalFree = [];
    Array.from({ length: bedInfo["results"]["CovidBed"].length }).map(
        (_, i) => (

            bedInfo["results"]["CovidBed"][`${i}`]["IsOccupied"] !== true ? (covidFree.push(bedInfo["results"]["CovidBed"][`${i}`]["BedID"])) : (null)

        )
    )

    Array.from({ length: bedInfo["results"]["NormalBed"].length }).map(
        (_, j) => (
            bedInfo["results"]["NormalBed"][`${j}`]["IsOccupied"] !== true ? (normalFree.push(bedInfo["results"]["NormalBed"][`${j}`]["BedID"])) : (null)

        )
    )

    if (RATresult === "1" && covidFree.length > 0) {
      return covidFree[0];
    }
    else if (RATresult === "0" && normalFree.length > 0) {
      return normalFree[0];
    }

    else {
      return "no"
    }
  };


  const id = contactnumber.toString() + Date.parse(bday);

  //Create IDs for the patients
  const allocationId = id + Date.parse(admitDateTime) + "A";
  const reportId = id + Date.parse(admitDateTime) + "R";
  const testId = id + Date.parse(admitDateTime) + "T";
  const phonenumber = "+" + contactnumber.toString();


  const age = getAge(bday)

  const patientAdmit = useSelector((state) => state.patientAdmit);
  const { loading, error, response } = patientAdmit;

  const bedLoad = useSelector((state) => state.bedLoad);
  const { bedInfo } = bedLoad;

  const bedId = getBedId(bedInfo);
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;


  useEffect(() => {


    if (!userInfo) {
      history.push("/login");
    } else if (response) {
      setName("");
      setBday("");
      setAddress("");
      setContactnumber("");
      setBloodtype(" ");
      setDistrict("");
      setRATresult(" ");
      setAdmitDateTime("");
      setBday("");
      setGender("");
      setIsvaccinated("");
      setTypevaccinated(null);
      setNumvaccinated("0");


    }
  }, [history, userInfo, response]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
        admit(
            name,
            id,
            age,
            gender,
            address,
            phonenumber,
            bloodtype,
            district,
            testId,
            isvaccinated,
            RATresult,
            medicalHistory,
            reportId,
            bedId,
            allocationId,
            admitDateTime,
            bday,
            Type_vaccine,
            Num_vaccine
        )
    );
  };



  return (
      <div>
        <Meta title={'Hospital Admin Admit'}/>
        <Row >
          <Col sm={3}><HospitalAdminSideNav from='admit' /></Col>
          <Col sm={8} >
            <Row>
              <Col sm={12}><h1 className='haaps__title'>Admit New Patient</h1> </Col>
            </Row>
            <hr className='haaps__hr'/>

            <FormContainer className='haaps__formContainer'>
              {error && <Message variant="danger">{error}</Message>}
              {response && <Message variant="success">{response["message"]}</Message>}
              {loading && <Loader />}
              <Form onSubmit={submitHandler}>
                <Form.Group controlId="name">
                  <Form.Label className='haaps__formLabel'>Patient Name</Form.Label>
                  <Form.Control
                      type="text"
                      placeholder="Enter name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className='haaps__formControl'>
                  </Form.Control>
                </Form.Group>

                <Row>
                  <Col>
                    <Form.Group controlId="bday">
                      <Form.Label className='haaps__formLabel'>Date of Birth</Form.Label>
                      <Form.Control
                          type="date"
                          placeholder="Enter Birthday"
                          value={bday}
                          className='haaps__formControl'
                          onChange={(e) => setBday(e.target.value)}>
                      </Form.Control>
                    </Form.Group>
                  </Col>
                  <Col>

                    <Form.Group controlId="district">
                      <Form.Label className='haaps__formLabel'>District</Form.Label>
                      <br />
                      <select className="form-control haaps__formControl" value={district} name="district" onChange={(e) => setDistrict(e.target.value)}>
                        <option >SELECT</option>
                        <option value="Ampara">Ampara</option>
                        <option value="Anuradhapura">Anuradhapura</option>
                        <option value="Badulla">Badulla</option>
                        <option value="Batticaloa">Batticaloa</option>
                        <option value="Colombo">Colombo</option>
                        <option value="Galle">Galle</option>
                        <option value="Gampaha">Gampaha</option>
                        <option value="Hambantota">Hambantota</option>
                        <option value="Jaffna">Jaffna</option>
                        <option value="Kalutara">Kalutara</option>
                        <option value="Kandy">Kandy</option>
                        <option value="Kegalle">Kegalle</option>
                        <option value="Kilinochchi">Kilinochchi</option>
                        <option value="Kurunegala">Kurunegala</option>
                        <option value="Mannar">Mannar</option>
                        <option value="Matale">Matale</option>
                        <option value="Matara">Matara</option>
                        <option value="Monaragala">Monaragala</option>
                        <option value="Mullaitivu">Mullaitivu</option>
                        <option value="NuwaraEliya">NuwaraEliya</option>
                        <option value="Polonnaruwa">Polonnaruwa</option>
                        <option value="Puttalam">Puttalam</option>
                        <option value="Ratnapura">Ratnapura</option>
                        <option value="Trincomalee">Trincomalee</option>
                        <option value="Vavuniya">Vavuniya</option>

                      </select>
                    </Form.Group>
                  </Col>
                </Row>


                <Row>
                  <Col>
                    <Form.Group controlId="gender">
                      <Form.Label className='haaps__formLabel'>Gender</Form.Label>
                      <Row className="px-3 py-2">
                        <Form.Check
                            type="radio"
                            label="Male"
                            value="Male"
                            name="formHorizontalRadios"
                            id="formHorizontalRadios1"
                            checked={"Male" === gender}
                            style={{ color: "#008A77", fontWeight: "bold" }}
                            onChange={(e) => setGender(e.target.value)}
                        />
                        <br />
                        <Form.Check
                            type="radio"
                            label="Female"
                            value="Female"
                            name="formHorizontalRadios"
                            id="formHorizontalRadios1"

                            checked={"Female" === gender}
                            style={{ marginLeft: "20px", color: "#008A77", fontWeight: "bold" }}
                            onChange={(e) => setGender(e.target.value)}
                        />
                      </Row>
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group controlId="address">
                  <Form.Label className='haaps__formLabel'>Address</Form.Label>
                  <Form.Control
                      type="address"
                      placeholder="Enter Address"
                      value={address}
                      className='haaps__formControl'
                      onChange={(e) => setAddress(e.target.value)}>
                  </Form.Control>
                </Form.Group>

                <Row>
                  <Col>
                    <Form.Group controlId="bloodType">
                      <Form.Label className='haaps__formLabel'>Blood Type</Form.Label>
                      <br />
                      <select className="form-control haaps__formControl" value={bloodtype} name="bloodType" onChange={(e) => setBloodtype(e.target.value)}>
                        <option >SELECT</option>
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
                    <Form.Group controlId="RATresult">
                      <Form.Label className='haaps__formLabel'>RAT Result</Form.Label>
                      <br />
                      <select className="form-control haaps__formControl" value={RATresult} name="RATresult" onChange={(e) => setRATresult(e.target.value)}>
                        <option >SELECT</option>
                        <option value="1">POSITIVE </option>
                        <option value="0">NEGATIVE</option>
                      </select>
                    </Form.Group>

                  </Col>
                </Row>

                <Form.Group controlId="contactnumber">
                  <Form.Label className='haaps__formLabel'>Contact Number</Form.Label>
                </Form.Group>
                <Row>
                  <Col>
                    <PhoneInput
                        containerStyle={{ color: "#007c7a" }}


                        containerClass=""
                        inputStyle={{ borderRadius: '20px', height: 'calc(1.5em + 1.5rem + 0px)', width: 'inherit' }}
                        country="lk"
                        onlyCountries={["lk"]}
                        fullWidth="true"
                        placeholder="Contact Number"
                        name="contactnumber"
                        style={{ borderRadius: "20px", borderWidth: "1px", borderColor: "#007c7a", borderStyle: "solid", color: "#007c7a", outline: "#913163" }}
                        value={contactnumber}
                        onChange={phone => setContactnumber(phone)}
                    />
                  </Col>

                </Row>
                <br />


                <Row>
                  <Col>
                    <Form.Group controlId="isvaccinated">
                      <Form.Label className='haaps__formLabel'>Is Vaccinated</Form.Label>
                      <Row className="px-3 py-2">
                        <Form.Check
                            type="radio"
                            label="Yes"
                            value="1"
                            name="formHorizontalRadios1"
                            id="formHorizontalRadios1"
                            checked={"1" === isvaccinated}
                            style={{ color: "#008A77", fontWeight: "bold" }}
                            onChange={(e) => setIsvaccinated(e.target.value)}
                        />
                        <br />
                        <Form.Check
                            type="radio"
                            label="No"
                            value="0"
                            name="formHorizontalRadios1"
                            id="formHorizontalRadios2"
                            checked={"0" === isvaccinated}
                            style={{ marginLeft: "20px", color: "#008A77", fontWeight: "bold" }}
                            onChange={(e) => setIsvaccinated(e.target.value)}
                        />
                      </Row>
                    </Form.Group>
                  </Col>

                </Row>


                {"1" === isvaccinated ? (
                    <>
                      <Row>
                        <Col>
                          <Form.Group controlId="testType">
                            <Form.Label className='haaps__formLabel'>Vaccine Type</Form.Label>
                            <br />
                            <select className="form-control haaps__formControl" value={Type_vaccine} name="Type_vaccine" onChange={(e) => setTypevaccinated(e.target.value)}>
                              <option >SELECT</option>
                              <option value="Sputnik V">Sputnik V </option>
                              <option value="Sinopharm">Sinopharm  </option>
                              <option value="Sinovac">Sinovac </option>
                              <option value="Pfizer">Pfizer </option>
                              <option value="AstraZeneca">AstraZeneca  </option>
                              <option value="Moderna">Moderna   </option>
                            </select>
                          </Form.Group>

                        </Col>
                        <Col>
                          <Form.Group controlId="testType">
                            <Form.Label className='haaps__formLabel'>No.Vaccine </Form.Label>
                            <br />
                            <select className="form-control haaps__formControl" value={Num_vaccine} name="Num_vaccine" onChange={(e) => setNumvaccinated(e.target.value)}>
                              <option >SELECT</option>
                              <option value="1">1  </option>
                              <option value="2">2 </option>
                              <option value="3">3 </option>
                            </select>
                          </Form.Group>

                        </Col>
                      </Row>

                    </>

                ) : (null)}


                <Row>
                  <Col>
                    <Form.Group controlId="admitDateTime">
                      <Form.Label className='haaps__formLabel'>Admit Date Time</Form.Label>
                      <Form.Control
                          type="datetime-local"
                          placeholder="Enter Date Time"
                          value={admitDateTime}
                          onChange={(e) => setAdmitDateTime(e.target.value)}
                          className='haaps__formControl'>
                      </Form.Control>
                    </Form.Group>
                  </Col>

                </Row>
                <br />
                <Row>
                  <Col sm={3}></Col>
                  <Col>
                    <button class="button button1" type="submit" >ADMIT</button>
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




export default HAAdmitPatientScreen;
