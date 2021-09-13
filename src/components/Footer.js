import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";

const Footer = () => {
  return (
    <footer>
      <div
        style={{
          backgroundColor: "#007c7a",
          color: "white",
          position: "relative ",
          bottom: 0,
          width: "100%",
          height: "20%",
        }}
      >
        <Row>
          <Col className="text-center ">
            Copyright &copy; Covid Patient Tracker
          </Col>
        </Row>
      </div>
    </footer>
  );
};

export default Footer;
