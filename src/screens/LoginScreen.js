import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import { login } from "../actions/userActions";
import { loadbeds } from "../actions/bedActions";
import { getFacility } from "../actions/facilityActions";
const LoginScreen = ({ location, history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const facilityLoad = useSelector((state) => state.facilityLoad);
  const { facilityInfo } = facilityLoad;


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

<Row >
        <Col sm={2}></Col>
        <Col sm={8} >
          <Row>
            {/* <Col sm={1}> <img src={logo} width="200" height="90" ></img></Col> */}
            <Col sm={12}><h1 style={{ fontFamily: "arial", textAlign: "center", color: "#007c7a", fontSize: "40px", paddingLeft: "-50px" ,paddingTop:"60px"}}>LOGIN TO THE SYSTEM</h1> </Col>
          </Row>
          <hr
            style={{
              color: "white",
              backgroundColor: "#007c7a",
              height: 2,
            }}
          />
<br/>

 <FormContainer>
      
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="email">
          <Form.Label style={{ color: "#008A77", fontWeight: "bold" }}>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            style={{ borderRadius: "20px", borderWidth: "1px", borderColor: "#007c7a", borderStyle: "solid", color: "#007c7a", outline: "#913163" }}
            
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label style={{ color: "#008A77", fontWeight: "bold" }}>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ borderRadius: "20px", borderWidth: "1px", borderColor: "#007c7a", borderStyle: "solid", color: "#007c7a", outline: "#913163" }}
          ></Form.Control>
        </Form.Group>

        <Link to={"/forgot-password"} style={{ color: "gray",fontSize:"12px", fontWeight: "bold" }} >Forgot Your Password ?</Link>

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
