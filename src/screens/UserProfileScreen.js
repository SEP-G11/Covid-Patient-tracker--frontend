import React, { useState, useEffect } from 'react';
import FormContainer from '../components/FormContainer';
import { Form, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import Meta from "../components/Meta";
import {getUserDetails, updateUserProfile} from '../actions/userActions';
import MOHSideNav from "./Moh_screens/MOHSideNav";
import HospitalAdminSideNav from "./HospitalAdmin_screens/HospitalAdminSideNav";
import DoctorSideNav from "./Doctor_screens/DoctorSideNav";
import PhoneInput from 'react-phone-input-2';
import {USER_UPDATE_PROFILE_RESET} from '../constants/userConstants'
import './UserProfileScreen.css';

const UserProfileScreen = ({history}) => {
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

    const userUpdateProfile = useSelector(state => state.userUpdateProfile);
    const { error:updateError,success } = userUpdateProfile;

    useEffect(() => {
        if (!userInfo){
            history.push('/login')
        }
        else {
            if (!userDetailsObject.user_id || success){
                dispatch({type: USER_UPDATE_PROFILE_RESET});
                dispatch(getUserDetails())
            }
            else{
                setName(userDetailsObject.name);
                setEmail(userDetailsObject.email);
                setContact(userDetailsObject.contact_no);
            }
        }
    },[dispatch,history,userInfo,userDetailsObject,success]);

    const submitHandler = (e) => {
        e.preventDefault();
        if(password !== confirmPassword){
            setMessage('Passwords do not match');
        }
        else {
            let user = {};
            if (name!=='' && name!==userDetailsObject.name){user.name = name}
            if (contact!=='' && contact!==userDetailsObject.contact_no){user.contact = contact}
            if (password!==''){user.newPassword = password}
            if (Object.keys(user).length !== 0){
                dispatch(updateUserProfile(user));
                dispatch(getUserDetails());
            }
        }
    };

    return (
        <React.Fragment>
            <Meta title={'Profile'}/>
            <Row>
                {userInfo && userInfo.results.accType==='MOH' && <Col sm={3}> <MOHSideNav from='ups'/> </Col>}
                {userInfo && userInfo.results.accType==='DOC' && <Col sm={3}> <DoctorSideNav from='ups'/> </Col>}
                {userInfo && userInfo.results.accType==='HA' && <Col sm={3}> <HospitalAdminSideNav from='ups'/> </Col>}
                <Col sm={8} >
                    <Row>
                        <Col sm={12}><h1 className='ups__title'>User Profile</h1> </Col>
                    </Row>
                    <hr className='ups__hr'/>
                    <FormContainer className='ups__formContainer'>
                        {message && <Message variant='danger'>{message}</Message>}
                        {error && <Message variant='danger'>{error}</Message>}
                        {updateError && <Message variant='danger'>{updateError}</Message>}
                        {success && <Message variant='success'>Profile Updated</Message>}
                        {loading && <Loader/>}
                        <Form onSubmit={submitHandler} >

                            <Form.Group controlId='name'>
                                <Form.Label className='ups__formLabel'>Name</Form.Label>
                                <Form.Control
                                    type='text'
                                    placeholder='Enter name'
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className='ups__formControl'
                                >
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId='email'>
                                <Form.Label className='ups__formLabel'>Email Address</Form.Label>
                                <Form.Control
                                    type='email'
                                    placeholder='Enter email'
                                    value={email}
                                    disabled
                                    onChange={(e) => setEmail(e.target.value)}
                                    className='ups__formControl'
                                >
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId='contact'>
                                <Form.Label className='ups__formLabel'>Contact Number</Form.Label>
                                {/*<Form.Control*/}
                                {/*    type='text'*/}
                                {/*    placeholder='Enter contact number'*/}
                                {/*    value={contact}*/}
                                {/*    onChange={(e) => setContact(e.target.value)}*/}
                                {/*    className='ups__formControl'*/}
                                {/*>*/}
                                {/*</Form.Control>*/}
                                <PhoneInput
                                    containerStyle={{ color: "#007c7a" }}
                                    containerClass=""
                                    inputStyle={{borderRadius: '20px',height: 'calc(1.5em + 1.5rem + 0px)', width: 'inherit'}}
                                    country="lk"
                                    onlyCountries={["lk"]}
                                    placeholder='Enter contact number'
                                    value={contact}
                                    onChange={(phone) => setContact(phone)}
                                    style={{ borderRadius: "20px", borderWidth: "1px", borderColor: "#007c7a", borderStyle: "solid", color: "#007c7a", outline: "#913163" }}
                                    disableDropdown
                                    countryCodeEditable={false}
                                />
                            </Form.Group>

                            <Row>
                                <Col>
                                    <Form.Group controlId='password'>
                                        <Form.Label className='ups__formLabel'>New Password</Form.Label>
                                        <Form.Control
                                            type='password'
                                            placeholder='Enter new password'
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className='ups__formControl'
                                        >
                                        </Form.Control>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group controlId='confirmPassword'>
                                        <Form.Label className='ups__formLabel'>Confirm New Password</Form.Label>
                                        <Form.Control
                                            type='password'
                                            placeholder='Confirm new password'
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            className='ups__formControl'
                                        >
                                        </Form.Control>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <br/>
                            <Row>
                                <Col className='d-flex justify-content-center'>
                                    <button type='submit' className='ups__button upsButton'>
                                        UPDATE PROFILE
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

export default UserProfileScreen;
