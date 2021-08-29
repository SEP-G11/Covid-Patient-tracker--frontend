import React, { Component } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { login, logout } from "../../actions/userActions";
import { useDispatch, useSelector } from "react-redux";

const MohHomeScreen = ({ location, history }) => {
  const dispatch = useDispatch();

  const submitHandler = () => {    
    dispatch(logout());
  };

  return (
    <Row>
        <Col>
          {" "}
          <h1>MOH Home </h1>
        </Col>
        <Col>
          <Button type="submit" variant="info" onClick={submitHandler}>
            {" "}
            LOG OUT
          </Button>
        </Col>
      </Row>
  );
};
export default MohHomeScreen;
