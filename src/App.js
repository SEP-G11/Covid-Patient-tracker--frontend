import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import HospitalAdminHomeScreen from "./screens/HospitalAdmin_screens/HospitalAdminHomeScreen";
import DoctorHomeScreen from "./screens/Doctor_screens/DoctorHomeScreen";
import MOHScreen from "./screens/Moh_screens/MohHomeScreen";
import PublicDashboardScreen from "./screens/PublicDashboardScreen";
import CreateAccountScreen from "./screens/Moh_screens/CreateAccountScreen";
import ForgotPasswordScreen from './screens/ForgotPasswordScreen';
import ResetPasswordScreen from './screens/ResetPasswordScreen';
import UserProfileScreen from './screens/UserProfileScreen';

const App = () => {
  return (
    <Router>
      <main className="py-3">
        <Container fluid>
          <Route path="/login" component={LoginScreen} />
          <Route
            path="/hospitalAdmin/home"
            component={HospitalAdminHomeScreen}
          />
          <Route path="/doctor/home" component={DoctorHomeScreen} />
          <Route path="/moh/home" component={MOHScreen} />
          <Route path="/moh/register" component={CreateAccountScreen} />
          <Route path="/dashboard" component={PublicDashboardScreen} exact />
          <Route path="/forgot-password" component={ForgotPasswordScreen} exact/>
          <Route path="/reset-password/:token" component={ResetPasswordScreen}/>
          <Route path="/profile" component={UserProfileScreen} />
          <Route path="/" component={HomeScreen} exact />
        </Container>
      </main>
    </Router>
  );
};

export default App;
