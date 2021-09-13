import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import {
  userLoginReducer, userRegisterReducer
} from './reducers/userReducers'

import {
  patientListReducer, patientDetailsReducer, patientReportDetailsReducer, patientUpdateReducer, patientReportUpdateReducer
} from './reducers/patientReducers'



const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  patientList: patientListReducer,
  patientDetails: patientDetailsReducer,
  patientReportDetails: patientReportDetailsReducer,
  patientUpdate: patientUpdateReducer,
  patientReportUpdate: patientReportUpdateReducer,
})


const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null

const initialState = {  
  userLogin: { userInfo: userInfoFromStorage },
}

const middleware = [thunk]

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
