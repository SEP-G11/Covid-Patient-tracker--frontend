import {
    FACILITY_GET_REQUEST,
    FACILITY_GET_SUCCESS,
    FACILITY_GET_FAIL,
  } from "../constants/facilityConstants";
  
      
    export const getFacilityReducer = (state = {}, action) => {
      switch (action.type) {
        case FACILITY_GET_REQUEST:
          return { loading: true }
        case FACILITY_GET_SUCCESS:
          return { loading: false , facilityInfo:action.payload  }
        case FACILITY_GET_FAIL:
          return { loading: false, error: action.payload }
        default:
          return state
      }
    }