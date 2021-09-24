import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col, ListGroup, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import FormContainer from "../../components/FormContainer";
import { Search } from "../../actions/bedActions";
import HospitalAdminSideNav from "./HospitalAdminSideNav";


const HASearchBedsScreen = ({ location, history }) => {
  const [facilityId, setFacilityId] = useState("");

  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);


  const dispatch = useDispatch();

  const bedSearch = useSelector((state) => state.bedSearch);
  const { loading, error, response } = bedSearch;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    }
  }, [history, response]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(Search(facilityId));
  };
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


      <Row >
        <Col sm={3}><HospitalAdminSideNav /></Col>
        <Col sm={8} >
          <Row>
            {/* <Col sm={1}> <img src={logo} width="200" height="90" ></img></Col> */}
            <Col sm={12}><h1 style={{ fontFamily: "arial", textAlign: "center", color: "#007c7a", fontSize: "40px", paddingLeft: "-50px", paddingTop: "60px" }}>Search Facility beds</h1> </Col>
          </Row>
          <hr
            style={{
              color: "white",
              backgroundColor: "#007c7a",
              height: 2,
            }}
          />
          <br />
          <Row><Col sm={3} ></Col>
            <Col sm={5} >  {error && <Message variant="danger">{error}</Message>}
              {response && <Message variant="success">{response["message"]}</Message>}
              {loading && <Loader />} </Col>
            <Col sm={3} ></Col></Row>
          <Row>

            <Col sm={1}></Col>
            <Col sm={9} style={{ paddingLeft: "1px" }}>

              <FormContainer>
                <h5 style={{ fontFamily: "Lato", color: "#008A77", paddingLeft: "60px", paddingTop: "30px", textTransform: "revert", letterSpacing: "1.5px" }}>Select Facility Name</h5>
                <Form onSubmit={submitHandler}>

                  <Form.Group controlId="facilityId">
                    <Form.Label style={{ color: "#008A77", fontWeight: "bold" }}></Form.Label>
                    <br />
                    <select className="form-control" value={facilityId} style={{ borderRadius: "20px", borderWidth: "1px", borderColor: "#007c7a", borderStyle: "solid", color: "#007c7a", outline: "#913163" }} name="facilityId" onChange={(e) => setFacilityId(e.target.value)}>
                      <option >SELECT</option>
                      <option value="1">
                        New York City National Hospital  </option>
                      <option value="2">Trablice National Hospital</option>
                      <option value="3">Gelang National Hospital</option>
                      <option value="4">Ararat National Hospital</option>
                      <option value="5">Fengcun National Hospital</option>
                      <option value="6">Paarl National Hospital</option>
                      <option value="12">Cibungur National Hospital</option>
                    </select>
                  </Form.Group>

                  <Row>
                    <Col sm={2}></Col>
                    <Col style={{ paddingTop: "22px" }}>
                      <button class="button button1" type="submit" >SEARCH</button>
                    </Col>
                  </Row>
                </Form>
              </FormContainer>

            </Col>
            <Col></Col>
          </Row>

        </Col>
        <Col sm={1} ></Col>
      </Row>
      <>  {response ? (
        <><Row>
          <Col sm={3}></Col>



          <Col sm={8}>

            <hr
              style={{
                color: "white",
                backgroundColor: "#007c7a",
                height: 2,
              }} />
            <Row>

              <br />   <br />


            </Row></Col>
          <Col sm={3}> </Col>

        </Row><Row>

            <Col sm={3}></Col>
            <Col sm={4} style={{paddingLeft:"100px"}}>
              <br />
              
              <br /> <br />
              <div style={{ paddingLeft: "10px" }}>
                <Card style={{ width: '15rem', borderColor: "#007c7a", borderRadius: "20px", borderWidth: "2px" }}>
                  <Card.Header style={{ textAlign: "center", fontFamily: "Lato", textTransform: "revert", fontWeight: "bold", color: "#007c7a", fontSize: "18px" }}>Covid Ward</Card.Header>
                  <Card.Body>
                    <Card.Title style={{ textAlign: "center", fontFamily: "Lato", textTransform: "revert", fontWeight: "bold" }}>Bed capatity {response["results"]["CovidWardCapacity"]}</Card.Title>
                    <div style={{ paddingLeft: "44px" }}>
                      <form onSubmit={handleSubmit1}>
                        <button class="button button4" type="submit">More</button>
                      </form>
                    </div>
                    <> {show1 ? (<ListGroup className="list-group-flush">

                      {Array.from({ length: response["results"]["CovidBed"].length }).map(
                        (_, i) => (

                          <>  {response["results"]["CovidBed"][`${i}`]["IsOccupied"] == 1 ? (<ListGroup.Item style={{ color: "red", textAlign: "center" }}>{response["results"]["CovidBed"][`${i}`]["BedID"]}    {response["results"]["CovidBed"][`${i}`]["IsOccupied"] == 1 ? ("Occupied") : ("Not Occupied")}</ListGroup.Item>) : (<ListGroup.Item style={{ color: "green", textAlign: "center" }}>{response["results"]["CovidBed"][`${i}`]["BedID"]} {response["results"]["CovidBed"][`${i}`]["IsOccupied"] == 1 ? ("Occupied") : ("Not Occupied")}</ListGroup.Item>)} </>

                        )
                      )}

                    </ListGroup>


                    ) : (null)}</>
                  </Card.Body>
                </Card></div> </Col>
            <Col sm={4} style={{}}>
              <div style={{ paddingTop: "5px" }}>
                <br />

                <br /> <br />
                <Card style={{ width: '15rem', borderColor: "#007c7a", borderRadius: "20px", borderWidth: "2px" }}>
                  <Card.Header style={{ textAlign: "center", fontFamily: "Lato", textTransform: "revert", fontWeight: "bold", color: "#007c7a", fontSize: "18px" }}>Normal Ward</Card.Header>
                  <Card.Body>
                    <Card.Title style={{ textAlign: "center", fontFamily: "Lato", textTransform: "revert", fontWeight: "bold" }}>Bed capatity {response["results"]["NormalWardCapacity"]}</Card.Title>
                    <div style={{ paddingLeft: "44px" }}>
                      <form onSubmit={handleSubmit2}>
                        <button class="button button4" type="submit">More</button>
                      </form>
                    </div>
                    <> {show2 ? (<ListGroup className="list-group-flush">

                      {Array.from({ length: response["results"]["NormalBed"].length }).map(
                        (_, i) => (


                          <>  {response["results"]["NormalBed"][`${i}`]["IsOccupied"] == 1 ? (<ListGroup.Item style={{ color: "red", textAlign: "center" }}>{response["results"]["NormalBed"][`${i}`]["BedID"]}    {response["results"]["NormalBed"][`${i}`]["IsOccupied"] == 1 ? ("Occupied") : ("Not Occupied")}</ListGroup.Item>) : (<ListGroup.Item style={{ color: "green", textAlign: "center" }}>{response["results"]["NormalBed"][`${i}`]["BedID"]} {response["results"]["NormalBed"][`${i}`]["IsOccupied"] == 1 ? ("Occupied") : ("Not Occupied")}</ListGroup.Item>)} </>

                        )
                      )}

                    </ListGroup>) : (null)}</>




                  </Card.Body>
                </Card>
                <br/> <br/>
              </div>
            </Col>
            <br /> <Col sm={1}> </Col>
          </Row></>
      ) : (null)}</>

    </div>
  );
};

export default HASearchBedsScreen;
