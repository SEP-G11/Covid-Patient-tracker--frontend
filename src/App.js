import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Container } from "react-bootstrap";

import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";

import HospitalAdminHomeScreen from "./screens/HospitalAdmin_screens/HospitalAdminHomeScreen";
import HospitalAdminPatientList from "./screens/HospitalAdmin_screens/HospitalAdminViewPatientList";
import HospitalAdminViewPatientInfo from "./screens/HospitalAdmin_screens/HospitalAdminViewPatientInfo";
import HospitalAdminEditPatientInfo from "./screens/HospitalAdmin_screens/HospitalAdminEditPatientInfo";

import DoctorHomeScreen from "./screens/Doctor_screens/DoctorHomeScreen";
import DoctorViewPatientList from "./screens/Doctor_screens/DoctorViewPatientList";
import DoctorViewPatientInfo from "./screens/Doctor_screens/DoctorViewPatientInfo";
import DoctorEditPatientInfo from "./screens/Doctor_screens/DoctorEditPatientInfo";
import DoctorViewMedicalReport from "./screens/Doctor_screens/DoctorViewMedicalReport";
import DoctorEditMedicalReport from "./screens/Doctor_screens/DoctorEditMedicalReport";

import MOHScreen from "./screens/Moh_screens/MohHomeScreen";
import CreateAccountScreen from "./screens/Moh_screens/CreateAccountScreen";

const App = () => {
  return (
    <Router>
      <main className="py-3">
        <Container>
          <Route path="/login" component={LoginScreen} />

          <Route path="/hospitalAdmin/home" component={HospitalAdminHomeScreen}/>
          <Route path="/hospitalAdmin/patientList" component={HospitalAdminPatientList} />
          <Route path='/hospitalAdmin/viewPatientInfo/:id' component={HospitalAdminViewPatientInfo} />
          <Route path='/hospitalAdmin/editPatientInfo/:id' component={HospitalAdminEditPatientInfo} />

          <Route path="/doctor/home" component={DoctorHomeScreen} />
          <Route path="/doctor/patientList" component={DoctorViewPatientList} />
          <Route path='/doctor/viewPatientInfo/:id' component={DoctorViewPatientInfo} />
          <Route path='/doctor/editPatientInfo/:id' component={DoctorEditPatientInfo} />
          <Route path='/doctor/viewMedicalReport/:id' component={DoctorViewMedicalReport} />
          <Route path='/doctor/editMedicalReport/:id' component={DoctorEditMedicalReport} />
          <Route path="/doctor/home" component={DoctorHomeScreen} />

          <Route path="/moh/home" component={MOHScreen} />
          <Route path="/moh/register" component={CreateAccountScreen} />

          <Route path="/" component={HomeScreen} exact />
        </Container>
      </main>
    </Router>
  );
};

export default App;
