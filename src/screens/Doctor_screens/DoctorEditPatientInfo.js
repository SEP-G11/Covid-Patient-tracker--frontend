import React, { useState, useEffect }  from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../../components/FormContainer'
import { getPatientDetails, updatePatient } from '../../actions/patientActions'
import { PATIENT_UPDATE_RESET } from '../../constants/patientConstants'
import DoctorSideNav from "./DoctorSideNav";
import PhoneInput from 'react-phone-input-2'
import Meta from "../../components/Meta";
import './DoctorEditPatientInfo.css';

const DoctorEditPatientInfo = ({ match, history }) => {
    const patientId = match.params.id

    const [name, setName] = useState('')
    const [bday, setBday] = useState("");
    const [gender, setGender] = useState('')
    const [blood_type, setBloodType] = useState('')
    const [contact_no, setContactNo] = useState('')
    const [address, setAddress] = useState('')
    const [district, setDistrict] = useState('')
    const [is_Vaccinated, setIs_Vaccinated] = useState('')
    const [Num_vaccine, setNumvaccinated] = useState(null);
    const [Type_vaccine, setTypevaccinated] = useState(null);


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
        if (!userInfo) {
            history.push("/login");
        } else {
            if (successUpdate) {
                dispatch({ type: PATIENT_UPDATE_RESET })
                history.push(`/doctor/viewPatientInfo/${patientId}`)
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
                    setNumvaccinated(patient.Num_vaccine)
                    setTypevaccinated(patient.Type_vaccine)
                }
            }
        }
    }, [dispatch, history, patientId, patient, successUpdate,userInfo])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updatePatient({ patient_id:patientId, name, bday,gender,blood_type,contact_no,address,district,is_Vaccinated,Num_vaccine,Type_vaccine}))
    }

    return (
        <div>
            <Meta title={'Edit Patient Info'}/>
            <Row >
                <Col sm={3}><DoctorSideNav from='viewPatientsList'/></Col>
                <Col sm={8} >
                    <Row>
                        {/* <Col sm={1}> <img src={logo} width="200" height="90" ></img></Col> */}
                        <Col sm={12}><h1 className='depi__title'>Edit Patient Information</h1> </Col>
                    </Row>
                    <hr className='depi__hr'/>

                    <Row>
                        <Col sm={12}><h6 className='depi__patientID'>Patient ID: {patientId}</h6> </Col>
                    </Row>

                    <FormContainer className='depi__formContainer'>
                        {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
                        {loadingUpdate && <Loader />}
                        <Form onSubmit={submitHandler}>
                            <Form.Group controlId="name">
                                <Form.Label className='depi__formLabel'>Patient Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className='depi__formControl'>
                                </Form.Control>
                            </Form.Group>

                            <Row>
                                <Col>
                                    <Form.Group controlId="bday">
                                        <Form.Label className='depi__formLabel'>Date of Birth</Form.Label>
                                        <Form.Control
                                            type="date"
                                            placeholder="Enter Birthday"
                                            value={bday}
                                            className='depi__formControl'
                                            onChange={(e) => setBday(e.target.value)}>
                                        </Form.Control>
                                    </Form.Group>
                                </Col>
                                <Col>

                                    <Form.Group controlId="district">
                                        <Form.Label className='depi__formLabel'>District</Form.Label>
                                        <br />
                                        <select className="form-control depi__formControl" value={district} name="district" onChange={(e) => setDistrict(e.target.value)}>
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
                                    <Form.Group controlId="bloodtype">
                                        <Form.Label className='depi__formLabel'>Blood Type</Form.Label>
                                        <select className="form-control depi__formControl" value={blood_type} name="RATresult" onChange={(e) => setBloodType(e.target.value)}>
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
                                        <Form.Label className='depi__formLabel'>Gender</Form.Label>
                                        <select className="form-control depi__formControl" value={gender} name="RATresult" onChange={(e) => setGender(e.target.value)}>
                                            <option >SELECT</option>
                                            <option value="Male">MALE </option>
                                            <option value="Female">FEMALE</option>
                                        </select>
                                    </Form.Group>
                                </Col>
                            </Row>
                    
                            <Form.Group controlId="address">
                                <Form.Label className='depi__formLabel'>Address</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    type="text"
                                    placeholder="Enter address"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    className='depi__formControl'>
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId="contactnumber">
                                <Form.Label className='depi__formLabel' >Contact Number</Form.Label>
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
                                        value={contact_no}
                                        onChange={phone => setContactNo(phone)}
                                    />
                                </Col>

                            </Row>
                            <Row>
                                <Col>
                                    <Form.Group controlId="isvaccinated">
                                        <Form.Label className='depi__formLabel'>Vaccination Details</Form.Label>
                                        <Row className="px-3 py-2">
                                            <Form.Check
                                                type="radio"
                                                label="Yes"
                                                value="1"
                                                name="formHorizontalRadios1"
                                                id="formHorizontalRadios1"
                                                checked={"1" == is_Vaccinated}
                                                style={{ color: "#008A77", fontWeight: "bold" }}
                                                onChange={(e) => setIs_Vaccinated(e.target.value)}
                                            />
                                            <br />
                                            <Form.Check
                                                type="radio"
                                                label="No"
                                                value="0"
                                                name="formHorizontalRadios1"
                                                id="formHorizontalRadios2"
                                                checked={"0" == is_Vaccinated}
                                                style={{ marginLeft: "20px", color: "#008A77", fontWeight: "bold" }}
                                                onChange={(e) => setIs_Vaccinated(e.target.value)}
                                            />
                                        </Row>
                                    </Form.Group>
                                </Col>

                                {"1" == is_Vaccinated ? (
                                    <>
                                        <Col>
                                            <Form.Group controlId="testType">
                                                <Form.Label className='depi__formLabel'>Vaccine Type</Form.Label>
                                                <br />
                                                <select className="form-control depi__formControl" value={Type_vaccine} name="Type_vaccine" style={{width: "150px"}} onChange={(e) => setTypevaccinated(e.target.value)}>
                                                    <option>SELECT</option>
                                                    <option value="Sputnik V">Sputnik V</option>
                                                    <option value="Sinopharm">Sinopharm </option>
                                                    <option value="Sinovac">Sinovac</option>
                                                    <option value="Pfizer">Pfizer</option>
                                                    <option value="AstraZeneca">AstraZeneca</option>
                                                    <option value="Moderna">Moderna</option>
                                                </select>
                                            </Form.Group>

                                        </Col>
                                        <Col>
                                            <Form.Group controlId="testType">
                                                <Form.Label className='depi__formLabel'>No.Vaccine </Form.Label>
                                                <br />
                                                <select className="form-control depi__formControl" value={Num_vaccine} name="Num_vaccine" style={{width: "150px"}} onChange={(e) => setNumvaccinated(e.target.value)}>
                                                    <option >SELECT</option>
                                                    <option value="1">1  </option>
                                                    <option value="2">2 </option>
                                                    <option value="3">3 </option>
                                                </select>
                                            </Form.Group>



                                        </Col>

                                    </>

                                ) : (null)}


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

export default DoctorEditPatientInfo;
