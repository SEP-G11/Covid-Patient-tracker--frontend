import React, { useState, useEffect } from "react";
import { Form, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import FormContainer from "../../components/FormContainer";
import { Enter } from "../../actions/testActions";
import DoctorSideNav from "./DoctorSideNav";

const DoctorEnterResultScreen = ({match, location, history }) => {


    const [RATresult, setRATresult] = useState("");    
    const [date, setDate] = useState("");
    const [testType, setTestType] = useState("");
    // const [id, setId] = useState("");

    const [id, setId] = useState(match.params.id ==":id" ? (""):(match.params.id));
    
    const testId = id + Date.parse(date) + "T";

    const dispatch = useDispatch();

    const testEnter = useSelector((state) => state.testEnter);
    const { loading, error, response } = testEnter;


    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin;


    useEffect(() => {
        if (!userInfo) {
            history.push("/login");
        } else if (response) {
            setId("");
            setRATresult("");
            setDate("");          
            setTestType("");
        }
    }, [history, response, userInfo]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(
            Enter(
                testId,
                id,
                date,
                testType,
                RATresult
            )
        );
    };

    return (
        <div>

            <Row >
                <Col sm={3}>    <DoctorSideNav from='enter'/></Col>
                <Col sm={8} >
                    <Row>
                        {/* <Col sm={1}> <img src={logo} width="200" height="90" ></img></Col> */}
                        <Col sm={12}><h1 style={{ fontFamily: "arial", textAlign: "center", color: "#007c7a", fontSize: "40px", paddingLeft: "-50px", paddingTop: "60px" }}>Enter test Results</h1> </Col>
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
                                            value={id}
                                            onChange={(e) => setId(e.target.value)}
                                            style={{ borderRadius: "20px", borderWidth: "1px", borderColor: "#007c7a", borderStyle: "solid", color: "#007c7a", outline: "#913163" }}
                                        ></Form.Control>
                                    </Form.Group>
                                </Col>

                            </Row>
                            <Form.Group controlId="dischargeDateTime">
                                        <Form.Label style={{ color: "#008A77", fontWeight: "bold" }}> Date </Form.Label>
                                        <Form.Control
                                            type="datetime-local"
                                            placeholder="Enter Date"
                                            value={date}
                                            onChange={(e) => setDate(e.target.value)}
                                            style={{ borderRadius: "20px", borderWidth: "1px", borderColor: "#007c7a", borderStyle: "solid", color: "#007c7a", outline: "#913163" }}
                                        ></Form.Control>
                                    </Form.Group>

                            <Row>
                                <Col>
                                    <Form.Group controlId="testType">
                                        <Form.Label style={{ color: "#008A77", fontWeight: "bold" }}>Test Type</Form.Label>
                                        <br />
                                        <select className="form-control" value={testType} name="testType" style={{ borderRadius: "20px", width: "150px", borderWidth: "1px", borderColor: "#007c7a", borderStyle: "solid", color: "#007c7a", outline: "#913163" }} onChange={(e) => setTestType(e.target.value)}>
                                            <option >SELECT</option>
                                            <option value="PCR">PCR</option>
                                            <option value="RAT">RAT</option>

                                        </select>
                                    </Form.Group>

                                </Col>
                                <Col>
                                <Form.Group controlId="RATresult">
                    <Form.Label style={{ color: "#008A77", fontWeight: "bold" }}>Test Result</Form.Label>
                    <br />
                    <select className="form-control" value={RATresult} name="RATresult" style={{ borderRadius: "20px", borderWidth: "1px", borderColor: "#007c7a", borderStyle: "solid", color: "#007c7a", outline: "#913163" }} onChange={(e) => setRATresult(e.target.value)}>
                      <option >SELECT</option>
                      <option value="1">POSITIVE </option>
                      <option value="0">NEGATIVE</option>
                    </select>
                  </Form.Group>
                                    

                                </Col>
                            </Row>
                            <br /><br />
                            <div style={{ paddingLeft: "120px" }}>
                                <button class="button button1"
                                    type="submit"
                                >
                                    ENTER
                                </button></div>
                        </Form>
                    </FormContainer></Col>
                <Col sm={2} ></Col>
            </Row >
        </div>
    );
};
export default DoctorEnterResultScreen;

