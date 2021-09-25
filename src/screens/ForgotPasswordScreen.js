import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import { forgotPassword } from "../actions/userActions";

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
        <FormContainer>
            <h1>Forgot Password?</h1>
            <p>Enter your email and submit and you will receive an email with further instructions</p>
            {error && <Message variant="danger">{error}</Message>}
            {success && <Message variant='success'>{message}</Message>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId="email">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Button type="submit" variant='primary' onClick={cancelHandler} style={{width:'200px'}} className='mr-4'>
                    Cancel
                </Button>

                <Button type="submit" variant="info" style={{width:'200px'}}>
                    Recover Password
                </Button>
            </Form>

        </FormContainer>
    );
};

export default ForgotPasswordScreen;
