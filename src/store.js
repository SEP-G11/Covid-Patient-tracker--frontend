import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import {
  userLoginReducer, userRegisterReducer,userForgotPasswordReducer,userResetPasswordReducer
} from './reducers/userReducers'
import {
  facilityListReducer,facilitiesActiveReducer,facilitiesRecoveredReducer,facilitiesDeathsReducer,facilitiesBedsReducer
} from './reducers/facilityReducers'

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  facilityList: facilityListReducer,
  facilitiesActive:facilitiesActiveReducer,
  facilitiesRecovered:facilitiesRecoveredReducer,
  facilitiesDeaths:facilitiesDeathsReducer,
  facilitiesBeds:facilitiesBedsReducer,
  userForgotPassword:userForgotPasswordReducer,
  userResetPassword:userResetPasswordReducer
});


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
