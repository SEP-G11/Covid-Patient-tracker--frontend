import React, { useState, useEffect } from "react";
import { Form,  Row, Col } from "react-bootstrap";
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
    // const [bedId, setBedId] = useState("");
    const [date, setDate] = useState("");
    const [description, setMedicalHistory] = useState("");


    const id = contactnumber.toString() + Date.parse(bday);
    const allocationId = id + Date.parse(date) + "A";
    const reportId = id + Date.parse(date) + "R";
    const testId = id + Date.parse(date) + "T";
    const phonenumber = "+" + contactnumber.toString();

    
  const getBedId = bedInfo => {
    let covidFree = [];
    let normalFree = [];



    Array.from({ length: bedInfo["results"]["CovidBed"].length }).map(
      (_, i) => (

        bedInfo["results"]["CovidBed"][`${i}`]["IsOccupied"] != 1 ? (covidFree.push(bedInfo["results"]["CovidBed"][`${i}`]["BedID"])) : (null)

      )
    )

    Array.from({ length: bedInfo["results"]["NormalBed"].length }).map(
      (_, j) => (
        bedInfo["results"]["NormalBed"][`${j}`]["IsOccupied"] != 1 ? (normalFree.push(bedInfo["results"]["NormalBed"][`${j}`]["BedID"])) : (null)

      )
    )

    if (RATresult == "1" && covidFree.length > 0) {
      return covidFree[0];
    }
    else if (RATresult == "0" && normalFree.length > 0) {
      return normalFree[0];
    }

    else {
      return "no"
    }
  };


    const dispatch = useDispatch();

    const reportCreate = useSelector((state) => state.reportCreate);
    const { loading, error, response } = reportCreate;


    const bedLoad = useSelector((state) => state.bedLoad);
    const { bedInfo } = bedLoad;

    const bedId = getBedId(bedInfo)

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
                <Col sm={3}><DoctorSideNav from='createReport'/></Col>
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
                                    <button class="button button1" type="submit" >CREATE</button>
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

