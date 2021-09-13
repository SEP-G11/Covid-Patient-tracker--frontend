import React, { Component } from "react";
import { Form, Container, Row, Col } from "react-bootstrap";
import { login, logout } from "../../actions/userActions";
import { useDispatch, useSelector } from "react-redux";

import HospitalAdminSideNav from "./HospitalAdminSideNav";

const HospitalAdminHomeScreen = ({ location, history }) => {
  const dispatch = useDispatch();

  const submitHandler = () => {
    dispatch(logout());
  };

  return (
    <div>
      <HospitalAdminSideNav />
      <Container className="py-3">
        <Row>
          <Col></Col>
          <Col>
            {" "}
            <h1>Hospital Admin Home </h1>
          </Col>
          
        </Row>
      </Container>
    </div>
  );
};
export default HospitalAdminHomeScreen;
