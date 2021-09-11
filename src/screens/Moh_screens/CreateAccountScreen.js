import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import FormContainer from '../../components/FormContainer';
import { register } from '../../actions/userActions';
import {USER_REGISTER_RESET} from "../../constants/userConstants";
import './CreateAccountScreen.css';

const CreateAccountScreen = ({ location, history }) => {
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [contact, setContact] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [accountType, setAccountType] = useState('');
    const [message, setMessage] = useState(null);

    const dispatch = useDispatch();
    //
    const userRegister = useSelector(state => state.userRegister);
    const { loading, error, user } = userRegister;
    //
    //const redirect = location.search ? location.search.split('=')[1] : '/';
    //
    //console.log(user);
    useEffect(() => {
        if (user){
            console.log(user)
            dispatch({type: USER_REGISTER_RESET});
            history.push('/moh/home')
        }
    }, [ user,dispatch,history]);
    //
    const submitHandler = (e) => {
        e.preventDefault();
        if(password !== confirmPassword){
            setMessage('Passwords do not match');
        }
        else {
            dispatch(register(id, name, email, contact, password, accountType));
        }
    };

    return (
        <FormContainer>
            <h1>Create User</h1>
            {message && <Message variant='danger'>{message}</Message>}
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader/>}
            <Form onSubmit={submitHandler} >

                        <Form.Group controlId='id'>
                            <Form.Label>ID</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Enter ID'
                                value={id}
                                onChange={(e) => setId(e.target.value)}
                            >
                            </Form.Control>
                        </Form.Group>


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
                <Form.Group controlId='role'>
                    <Form.Label>Account Type</Form.Label>
                    <Form.Control
                        as='select'
                        value={accountType}
                        onChange={(e) => setAccountType(e.target.value)}
                    >
                        <option value='' disabled selected hidden>Select Account Type</option>
                        <option value='DOC'>Doctor</option>
                        <option value='HA'>Hospital Admin</option>
                        <option value='MOH'>MOH Admin</option>
                    </Form.Control>
                </Form.Group>

                <Button type='submit' variant='primary'>
                    Create Account
                </Button>
            </Form>

            {/*<Row className='py-3'>*/}
            {/*    <Col>*/}
            {/*        Have an Account?{' '}*/}
            {/*        <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>*/}
            {/*            Login*/}
            {/*        </Link>*/}
            {/*    </Col>*/}
            {/*</Row>*/}
        </FormContainer>
    );
};

export default CreateAccountScreen;