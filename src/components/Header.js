import React from "react";
import { Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-bootstrap";
import { Navbar, Nav, Container, img, Button } from "react-bootstrap";
import { logout } from "../actions/userActions";
import Logo from "../assets/SEP logo.png";

const Header = () => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);

  const { userInfo } = userLogin;
  console.log(userInfo["results"]["accType"]);
  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <header>
      <Navbar collapseOnSelect style={{ backgroundColor: "white" }}>
        <Container>
          <Navbar.Brand>
            {" "}
            <img width="250px" height="auto" src={Logo} />
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" alinm>
            {userInfo["results"]["accType"] === "DOC" ? (
              <Nav className="ml-auto">
                <Nav.Link href="/doctor/home">Home</Nav.Link>
                <Nav.Link href="/doctor/admit">Admit </Nav.Link>
                <Nav.Link href="/">View Patient</Nav.Link>
                <Nav.Link href="/">Update Patient</Nav.Link>
                <Nav.Link href="/doctor/discharge">Discharge</Nav.Link>
                <Nav.Link href="/doctor/transfer">Transfer </Nav.Link>
                <Nav.Link href="/doctor/search">Search Beds </Nav.Link>

                <Button
                  type="submit"
                  style={{
                    color: "white",
                    background: "#007c7a",
                    marginBottom: "50px",
                  }}
                  onClick={logoutHandler}
                >
                  {" "}
                  LOG OUT
                </Button>
              </Nav>
            ) : userInfo["results"]["accType"] === "MOH" ? (
              <Nav className="ml-auto">
                <Nav.Link href="moh/home">Home</Nav.Link>
                <Nav.Link href="/">Search </Nav.Link>
                <Nav.Link href="/">Register</Nav.Link>
                <Button
                  type="submit"
                  style={{
                    color: "white",
                    background: "#007c7a",
                    marginBottom: "50px",
                  }}
                  onClick={logoutHandler}
                >
                  {" "}
                  LOG OUT
                </Button>
              </Nav>
            ) : (
              <Nav className="ml-auto">
                <Nav.Link href="/hospitalAdmin/home">Home</Nav.Link>
                <Nav.Link href="/hospitalAdmin/admit">Admit </Nav.Link>
                <Nav.Link href="/">View Patient</Nav.Link>
                <Nav.Link href="/">Update Patient</Nav.Link>
                <Nav.Link href="/hospitalAdmin/discharge">Discharge</Nav.Link>
                <Nav.Link href="/hospitalAdmin/transfer">Transfer </Nav.Link>
                <Nav.Link href="/hospitalAdmin/search">Search Beds</Nav.Link>
                <Button
                  type="submit"
                  style={{
                    color: "white",
                    background: "#007c7a",
                    marginBottom: "50px",
                  }}
                  onClick={logoutHandler}
                >
                  {" "}
                  LOG OUT
                </Button>
              </Nav>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
