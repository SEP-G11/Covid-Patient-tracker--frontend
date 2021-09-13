import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import FormContainer from "../../components/FormContainer";
import { Search } from "../../actions/bedActions";
import HospitalAdminSideNav from "./HospitalAdminSideNav";


const HASearchBedsScreen = ({ location, history }) => {
  const [facilityId, setFacilityId] = useState("");


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

  return (
    <div>
      <HospitalAdminSideNav />
      <Row>
        <Col></Col>
        <Col xs={6}>
          <FormContainer>
            <h1>SEARCH BEDS</h1>
            {error && <Message variant="danger">{error}</Message>}
            {response && (
              <Message variant="success">{response["message"]}</Message>
            )}
            <Row>
              <Col>
                {" "}
                <Form onSubmit={submitHandler}>
                  <Form.Group controlId="facilityId">
                    <Form.Label>Facility Name</Form.Label>

                    <br />
                    <select onChange={(e) => setFacilityId(e.target.value)}>
                      <option>select </option>
                      <option value="1">
                        New York City National Hospital{" "}
                      </option>
                      <option value="2">Trablice National Hospital</option>
                      <option value="3">Gelang National Hospital</option>
                      <option value="4">Ararat National Hospital</option>
                      <option value="5">Fengcun National Hospital</option>
                      <option value="6">Paarl National Hospital</option>
                      <option value="12">Cibungur National Hospital</option>
                   
                    </select>
                  </Form.Group>

                  <Button
                    type="submit"
                    style={{
                      color: "white",
                      background: "#007c7a",
                      marginBottom: "50px",
                    }}
                  >
                    FIND
                  </Button>
                </Form>
              </Col>
              <Col>{loading && <Loader />}</Col>
            </Row>
          </FormContainer>

          {response ? (
            <div>
             <hr
             style={{
               color: "white",
               backgroundColor: "#007c7a",
               height: 5,
             }}
           />
            <Table responsive>
             
              <thead>
                <tr>
                  <th colSpan="2">
                    Hospital ID :{response["results"]["0"]["FacilityId"]}{" "}
                  </th>
                </tr>
              </thead>
              <thead>
                <tr>
                  <th colSpan="2">
                    Hospital Name :{response["results"]["0"]["FacilityName"]}
                  </th>
                </tr>
              </thead>

              <thead>
                <tr>
                  <th colSpan="2">
                    Contact NO :{response["results"]["0"]["Contactnumber"]}
                  </th>
                </tr>
                </thead>
                
              <thead>
                <tr>
                  <th colSpan="2">
                    COVID WARD [ Capacity :
                    {response["results"]["0"]["Capacity"]}]
                  </th>
                  <th colSpan="2">
                    NORMAL WARD [Capacity :
                    {response["results"]["0"]["Capacity"]}]
                  </th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <th>BED ID</th>
                  <th>WARD ID</th>
                  <th>WARD TYPE</th>
                  <th>IS OCCUPIED</th>
                </tr>
                {Array.from({ length: response["results"].length }).map(
                  (_, i) => (
                    <tr>
                      <td>{response["results"][`${i}`]["BedID"]} </td>
                      <td>{response["results"][`${i}`]["WardID"]} </td>
                      <td>{response["results"][`${i}`]["WardType"]} </td>
                      <td>{response["results"][`${i}`]["IsOccupied"]} </td>
                    </tr>
                  )
                )}
              </tbody>
            </Table> </div>
          ) : null}
        </Col>
        <Col></Col>
      </Row>

    
    </div>
  );
};

export default HASearchBedsScreen;
