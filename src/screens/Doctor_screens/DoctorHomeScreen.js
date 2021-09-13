import React, { Component } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { login, logout } from "../../actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import { Container } from "react-bootstrap";

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import DoctorSideNav from "./DoctorSideNav";

const DoctorHomeScreen = ({ location, history }) => {
  const dispatch = useDispatch();

  const submitHandler = () => {
    dispatch(logout());
  };

  return (
    
    <div>
      <DoctorSideNav/>
     
      <Container className='py-3'>
        <Row>  <Col>
          
          </Col>
          <Col>
            {" "}
            <h1>Doctor Home </h1>
          </Col>
          <Col>
          
          </Col>
        </Row>   
      </Container>
    
      </div>
  );
};
export default DoctorHomeScreen;
