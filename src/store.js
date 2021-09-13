import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { userLoginReducer } from "./reducers/userReducers";
import {
  patientAdmitReducer,
  patientDischargeReducer,
  patientTransferReducer,
} from "./reducers/patientReducers";
import { bedSearchReducer } from "./reducers/bedReducers";

const reducer = combineReducers({
  userLogin: userLoginReducer,
  patientAdmit: patientAdmitReducer,
  patientDischarge: patientDischargeReducer,
  patientTransfer: patientTransferReducer,
  bedSearch: bedSearchReducer,
});

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
