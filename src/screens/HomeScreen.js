import React, { Component } from "react";
import { Form, Button, Row, Col, Container } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import { Link } from "react-router-dom";
import logo from "../assets/SEP logo.png";

export default class HomeScreen extends Component {


  render() {

    return (
     
      <div>
        
        <Row >
          <Col >
            <br /> <br /> <br /> <br /> <br />
            <img src={logo} width="650" height="350"></img>

          </Col>
          <Col>

            <h1 style={{ fontFamily: "arial", textAlign: "center", color: "#007c7a", fontSize: "35px", paddingTop: "100px" }}>Covid patient tracker for  </h1>
            <h1 style={{ fontFamily: "arial", textAlign: "center", color: "#007c7a", fontSize: "35px", paddingTop: "0px" }}>sri lanka </h1>
           <Row>
           <Col sm={2}></Col>
           <Col sm={8}><h5 style={{ fontFamily: "Lato", textAlign: "center", padding: "13px", textTransform: "revert" ,letterSpacing:"1.5px"}}>With the COVID-19 outbreak spreading rapidly through
              Asia at the beginning of 2020, Sri Lanka’s health authorities identified a need
              to implement adequate precautions to prevent the disease from entering the country,therefore  Hospital has become more busy.</h5></Col>
           <Col sm={2}></Col>
           </Row>
            

           <Row>
           <Col sm={1}></Col>
           <Col sm={10}>
              <h5  style={{ fontFamily: "Lato", textAlign: "center", padding: "10px", textTransform: "revert" ,letterSpacing:"1.5px"}}>So  from this web application , Tracking patients and the hospital capacities are critical requirements for the healthcare system to ensure the covid pandemic can be managed very well.</h5>
              </Col>
           <Col sm={1}></Col>
           </Row>
            
           
            <Row>
              <Col sm={4}></Col>
              <Col>

                <Link to={"/login"}>
                  <br />

                  <button class="button button2" type="submit" style={{ paddingLeft: "-20px" }}>LOG IN </button>
                </Link>
              </Col>
              <Col sm={4}></Col>
            </Row>
          </Col>

        </Row>
        <Row> <Col sm={4}></Col>
        </Row>
      </div>


    );
  }
}
