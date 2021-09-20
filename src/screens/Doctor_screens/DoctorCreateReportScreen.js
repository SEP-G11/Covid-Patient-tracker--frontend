import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import FormContainer from "../../components/FormContainer";
import { CreateReport } from "../../actions/reportActions";
import DoctorSideNav from "./DoctorSideNav";
import PhoneInput from 'react-phone-input-2'

const DoctorCreateReportScreen = ({ location, history }) => {



    const [bday, setBday] = useState("");
    const [contactnumber, setContactnumber] = useState("");
    const [RATresult, setRATresult] = useState("");
    const [bedId, setBedId] = useState("");
    const [date, setDate] = useState("");
    const [description, setMedicalHistory] = useState("");


    const id = contactnumber.toString() + Date.parse(bday);
    const allocationId = id + Date.parse(date) + "A";
    const reportId = id + Date.parse(date) + "R";
    const testId = id + Date.parse(date) + "T";
    const phonenumber = "+" + contactnumber.toString();

    const dispatch = useDispatch();

    const reportCreate = useSelector((state) => state.reportCreate);
    const { loading, error, response } = reportCreate;


    const bedLoad = useSelector((state) => state.bedLoad);
    const { bedInfo } = bedLoad;

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    useEffect(() => {

        
        if (!userInfo) {
            history.push("/login");
        } else if (response) {

            setBday("");
            setRATresult("");
            setContactnumber("");
            setMedicalHistory("");
            setBedId("");
            setDate("");
            setBday("");


        }
    }, [history, userInfo, response]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(
            CreateReport(

                id,
                testId,
                RATresult,
                reportId,
                bedId,
                allocationId,
                date,
                phonenumber,
                bday,
                description
            )
        );
    };


    return (
        <div>
            <Row >
                <Col sm={3}><DoctorSideNav /></Col>
                <Col sm={8} >
                    <Row>
                        {/* <Col sm={1}> <img src={logo} width="200" height="90" ></img></Col> */}
                        <Col sm={12}><h1 style={{ fontFamily: "arial", textAlign: "center", color: "#007c7a", fontSize: "40px", paddingLeft: "-50px" }}>Create medical Report</h1> </Col>
                    </Row>
                    <hr
                        style={{
                            color: "white",
                            backgroundColor: "#007c7a",
                            height: 2,
                        }}
                    />

                    <FormContainer style={{ border: '2px solid #000000' }}>
                        {error && <Message variant="danger">{error}</Message>}
                        {response && <Message variant="success">{response["message"]}</Message>}
                        {loading && <Loader />}
                        <Form onSubmit={submitHandler}>


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
                                

                                </Col>
                            </Row>



                            <Form.Group controlId="contactnumber">
                                <Form.Label style={{ color: "#008A77", fontWeight: "bold" }} >Contact Number</Form.Label>
                            </Form.Group>
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
                                        value={contactnumber}
                                        onChange={phone => setContactnumber(phone)}
                                    />
                                </Col>
                                <Col>
                                </Col>
                            </Row>
                            <br />

                            <Form.Group controlId="description">
                                <Form.Label style={{ color: "#008A77", fontWeight: "bold" }}>Medical History</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    type="text"
                                    placeholder="Enter Any Medical History"
                                    value={description}
                                    onChange={(e) => setMedicalHistory(e.target.value)}
                                    style={{ borderRadius: "20px", borderWidth: "1px", borderColor: "#007c7a", borderStyle: "solid", color: "#007c7a", outline: "#913163" }}

                                ></Form.Control>
                            </Form.Group>



                            <Row>
                                <Col>
                                    <Form.Group controlId="RATresult">
                                        <Form.Label style={{ color: "#008A77", fontWeight: "bold" }}>RAT Result</Form.Label>
                                        <br />
                                        <select className="form-control" value={RATresult} name="RATresult" style={{ borderRadius: "20px", borderWidth: "1px", borderColor: "#007c7a", borderStyle: "solid", color: "#007c7a", outline: "#913163" }} onChange={(e) => setRATresult(e.target.value)}>
                                            <option >SELECT</option>
                                            <option value="1">POSITIVE </option>
                                            <option value="0">NEGATIVE</option>
                                        </select>
                                    </Form.Group>
                                </Col>
                                <Col>


                                    <Form.Group controlId="bedId">
                                        <Form.Label style={{ color: "#008A77", fontWeight: "bold" }}> Bed Id</Form.Label>

                                        <br />

                                        <select className="form-control" value={bedId} name="bedId" style={{ borderRadius: "20px", width: "200px", borderWidth: "1px", borderColor: "#007c7a", borderStyle: "solid", color: "#007c7a", outline: "#913163" }} onChange={(e) => setBedId(e.target.value)}>

                                            <option >SELECT</option>

                                            <> {Array.from({ length: bedInfo["results"]["CovidBed"].length }).map(
                                                (_, i) => (

                                                    <>  {bedInfo["results"]["CovidBed"][`${i}`]["IsOccupied"] != 1 ? (<option style={{ color: "#007c7a" }} value={bedInfo["results"]["CovidBed"][`${i}`]["BedID"]}>{bedInfo["results"]["CovidBed"][`${i}`]["BedID"]}  </option>) : (null)}</>

                                                )
                                            )}
                                            </>
                                            <> {Array.from({ length: bedInfo["results"]["NormalBed"].length }).map(
                                                (_, i) => (

                                                    <>  {bedInfo["results"]["NormalBed"][`${i}`]["IsOccupied"] != 1 ? (<option style={{ color: "#007c7a" }} value={bedInfo["results"]["NormalBed"][`${i}`]["BedID"]}>{bedInfo["results"]["NormalBed"][`${i}`]["BedID"]}  </option>) : (null)}</>

                                                )
                                            )}
                                            </>

                                        </select>
                                    </Form.Group>





                                </Col>

                            </Row>


                            <Row>
                                <Col>
                                    <Form.Group controlId="date">
                                        <Form.Label style={{ color: "#008A77", fontWeight: "bold" }}> Date </Form.Label>
                                        <Form.Control
                                            type="datetime-local"
                                            placeholder="Enter Date"
                                            value={date}
                                            onChange={(e) => setDate(e.target.value)
                                            }
                                            style={{ borderRadius: "20px", borderWidth: "1px", borderColor: "#007c7a", borderStyle: "solid", color: "#007c7a", outline: "#913163" }}
                                        ></Form.Control>
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

export default DoctorCreateReportScreen;

