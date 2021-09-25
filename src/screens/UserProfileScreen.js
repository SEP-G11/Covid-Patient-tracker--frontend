import React, { useState, useEffect } from 'react';
import FormContainer from '../components/FormContainer';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { getUserDetails } from '../actions/userActions';


const UserProfileScreen = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [contact,setContact] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState(null);

    const dispatch = useDispatch();

    const userDetails = useSelector(state => state.userDetails);
    const { loading, error, userDetails:userDetailsObject } = userDetails;

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    const submitHandler = () => {

    };

    return (
        <React.Fragment>
            <FormContainer>
                <h1>User Profile</h1>
                <Form onSubmit={submitHandler} >

                    <Form.Group controlId='name'>
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='Enter name'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>


                    <Form.Group controlId='email'>
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control
                            type='email'
                            placeholder='Enter email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='contact'>
                        <Form.Label>Contact Number</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='Enter contact number'
                            value={contact}
                            onChange={(e) => setContact(e.target.value)}>
                        </Form.Control>
                    </Form.Group>

                    <Row>
                        <Col>
                            <Form.Group controlId='password'>
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type='password'
                                    placeholder='Enter password'
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}>
                                </Form.Control>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId='confirmPassword'>
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control
                                    type='password'
                                    placeholder='Confirm password'
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}>
                                </Form.Control>
                            </Form.Group>
                        </Col>
                    </Row>


                    <Button type='submit' variant='primary'>
                        Update Profile
                    </Button>
                </Form>
            </FormContainer>
            
        </React.Fragment>
    );
};

export default UserProfileScreen;
