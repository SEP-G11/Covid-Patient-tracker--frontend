import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { Form, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import FormContainer from '../../components/FormContainer';
import { register } from '../../actions/userActions';
import { listFacilities } from '../../actions/facilityActions';
import MOHSideNav from './MOHSideNav';
import PhoneInput from 'react-phone-input-2'
import './CreateAccountScreen.css';

const CreateAccountScreen = ({ history }) => {
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [contact, setContact] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [accountType, setAccountType] = useState('');
    const [facility,setFacility] = useState({});
    const [message, setMessage] = useState(null);

    const dispatch = useDispatch();
    //
    const userRegister = useSelector(state => state.userRegister);
    const { loading, error,success, user } = userRegister;

    const facilityList = useSelector(state => state.facilityList);
    const {loading:loadingFacilityList, error:errorFacilityList, facilitiesList} = facilityList;

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;



    useEffect(() => {
        if (userInfo && userInfo.results.accType === 'MOH'){
            dispatch(listFacilities());

            if (success){
                setName('');setId('');setEmail('');setContact('94');setPassword('');setConfirmPassword('');setAccountType('');setFacility({})
            }
        }
        else {
            history.push('/login');
        }

    }, [user,dispatch,history,userInfo,success]);
    //
    const submitHandler = (e) => {
        e.preventDefault();
        if(password !== confirmPassword){
            setMessage('Passwords do not match');
        }

        else {
            dispatch(register(id, name, email, contact, password, accountType, facility.value));
        }
    };

    const hospitalDropdown = () => {
        const customStyles = {
            control: (styles) => ({
                ...styles,
                borderRadius: "20px",
                borderColor: "#007c7a",
                height: "calc(1.5em + 1.5rem + 0px)"
            }),
        }
     //let options = [{value: 0, label:'Select facility'}];
        const options = facilitiesList.results.map(facility =>({ value: facility.facility_id, label: facility.name }));
        //console.log(options);
        return (

            <Form.Group controlId='facilities'>
                <Form.Label className='cas__formLabel'>Associated Facility</Form.Label>
                <Select
                    value={facility}
                    onChange={(e) => setFacility(e)}
                    options={options}
                    menuPlacement="top"
                    styles={customStyles}
                    isLoading={loadingFacilityList}
                />
            </Form.Group>
        );

    };

    return (
        <React.Fragment>
            <Row>
                <Col sm={3}> <MOHSideNav from='cas'/> </Col>
                <Col sm={8} >
                    <Row>
                        <Col sm={12}><h1 className='cas__title'>Create User</h1> </Col>
                    </Row>
                    <hr className='cas__hr'/>

                    <FormContainer className='cas__formContainer'>
                        {success && <Message variant='success'>{user.message}</Message>}
                        {message && <Message variant='danger'>{message}</Message>}
                        {error && <Message variant='danger'>{error}</Message>}
                        {loading && <Loader/>}
                        <Form onSubmit={submitHandler} >

                            <Form.Group controlId='id'>
                                <Form.Label className='cas__formLabel'>ID</Form.Label>
                                <Form.Control
                                    type='text'
                                    placeholder='Enter ID'
                                    value={id}
                                    onChange={(e) => setId(e.target.value)}
                                    className='cas__formControl'
                                >
                                </Form.Control>
                            </Form.Group>


                            <Form.Group controlId='name'>
                                <Form.Label className='cas__formLabel'>Name</Form.Label>
                                <Form.Control
                                    type='text'
                                    placeholder='Enter name'
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className='cas__formControl'
                                >
                                </Form.Control>
                            </Form.Group>


                            <Form.Group controlId='email'>
                                <Form.Label className='cas__formLabel'>Email Address</Form.Label>
                                <Form.Control
                                    type='email'
                                    placeholder='Enter email'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className='cas__formControl'
                                >
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId='contact'>
                                <Form.Label className='cas__formLabel'>Contact Number</Form.Label>
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
                                        <Form.Label className='cas__formLabel'>Password</Form.Label>
                                        <Form.Control
                                            type='password'
                                            placeholder='Enter password'
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className='cas__formControl'
                                        >
                                        </Form.Control>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group controlId='confirmPassword'>
                                        <Form.Label className='cas__formLabel'>Confirm Password</Form.Label>
                                        <Form.Control
                                            type='password'
                                            placeholder='Confirm password'
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            className='cas__formControl'
                                        >
                                        </Form.Control>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Group controlId='role'>
                                        <Form.Label className='cas__formLabel'>Account Type</Form.Label>
                                        <Form.Control
                                            as='select'
                                            value={accountType}
                                            onChange={(e) => setAccountType(e.target.value)}
                                            className='cas__formControl'
                                        >
                                            <option value='' disabled selected hidden>Select Account Type</option>
                                            <option value='DOC' className='cas__selectOption'>Doctor</option>
                                            <option value='HA' className='cas__selectOption'>Hospital Admin</option>
                                            <option value='MOH' className='cas__selectOption'>MOH Admin</option>
                                        </Form.Control>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    {(accountType==='DOC'||accountType==='HA') && hospitalDropdown()}
                                </Col>
                            </Row>

                            <Row>
                                <Col className='d-flex justify-content-center'>
                                    <button type='submit' className='cas__button casButton'>
                                        CREATE ACCOUNT
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

export default CreateAccountScreen;