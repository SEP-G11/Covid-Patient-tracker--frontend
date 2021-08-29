import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import HospitalAdminHomeScreen from "./screens/HospitalAdmin_screens/HospitalAdminHomeScreen";
import DoctorHomeScreen from "./screens/Doctor_screens/DoctorHomeScreen";
import MOHScreen from "./screens/Moh_screens/MohHomeScreen";

const App = () => {
  return (
    <Router>
      <main className="py-3">
        <Container>
          <Route path="/login" component={LoginScreen} />
          <Route
            path="/hospitalAdmin/home"
            component={HospitalAdminHomeScreen}
          />
          <Route path="/doctor/home" component={DoctorHomeScreen} />
          <Route path="/moh/home" component={MOHScreen} />

          <Route path="/" component={HomeScreen} exact />
        </Container>
      </main>
    </Router>
  );
};

export default App;
