import React from "react";
import { Row, Col, } from "react-bootstrap";
import Meta from '../components/Meta';
import { Link } from "react-router-dom";
import logo from "../assets/SEP logo.png";
import dash from "../assets/dash.png";
import pcMobile from "../assets/mobile Pc.png";
import home from "../assets/home.png";
import { useSpring, animated } from 'react-spring';
import { useEffect } from "react";


const HomeScreen = ({ location, history }) => {


  const [styles, api] = useSpring(() => ({
    from: { y: -20, opacity: 1 },
  }))

  function goDashboard(e) {
    e.preventDefault();
    window.open("https://rlc-covid19tracker.vercel.app/dashboard", "_blank")

  }

  useEffect(() => {
    api({
      y: 20,
      opacity: 1,
      loop: { reverse: true },
    })
  }, [api])


  return (

    <div>
      <Meta title={'Home'} />
      <Row >

        <Col >
          <br /> <br />
          <br /> <br />

          <img src={home} alt="" width="850" height="550"></img>
        </Col>
        <Col>
          <br />
          <animated.div
            style={{
              ...styles, textAlign: "center"
            }}
          > <img src={logo} alt="" width="320" height="150"></img> </animated.div>
          <h1 style={{ fontFamily: "arial", textAlign: "center", color: "#007c7a", fontSize: "35px", paddingTop: "30px" }}>Covid patient tracker for  </h1>
          <h1 style={{ fontFamily: "arial", textAlign: "center", color: "#007c7a", fontSize: "35px", paddingTop: "0px" }}>sri lanka </h1>

          <Row>
            <Col sm={2}></Col>
            <Col sm={8}><h5 style={{ fontFamily: "Lato", textAlign: "center", padding: "13px", textTransform: "revert", letterSpacing: "1.5px" }}>
              With the COVID-19 outbreak spreading rapidly through
              Asia at the beginning of 2020, Sri Lanka’s health authorities identified a need
              to implement adequate precautions to prevent the disease from entering the country,therefore  Hospital has become more busy.</h5></Col>
            <Col sm={2}></Col>
          </Row>

          <Row>
            <Col sm={1}></Col>
            <Col sm={10}>
              <h5 style={{ fontFamily: "Lato", textAlign: "center", padding: "10px", textTransform: "revert", letterSpacing: "1.5px" }}>So  from this web application , Tracking patients and the hospital capacities are critical requirements for the healthcare system to ensure the covid pandemic can be managed very well.</h5>
            </Col>
            <Col sm={1}></Col>
          </Row>

          <Row>
            <Col sm={4}></Col>
            <Col>

              <Link to={"/login"}>
                <br />

                <button class="button button2" type="submit" style={{ marginLeft: 50, }}>LOG IN </button>
              </Link>
            </Col>
            <Col sm={4}></Col>
          </Row>
        </Col>

      </Row>
      <Row> <Col sm={4}></Col>
      </Row>
      <br /><br /><br /><br /><br /><br /><br /><br />
      <Row><Col sm={1}></Col>
        <Col sm={3}> <br /> <br /> <br /> <br />
          <h1 style={{ fontFamily: "arial", textAlign: "center", color: "#007c7a", fontSize: "30px", paddingTop: "30px", textTransform: "revert" }} >Realtime Analytics of Covid Situation In SriLanka  </h1>
          <br />

          <br />
          <form onSubmit={goDashboard}>
            <button class="button button2" type="submit" style={{ marginLeft: 120, }}>Click for Live Dashboard</button>
          </form>
        </Col>
        <Col sm={1}></Col>
        <Col sm={5}>
         
          <img src={dash} alt="" width="800" height="450" ></img>
        
        </Col>
        <Col sm={1}></Col>
      </Row>

      <br /><br /> <br /><br />
      <Row> <Col sm={3}></Col>
      </Row>
      <br /><br /><br /><br />
      <Row>
        <Col sm={6}>
          <img src={pcMobile} alt="" width="800" height="450"></img>
        </Col>
        <Col sm={1}></Col>
        <Col sm={4}>
          <br /><br />
          <h1 style={{ fontFamily: "arial", textAlign: "center", color: "#007c7a", fontSize: "35px", paddingTop: "30px", textTransform: "revert" }} >Mobile Application </h1>
          <br />
          <h4 style={{ fontFamily: "Lato", textAlign: "center", padding: "13px", textTransform: "revert", letterSpacing: "1.5px" }}>
            The software is optimised for usage on smartphones increasing
            adoption and flexibility for field health force.
          </h4>
        </Col>
      </Row>
      <br /><br />

    </div>


  );

};


export default HomeScreen;