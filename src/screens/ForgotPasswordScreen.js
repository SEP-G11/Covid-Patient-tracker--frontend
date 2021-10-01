import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import { forgotPassword } from "../actions/userActions";
import './ForgotPasswordScreen.css';

const ForgotPasswordScreen = ({ location, history }) => {
    const [email, setEmail] = useState("");

    const dispatch = useDispatch();

    const userForgotPassword = useSelector((state) => state.userForgotPassword);
    const { loading, error,success,message } = userForgotPassword;

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    useEffect(() => {
        if (!userInfo){
            history.push('/forgot-password')
        }
        else {
            if (userInfo.results.accType === "DOC") {
                history.push("/doctor/home");
            } else if (userInfo.results.accType === "MOH") {
                history.push("/moh/home");
            } else if (userInfo.results.accType === "HA"){
                history.push("/hospitalAdmin/home");
            }
        }
    }, [history,userInfo]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(forgotPassword(email));
    };

    const cancelHandler = () => {
        history.push('/login')
    }

    return (
        <React.Fragment>
            <Row>
                <Col sm={{ span: 8, offset: 2 }}>
                    <Row>
                        <Col sm={12}><h1 className='fps__title'>Forgot Password?</h1> </Col>
                    </Row>
                    <hr className='cas__hr'/>
                    <br/>
                    <FormContainer className='fps__formContainer'>
                        <p>Enter your email and submit and you will receive an email with further instructions</p>
                        {error && <Message variant="danger">{error}</Message>}
                        {success && <Message variant='success'>{message}</Message>}
                        {loading && <Loader />}
                        <Form onSubmit={submitHandler}>
                            <Form.Group controlId="email">
                                <Form.Label className='fps__formLabel'>Email Address</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Enter email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className='fps__formControl'
                                >
                                </Form.Control>
                            </Form.Group>
                            <br />

                            <Row>
                                <Col>
                                    <button type='submit' onClick={cancelHandler} className='fps__button_cancel fpsButton_cancel'>
                                        CANCEL
                                    </button>
                                </Col>
                                <Col>
                                    <button type='submit' className='fps__button fpsButton'>
                                        RECOVER PASSWORD
                                    </button>
                                </Col>
                            </Row>
                        </Form>

                    </FormContainer>
                </Col>
            </Row>

        </React.Fragment>
    );
};

export default ForgotPasswordScreen;
