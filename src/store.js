import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { userLoginReducer, userRegisterReducer,userForgotPasswordReducer,userResetPasswordReducer,userDetailsReducer,userUpdateProfileReducer } from "./reducers/userReducers";
import {
  patientAdmitReducer,
  patientDischargeReducer,
  patientTransferReducer,
  patientListReducer,
  patientDetailsReducer,
  patientUpdateReducer,
  filterPatientsReducer,
} from "./reducers/patientReducers";
import { bedSearchReducer ,bedLoadReducer } from "./reducers/bedReducers";
import { testEnterReducer, patientTestDetailsReducer } from "./reducers/testReducers";
import { reportCreateReducer, patientReportDetailsReducer, reportUpdateReducer } from "./reducers/reportReducers";
import { getFacilityReducer,facilityListReducer,facilitiesActiveReducer,facilitiesRecoveredReducer,facilitiesDeathsReducer,facilitiesBedsReducer } from "./reducers/facilityReducers";




const reducer = combineReducers({
  userLogin: userLoginReducer,
  patientAdmit: patientAdmitReducer,
  patientDischarge: patientDischargeReducer,
  patientTransfer: patientTransferReducer,
  patientList: patientListReducer,
  patientDetails: patientDetailsReducer,
  patientUpdate: patientUpdateReducer,
  filteredPatients: filterPatientsReducer,
  bedSearch: bedSearchReducer,
  bedLoad : bedLoadReducer,
  testEnter:testEnterReducer,
  reportCreate :reportCreateReducer,
  facilityLoad: getFacilityReducer,
  patientReportDetails: patientReportDetailsReducer,
  patientTestDetails: patientTestDetailsReducer,
  patientReportUpdate: reportUpdateReducer,
  userRegister: userRegisterReducer,
  facilityList: facilityListReducer,
  facilitiesActive:facilitiesActiveReducer,
  facilitiesRecovered:facilitiesRecoveredReducer,
  facilitiesDeaths:facilitiesDeathsReducer,
  facilitiesBeds:facilitiesBedsReducer,
  userForgotPassword:userForgotPasswordReducer,
  userResetPassword:userResetPasswordReducer,
  userDetails:userDetailsReducer,
  userUpdateProfile:userUpdateProfileReducer
});


const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

  const bedInfoFromStorage = localStorage.getItem("bedInfo")
  ? JSON.parse(localStorage.getItem("bedInfo"))
  : null;

  
  const facilityInfoFromStorage = localStorage.getItem("facilityInfo")
  ? JSON.parse(localStorage.getItem("facilityInfo"))
  : null;


const initialState = {  
  userLogin: { userInfo: userInfoFromStorage },
  bedLoad: { bedInfo: bedInfoFromStorage },
  facilityLoad: { facilityInfo: facilityInfoFromStorage },
};


const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
