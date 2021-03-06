import React, { useState, useEffect } from "react";
import { Form, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import Meta from '../components/Meta';
import { resetPassword } from "../actions/userActions";
import './ResetPasswordScreen.css';

const ResetPasswordScreen = ({ match, history }) => {
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
        <React.Fragment>
            <Meta title={'Reset Password'}/>
            <Row>
                <Col sm={{ span: 8, offset: 2 }}>
                    <Row>
                        <Col sm={12}><h1 className='rps__title'>Reset Password</h1> </Col>
                    </Row>
                    <hr className='cas__hr'/>
                    <br/>
                    <FormContainer className='rps__formContainer'>
                        {error && <Message variant="danger">{error}</Message>}
                        {message && <Message variant='danger'>{message}</Message>}
                        {resetPasswordMessage && <Message variant='success'>{resetPasswordMessage}</Message>}
                        {loading && <Loader />}
                        <Form onSubmit={submitHandler}>
                            <Form.Group controlId="password">
                                <Form.Label className='rps__formLabel'>New Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Enter new password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className='rps__formControl'
                                >
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId='confirmPassword'>
                                <Form.Label className='rps__formLabel'>Confirm New Password</Form.Label>
                                <Form.Control
                                    type='password'
                                    placeholder='Confirm new password'
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className='rps__formControl'
                                >
                                </Form.Control>
                            </Form.Group>
                            <br/>
                            <Row>
                                <Col className='d-flex justify-content-center'>
                                    <button type='submit' className='rps__button rpsButton'>
                                        RESET PASSWORD
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

export default ResetPasswordScreen;
