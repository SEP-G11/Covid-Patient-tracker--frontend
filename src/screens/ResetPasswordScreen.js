import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import { resetPassword } from "../actions/userActions";

const LoginScreen = ({ match, history }) => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState(null);

    const dispatch = useDispatch();

    const userResetPassword = useSelector((state) => state.userResetPassword);
    const { loading, error,success,message:resetPasswordMessage } = userResetPassword;

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    useEffect(() => {
        if (success){
            history.push('/login')
        }
        if (userInfo){
            if (userInfo.results.accType === "DOC") {
                history.push("/doctor/home");
            } else if (userInfo.results.accType === "MOH") {
                history.push("/moh/home");
            } else if (userInfo.results.accType === "HA"){
                history.push("/hospitalAdmin/home");
            }
        }

    }, [history,success,userInfo]);

    const submitHandler = (e) => {
        e.preventDefault();
        if(password !== confirmPassword){
            setMessage('Passwords do not match');
        }
        else {
            const token = match.params.token;
            dispatch(resetPassword(password,token));
        }
    };
    return (
        <FormContainer>
            <h1>Reset Password</h1>
            {error && <Message variant="danger">{error}</Message>}
            {message && <Message variant='danger'>{message}</Message>}
            {resetPasswordMessage && <Message variant='success'>{resetPasswordMessage}</Message>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler}>

                <Form.Group controlId="password">
                    <Form.Label>New Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Enter new password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}>
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='confirmPassword'>
                    <Form.Label>Confirm New Password</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Confirm new password'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}>
                    </Form.Control>
                </Form.Group>

                <Button type="submit" variant="info">
                    Reset Password
                </Button>
            </Form>
        </FormContainer>
    );
};

export default LoginScreen;
