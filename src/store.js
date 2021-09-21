import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { userLoginReducer } from "./reducers/userReducers";
import {
  patientAdmitReducer,
  patientDischargeReducer,
  patientTransferReducer,
} from "./reducers/patientReducers";
import { bedSearchReducer ,bedLoadReducer } from "./reducers/bedReducers";
import { testEnterReducer } from "./reducers/testReducers";
import { reportCreateReducer } from "./reducers/reportReducers";
import { getFacilityReducer } from "./reducers/facilityReducers";




const reducer = combineReducers({
  userLogin: userLoginReducer,
  patientAdmit: patientAdmitReducer,
  patientDischarge: patientDischargeReducer,
  patientTransfer: patientTransferReducer,
  bedSearch: bedSearchReducer,
  bedLoad : bedLoadReducer,
  testEnter:testEnterReducer,
 reportCreate :reportCreateReducer,
 facilityLoad: getFacilityReducer
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
  applyMiddleware(...middleware)
);

export default store;
