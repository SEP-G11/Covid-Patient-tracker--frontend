
import {  Row, Col,  Card, ListGroup } from "react-bootstrap";
import { Chart } from "react-google-charts";
import { useSpring, animated } from 'react-spring';
import Warning from "../../components/Warning";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import logo from "../../assets/SEP logo.png";
import { FaRegHospital } from "react-icons/fa";
import { FiPhoneCall } from "react-icons/fi";
import { Link } from "react-router-dom";
import { loadbeds } from "../../actions/bedActions";
import DoctorSideNav from "./DoctorSideNav";

const DoctorHomeScreen = ({ location, history }) => {

  const styles = useSpring({
    loop: true,
    to: [
      { opacity: 3, color: 'red' },           
      { opacity: 0, color: 'red' },       
    ],
    from: { opacity: 0, color: 'red' },
  });

  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);

  const bedLoad = useSelector((state) => state.bedLoad);
  const { bedInfo } = bedLoad;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const dispatch = useDispatch();

  


  useEffect(() => {
    dispatch(loadbeds("4"));
    if (!userInfo) {
      history.push("/login");
    }
  }, [dispatch, history, userInfo]);

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
      <>  {bedInfo ? (
        <><Row>
          <Col sm={3}><DoctorSideNav from='home' /></Col>



          <Col sm={8}>
            <Row>
              {/* <Col sm={1}> <img src={logo} width="200" height="90" ></img></Col> */}
              <Col sm={12}><h1 style={{ fontFamily: "arial", textAlign: "center", color: "#007c7a", fontSize: "40px", paddingLeft: "-50px" }}>Doctor Dashboard</h1> </Col>
            </Row> <Row>   <Col sm={1}></Col>
              <Col sm={7}> <span class="icon" style={{ color: "#007c7a" }}><FaRegHospital size={25} /> </span>
                <span style={{ fontSize: "18px" }}>  {bedInfo["results"]["FacilityName"]}</span>
              </Col>
              <Col sm={4}> <span class="icon" style={{ color: "#007c7a" }}><FiPhoneCall size={25} /> </span>
                <span style={{ fontSize: "18px" }}>{bedInfo["results"]["Contactnumber"]}</span>
              </Col>
            </Row>

            <hr
              style={{
                color: "white",
                backgroundColor: "#007c7a",
                height: 2,
              }} />
              
{(bedInfo["results"]["NormalBedUsed"]+bedInfo["results"]["CovidBedUsed"])/(bedInfo["results"]["NormalBedFree"]+bedInfo["results"]["CovidBedFree"]+bedInfo["results"]["NormalBedUsed"]+bedInfo["results"]["CovidBedUsed"])>0.75 && <animated.div style={{fontsize:"20px", fontWeight:"10px" ,...styles}}>
  <Warning variant="danger">The hospital beds capacity is about to <strong>full.</strong> (More than 75% beds are used) </Warning></animated.div> }
            <Row>
              <Col>
                <br />   <br />
                <h2 style={{ textAlign: "center", color: "#007c7a", fontSize: "40px" }}>WELCOME</h2>
                <h4 st style={{ fontFamily: "Lato", textAlign: "center", padding: "10px", textTransform: "revert", letterSpacing: "1.5px" }}>Your are a Doctor of {bedInfo["results"]["FacilityName"]}.Try to work with  your best.</h4>
                <div style={{ paddingLeft: "100px" }}>
                  <br />
                  <Link to={"/doctor/admit"}>
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
            <Col sm={3}>
            </Col>
            <Col sm={2}>  <Chart
              width={'300px'}
              height={'300px'}

              chartType="PieChart"
              loader={<div style={{ color: "#008A77", fontWeight: "bold" }}>Loading Chart</div>}
              data={[
                ['Beds Type', ' No:beds'],
                ['Free', bedInfo["results"]["CovidBedFree"]],
                ['Used(Occupied)', bedInfo["results"]["CovidBedUsed"]],


              ]}
              options={{
                title: 'Covid Ward Beds',
                titleTextStyle: { color: '#008A77', textAlign: "center", fontWeight: "bold" },

                pieHole: 0.4,
              }}

            /></Col>
            <Col sm={1}><hr
              style={{
                color: "white",
                backgroundColor: "#007c7a",
                height: 200,
                width: 4
              }} /></Col>


            <Col sm={2}>  <Chart
              width={'300px'}
              height={'300px'}
              chartType="PieChart"
              loader={<div style={{ color: "#008A77", fontWeight: "bold" }}>Loading Chart</div>}
              data={[
                ['Beds Type', ' No:beds'],
                ['Free', bedInfo["results"]["NormalBedFree"]],
                ['Used(Occupied)', bedInfo["results"]["NormalBedUsed"]],


              ]}
              options={{
                title: 'Normal Ward Beds',
                titleTextStyle: { color: '#008A77', textAlign: "center", fontWeight: "bold" },
                pieHole: 0.4,
              }}
              rootProps={{ 'data-testid': '3' }}
            /></Col><Col sm={1}><hr
              style={{
                color: "white",
                backgroundColor: "#007c7a",
                height: 200,
                width: 4
              }} /></Col>
            <Col sm={2}>  <Chart
              width={'300px'}
              height={'300px'}
              chartType="PieChart"
              loader={<div style={{ color: "#008A77", fontWeight: "bold" }}>Loading Chart</div>}
              data={[
                ['Beds Type', ' No:beds'],
                ['Free', bedInfo["results"]["NormalBedFree"] + bedInfo["results"]["CovidBedFree"]],
                ['Used(Occupied)', bedInfo["results"]["NormalBedUsed"] + bedInfo["results"]["CovidBedUsed"]],


              ]}
              options={{
                title: 'Total ward Beds',
                titleTextStyle: { color: '#008A77', textAlign: "center", fontWeight: "bold" },
                pieHole: 0.4,
              }}

            /></Col>


          </Row>
          <Row>

            <Col sm={3}></Col>
            <Col sm={8}>
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
            <Col sm={3}>


              <div >
                <Card style={{ width: '15rem', borderColor: "#007c7a", borderRadius: "20px", borderWidth: "2px" }}>
                  <Card.Header style={{ textAlign: "center", fontFamily: "Lato", textTransform: "revert", fontWeight: "bold", color: "#007c7a", fontSize: "18px" }}>Covid Ward</Card.Header>
                  <Card.Body>

                    <Card.Title style={{ color: "black", textAlign: "center", fontFamily: "Lato", textTransform: "revert", fontWeight: "bold" }}>Total Beds : {bedInfo["results"]["CovidWardCapacity"]}</Card.Title>
                    <Card.Title style={{ textAlign: "center", fontFamily: "Lato", textTransform: "revert", fontWeight: "bold" }}>Used  :{bedInfo["results"]["CovidBedUsed"]} Free : {bedInfo["results"]["CovidBedFree"]}</Card.Title>


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
                <Col sm={3} style={{ textAlign: "center", fontFamily: "Lato", textTransform: "revert", fontWeight: "bold", color: "#007c7a", fontSize: "40px" }}>Ward capacity</Col>
      
            <Col sm={3}>
              <div >


                <Card style={{ width: '15rem', borderColor: "#007c7a", borderRadius: "20px", borderWidth: "2px" }}>
                  <Card.Header style={{ textAlign: "center", fontFamily: "Lato", textTransform: "revert", fontWeight: "bold", color: "#007c7a", fontSize: "18px" }}>Normal Ward</Card.Header>
                  <Card.Body>
                    <Card.Title style={{ color: "black", textAlign: "center", fontFamily: "Lato", textTransform: "revert", fontWeight: "bold" }}>Total Beds : {bedInfo["results"]["NormalWardCapacity"]}</Card.Title>
                    <Card.Title style={{ textAlign: "center", fontFamily: "Lato", textTransform: "revert", fontWeight: "bold" }}>Used  :{bedInfo["results"]["NormalBedUsed"]} Free : {bedInfo["results"]["NormalBedFree"]}</Card.Title>

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
      ) : (null)}</>


      <br /><br />
    </div>
  );
};


export default DoctorHomeScreen;
