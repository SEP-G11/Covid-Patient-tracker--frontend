
import { Container, Row, Col, Table, Card, ListGroup } from "react-bootstrap";
import { logout } from "../../actions/userActions";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import logo from "../../assets/SEP logo.png";
import { FaRegHospital } from "react-icons/fa";
import { FiPhoneCall } from "react-icons/fi";
import { Link } from "react-router-dom";
import HospitalAdminSideNav from "./HospitalAdminSideNav";
import { Dropdown } from 'react-bootstrap';

const HospitalAdminHomeScreen = ({ location, history }) => {


  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);

  const bedLoad = useSelector((state) => state.bedLoad);
  const { bedInfo } = bedLoad;


  console.log(bedInfo);

  function handleSubmit1(e) {
    e.preventDefault();
    setShow1(!show1);

  }

  function handleSubmit2(e) {
    e.preventDefault();    
    setShow2(!show2);
  }


  return (
    <div>
 <>  { bedInfo ? (
      <><Row>
          <Col sm={3}><HospitalAdminSideNav /></Col>



          <Col sm={8}>
            <Row>
              {/* <Col sm={1}> <img src={logo} width="200" height="90" ></img></Col> */}
              <Col sm={12}><h1 style={{ fontFamily: "arial", textAlign: "center", color: "#007c7a", fontSize: "40px", paddingLeft: "-50px" }}>HOSPITAL ADMIN Dashboard</h1> </Col>
              <span class="icon" style={{ paddingLeft: "160px", color: "#007c7a" }}><FaRegHospital size={25} /> </span>
              <span style={{ paddingInline: "10px", fontSize: "18px" }}>  {bedInfo["results"]["FacilityName"]}</span>
              <span class="icon" style={{ paddingLeft: "100px", color: "#007c7a" }}><FiPhoneCall size={25} /> </span>
              <span style={{ paddingInline: "10px", fontSize: "18px" }}>{bedInfo["results"]["Contactnumber"]}</span>
            </Row>
            <hr
              style={{
                color: "white",
                backgroundColor: "#007c7a",
                height: 2,
              }} />
            <Row>
              <Col>
                <br />   <br />
                <h2 style={{ textAlign: "center", color: "#007c7a", fontSize: "40px" }}>WELCOME</h2>
                <h4 st style={{ fontFamily: "Lato", textAlign: "center", padding: "10px", textTransform: "revert", letterSpacing: "1.5px" }}>Your are a hospital admin of {bedInfo["results"]["FacilityName"]}.Try to work with  your best.</h4>
                <div style={{ paddingLeft: "100px" }}>
                  <br />
                  <Link to={"/hospitalAdmin/admit"}>
                    <button class="button button3" type="submit">GET START </button> </Link> </div>
              </Col>
              <Col> <img src={logo} width="550" height="275"></img></Col>

            </Row></Col>
          <Col sm={3}> </Col>

        </Row>
        <Row>

<Col sm={3}></Col>
<Col sm={8}><br />
  <hr
    style={{
      color: "white",
      backgroundColor: "#007c7a",
      height: 2,
    }} />
  <br /> <br /></Col>
<Col sm={3}></Col>
</Row>

        
        <Row>

            <Col sm={3}></Col>
            <Col sm={4}>
            
            
              <div style={{ paddingLeft: "20px" }}>
                <Card style={{ width: '15rem', borderColor: "#007c7a", borderRadius: "20px", borderWidth: "2px" }}>
                  <Card.Header style={{ textAlign: "center", fontFamily: "Lato", textTransform: "revert", fontWeight: "bold", color: "#007c7a", fontSize: "18px" }}>Covid Ward</Card.Header>
                  <Card.Body>
                    <Card.Title style={{ textAlign: "center", fontFamily: "Lato", textTransform: "revert", fontWeight: "bold" }}>Bed capatity {bedInfo["results"]["CovidWardCapacity"]}</Card.Title>
                    <div style={{ paddingLeft: "44px" }}>
                      <form onSubmit={handleSubmit1}>
                        <button class="button button4" type="submit">More</button>
                      </form>
                    </div>
                    <> {show1 ? (<ListGroup className="list-group-flush">

                      {Array.from({ length: bedInfo["results"]["CovidBed"].length }).map(
                        (_, i) => (

                          <>  {bedInfo["results"]["CovidBed"][`${i}`]["IsOccupied"] == 1 ? (<ListGroup.Item style={{ color: "red", textAlign: "center" }}>{bedInfo["results"]["CovidBed"][`${i}`]["BedID"]}    {bedInfo["results"]["CovidBed"][`${i}`]["IsOccupied"] == 1 ? ("Occupied") : ("Not Occupied")}</ListGroup.Item>) : (<ListGroup.Item style={{ color: "green", textAlign: "center" }}>{bedInfo["results"]["CovidBed"][`${i}`]["BedID"]} {bedInfo["results"]["CovidBed"][`${i}`]["IsOccupied"] == 1 ? ("Occupied") : ("Not Occupied")}</ListGroup.Item>)} </>

                        )
                      )}

                    </ListGroup>


                    ) : (null)}</>
                  </Card.Body>
                </Card></div> </Col>
            <Col sm={4}>
              <div style={{ paddingTop: "3px" }}>
               

                <Card style={{ width: '15rem', borderColor: "#007c7a", borderRadius: "20px", borderWidth: "2px" }}>
                  <Card.Header style={{ textAlign: "center", fontFamily: "Lato", textTransform: "revert", fontWeight: "bold", color: "#007c7a", fontSize: "18px" }}>Normal Ward</Card.Header>
                  <Card.Body>
                    <Card.Title style={{ textAlign: "center", fontFamily: "Lato", textTransform: "revert", fontWeight: "bold" }}>Bed capatity {bedInfo["results"]["NormalWardCapacity"]}</Card.Title>
                    <div style={{ paddingLeft: "44px" }}>
                      <form onSubmit={handleSubmit2}>
                        <button class="button button4" type="submit">More</button>
                      </form>
                    </div>
                    <> {show2 ? (<ListGroup className="list-group-flush">

                      {Array.from({ length: bedInfo["results"]["NormalBed"].length }).map(
                        (_, i) => (


                          <>  {bedInfo["results"]["NormalBed"][`${i}`]["IsOccupied"] == 1 ? (<ListGroup.Item style={{ color: "red", textAlign: "center" }}>{bedInfo["results"]["NormalBed"][`${i}`]["BedID"]}    {bedInfo["results"]["NormalBed"][`${i}`]["IsOccupied"] == 1 ? ("Occupied") : ("Not Occupied")}</ListGroup.Item>) : (<ListGroup.Item style={{ color: "green", textAlign: "center" }}>{bedInfo["results"]["NormalBed"][`${i}`]["BedID"]} {bedInfo["results"]["NormalBed"][`${i}`]["IsOccupied"] == 1 ? ("Occupied") : ("Not Occupied")}</ListGroup.Item>)} </>

                        )
                      )}

                    </ListGroup>) : (null)}</>




                  </Card.Body>
                </Card>
              </div>
            </Col>
            <br /> <Col sm={1}> </Col>
          </Row></>
    ):(null)}</>
    <br /><br />
    </div>
  );
};


export default HospitalAdminHomeScreen;
