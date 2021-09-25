import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";

import HospitalAdminHomeScreen from "./screens/HospitalAdmin_screens/HospitalAdminHomeScreen";
import HAAdmitPatientScreen from "./screens/HospitalAdmin_screens/HAAdmitPatientScreen";
import HADischargePatientScreen from "./screens/HospitalAdmin_screens/HADischargePatientScreen";
import HATransferPatientScreen from "./screens/HospitalAdmin_screens/HATransferPatientScreen";
import HASearchBedsScreen from "./screens/HospitalAdmin_screens/HASearchBedsScreen";
import HAEnterResultScreen from "./screens/HospitalAdmin_screens/HAEnterResultScreen";
import HAViewPatientList from "./screens/HospitalAdmin_screens/HAViewPatientList";
import HAViewPatientInfo from "./screens/HospitalAdmin_screens/HAViewPatientInfo";
import HAEditPatientInfo from "./screens/HospitalAdmin_screens/HAEditPatientInfo";


import DoctorHomeScreen from "./screens/Doctor_screens/DoctorHomeScreen";
import DoctorAdmitPatientScreen from "./screens/Doctor_screens/DoctorAdmitPatientScreen";
import DoctorTransferPatientScreen from "./screens/Doctor_screens/DoctorTransferPatientScreen";
import DoctorDischargePatientScreen from "./screens/Doctor_screens/DoctorDischargePatientScreen";
import DoctorSearchBedsScreen from "./screens/Doctor_screens/DoctorSearchBedsScreen";
import DoctorEnterResultScreen from "./screens/Doctor_screens/DoctorEnterResultScreen";
import DoctorCreateReportScreen from "./screens/Doctor_screens/DoctorCreateReportScreen";
import DoctorViewPatientList from "./screens/Doctor_screens/DoctorViewPatientList";
import DoctorViewPatientInfo from "./screens/Doctor_screens/DoctorViewPatientInfo";
import DoctorEditPatientInfo from "./screens/Doctor_screens/DoctorEditPatientInfo";
import DoctorViewMedicalReport from "./screens/Doctor_screens/DoctorViewMedicalReport";
import DoctorEditMedicalReport from "./screens/Doctor_screens/DoctorEditMedicalReport";


import MOHScreen from "./screens/Moh_screens/MohHomeScreen";
import PublicDashboardScreen from "./screens/PublicDashboardScreen";
import CreateAccountScreen from "./screens/Moh_screens/CreateAccountScreen";
import ForgotPasswordScreen from './screens/ForgotPasswordScreen';
import ResetPasswordScreen from './screens/ResetPasswordScreen';
import UserProfileScreen from './screens/UserProfileScreen';

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
        <Route path="/hospitalAdmin/enter" component={HAEnterResultScreen} />
        <Route path="/hospitalAdmin/patientList" component={HAViewPatientList} />
        <Route path='/hospitalAdmin/viewPatientInfo/:id' component={HAViewPatientInfo} />
        <Route path='/hospitalAdmin/editPatientInfo/:id' component={HAEditPatientInfo} />
        
        <Route path="/doctor/home" component={DoctorHomeScreen} />
        <Route path="/doctor/admit" component={DoctorAdmitPatientScreen} />
        <Route path="/doctor/discharge" component={DoctorDischargePatientScreen} />
        <Route path="/doctor/transfer" component={DoctorTransferPatientScreen} />
        <Route path="/doctor/search" component={DoctorSearchBedsScreen} />
        <Route path="/doctor/enter" component={DoctorEnterResultScreen} />
        <Route path="/doctor/createReport" component={DoctorCreateReportScreen} />
        <Route path="/doctor/patientList" component={DoctorViewPatientList} />
        <Route path='/doctor/viewPatientInfo/:id' component={DoctorViewPatientInfo} />
        <Route path='/doctor/editPatientInfo/:id' component={DoctorEditPatientInfo} />
        <Route path='/doctor/viewMedicalReport/:id' component={DoctorViewMedicalReport} />
        <Route path='/doctor/editMedicalReport/:id' component={DoctorEditMedicalReport} />
        
        
        <Route path="/moh/home" component={MOHScreen} />
        <Route path="/moh/register" component={CreateAccountScreen} />
        <Route path="/dashboard" component={PublicDashboardScreen} exact />
        <Route path="/forgot-password" component={ForgotPasswordScreen} exact/>
        <Route path="/reset-password/:token" component={ResetPasswordScreen}/>
        <Route path="/profile" component={UserProfileScreen} />
      </main>
    </Router>
  );
};

export default App;
