import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form,  Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import Meta from "../components/Meta";
import { login } from "../actions/userActions";
import { loadbeds } from "../actions/bedActions";
import { getFacility } from "../actions/facilityActions";
import './LoginScreen.css';

const LoginScreen = ({  history }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();

    const userLogin = useSelector((state) => state.userLogin);
    const { loading, error, userInfo } = userLogin;



    useEffect(() => {
        if (userInfo) {

            if (userInfo["results"]["accType"] === "DOC") {
                dispatch(loadbeds("*"));
                dispatch(getFacility());
                history.push("/doctor/home");
            } else if (userInfo["results"]["accType"] === "MOH") {
                history.push("/moh/home");
            } else {
                dispatch(loadbeds("*"));
                dispatch(getFacility());
                history.push("/hospitalAdmin/home");
            }
        }
    }, [history, userInfo, dispatch]);

    const submitHandler = (e) => {
        e.preventDefault();

        dispatch(login(email, password));


    };

    return (
        <div>
            <Meta title={'Login'}/>
            <Row >
                <Col sm={2}></Col>
                <Col sm={8} >
                    <Row>
                        <Col sm={12}><h1 className='login__title'>LOGIN TO THE SYSTEM</h1> </Col>
                    </Row>
                    <hr className='login__hr'/>
                    <br/>

                    <FormContainer>

                        {error && <Message variant="danger">{error}</Message>}
                        {loading && <Loader />}
                        <Form onSubmit={submitHandler}>
                            <Form.Group controlId="email">
                                <Form.Label className='login__formLabel'>Email Address</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Enter email"
                                    value={email}
                                    className='login__formControl'
                                    onChange={(e) => setEmail(e.target.value)}>
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId="password">
                                <Form.Label className='login__formLabel'>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Enter password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className='login__formControl'>
                                </Form.Control>
                            </Form.Group>

                            <Link to={"/forgot-password"} className='login__fpLink'>Forgot Your Password ?</Link>

                            <br />  <br />
                            <Row>
                                <Col sm={3}></Col>
                                <Col>
                                    <button class="button button1" type="submit" >SIGN IN</button>
                                </Col>
                            </Row>


                        </Form>
                    </FormContainer>
                </Col>
                <Col sm={2}></Col>
            </Row>
        </div>

    );
};

export default LoginScreen;
