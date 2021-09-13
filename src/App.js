import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";

import HospitalAdminHomeScreen from "./screens/HospitalAdmin_screens/HospitalAdminHomeScreen";
import HAAdmitPatientScreen from "./screens/HospitalAdmin_screens/HAAdmitPatientScreen";
import HADischargePatientScreen from "./screens/HospitalAdmin_screens/HADischargePatientScreen";
import HATransferPatientScreen from "./screens/HospitalAdmin_screens/HATransferPatientScreen";
import HASearchBedsScreen from "./screens/HospitalAdmin_screens/HASearchBedsScreen";

import DoctorHomeScreen from "./screens/Doctor_screens/DoctorHomeScreen";
import DoctorAdmitPatientScreen from "./screens/Doctor_screens/DoctorAdmitPatientScreen";
import DoctorTransferPatientScreen from "./screens/Doctor_screens/DoctorTransferPatientScreen";
import DoctorDischargePatientScreen from "./screens/Doctor_screens/DoctorDischargePatientScreen";
import DoctorSearchBedsScreen from "./screens/Doctor_screens/DoctorSearchBedsScreen";


import MOHScreen from "./screens/Moh_screens/MohHomeScreen";

const App = () => {
  return (
    <Router>
      <main style={{ "overflow-x": "hidden" }}>
        <Route path="/login" component={LoginScreen} />
        <Route path="/" component={HomeScreen} exact />
        <Route path="/hospitalAdmin/home" component={HospitalAdminHomeScreen} />
        <Route path="/hospitalAdmin/admit" component={HAAdmitPatientScreen} />
        <Route path="/hospitalAdmin/discharge" component={HADischargePatientScreen} />
        <Route path="/hospitalAdmin/transfer" component={HATransferPatientScreen} />
        <Route path="/hospitalAdmin/search" component={HASearchBedsScreen} />
        
        <Route path="/doctor/home" component={DoctorHomeScreen} />
        <Route path="/doctor/admit" component={DoctorAdmitPatientScreen} />
        <Route path="/doctor/discharge" component={DoctorDischargePatientScreen} />
        <Route path="/doctor/transfer" component={DoctorTransferPatientScreen} />
        <Route path="/doctor/search" component={DoctorSearchBedsScreen} />
        
        <Route path="/moh/home" component={MOHScreen} />
      </main>
    </Router>
  );
};

export default App;
