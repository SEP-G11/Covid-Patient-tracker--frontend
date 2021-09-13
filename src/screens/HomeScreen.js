import React, { Component } from "react";
import { Form, Button, Row, Col, Container } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import { Link } from "react-router-dom";
import logo from "../assets/SEP logo.png";

export default class HomeScreen extends Component {
  render() {
    return (
      <Container>
        <Row className="align-items-center">
          <Col>
            <br />
            <img src={logo} width="500" height="200"></img>
          </Col>
          <Col >
            {" "}
            <h1>Common home page</h1>
            <Link to={"/login"}>
              {" "}
              <Button type="submit" style={{
                    color: "white",
                    background: "#007c7a",
                    marginBottom: "50px",
                  }} aline="center">
                {" "}
                LOG IN
              </Button>{" "}
            </Link>
          </Col>
        </Row>
      </Container>
    );
  }
}
