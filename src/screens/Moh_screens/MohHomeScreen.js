import React, { Component } from "react";
import { Form, Container, Row, Col } from "react-bootstrap";
import { login, logout } from "../../actions/userActions";
import { useDispatch, useSelector } from "react-redux";

import Header from "../../components/Header";
import Footer from "../../components/Footer";
const MohHomeScreen = ({ location, history }) => {
  const dispatch = useDispatch();

  const submitHandler = () => {    
    dispatch(logout());
  };

  return (
    <div>
 <Header/>
    <Container className='py-3'>
      <Row>
        <Col>
          {" "}
          <h1>MOH Home </h1>
        </Col>
        <Col>
        
        </Col>
      </Row>   
    </Container>
    <Footer/>
    </div>
   
  );
};
export default MohHomeScreen;
