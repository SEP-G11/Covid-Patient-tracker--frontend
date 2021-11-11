import React, { useState, useEffect } from "react";
import { Form, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/Message";
import Meta from '../../components/Meta';
import Loader from "../../components/Loader";
import FormContainer from "../../components/FormContainer";
import { Enter } from "../../actions/testActions";
import HospitalAdminSideNav from "./HospitalAdminSideNav";
import './HAEnterResultScreen.css';

const HAEnterResultScreen = ({ match, location, history }) => {


    const [RATresult, setRATresult] = useState("");
    const [date, setDate] = useState("");
    const [testType, setTestType] = useState("");
    const [id, setId] = useState(match.params.id === ":id" ? ("") : (match.params.id));
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
            <Meta title={'Hospital Admin Enter Results'} />
            <Row >
                <Col sm={3}>    <HospitalAdminSideNav from='enter' /></Col>
                <Col sm={8} >
                    <Row>                       
                        <Col sm={12}><h1 className='haers__title'>Enter test Results</h1> </Col>
                    </Row>
                    <hr className='haers__hr'/>
                    <br />
                    <FormContainer>

                        {error && <Message variant="danger">{error}</Message>}
                        {response && <Message variant="success">{response["message"]}</Message>}
                        {loading && <Loader />}
                        <Form onSubmit={submitHandler}>

                            <Row>
                                <Col>
                                    <Form.Group controlId="id">
                                        <Form.Label className='haers__formLabel'>Patient ID</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter Patient ID"
                                            value={id}
                                            onChange={(e) => setId(e.target.value)}
                                            className='haers__formControl'>
                                        </Form.Control>
                                    </Form.Group>
                                </Col>

                            </Row>
                            <Form.Group controlId="dischargeDateTime">
                                <Form.Label className='haers__formLabel'> Date </Form.Label>
                                <Form.Control
                                    type="datetime-local"
                                    placeholder="Enter Date"
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                    className='haers__formControl'>
                                </Form.Control>
                            </Form.Group>

                            <Row>
                                <Col>
                                    <Form.Group controlId="testType">
                                        <Form.Label className='haers__formLabel'>Test Type</Form.Label>
                                        <br />
                                        <select className="form-control haers__formControl" value={testType} name="testType" onChange={(e) => setTestType(e.target.value)}>
                                            <option >SELECT</option>
                                            <option value="PCR">PCR</option>
                                            <option value="RAT">RAT</option>

                                        </select>
                                    </Form.Group>

                                </Col>
                                <Col>
                                    <Form.Group controlId="RATresult">
                                        <Form.Label className='haers__formLabel'>Test Result</Form.Label>
                                        <br />
                                        <select className="form-control haers__formControl" value={RATresult} name="RATresult" onChange={(e) => setRATresult(e.target.value)}>
                                            <option >SELECT</option>
                                            <option value="1">POSITIVE </option>
                                            <option value="0">NEGATIVE</option>
                                        </select>
                                    </Form.Group>

                                </Col>
                            </Row>
                            <br /><br />
                            <div style={{ paddingLeft: "120px" }}>
                                <button class="button button1" type="submit" > ENTER </button></div>
                        </Form>
                    </FormContainer></Col>
                <Col sm={2} ></Col>
            </Row >
        </div>
    );
};
export default HAEnterResultScreen;

