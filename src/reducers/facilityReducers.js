import {
    FACILITY_GET_REQUEST,FACILITY_GET_SUCCESS,FACILITY_GET_FAIL,
    FACILITY_LIST_REQUEST,FACILITY_LIST_SUCCESS,FACILITY_LIST_FAIL,
    FACILITY_ACTIVE_REQUEST,FACILITY_ACTIVE_SUCCESS,FACILITY_ACTIVE_FAIL,
    FACILITY_RECOVERED_REQUEST,FACILITY_RECOVERED_SUCCESS,FACILITY_RECOVERED_FAIL,
    FACILITY_DEATHS_REQUEST,FACILITY_DEATHS_SUCCESS,FACILITY_DEATHS_FAIL,
    FACILITY_BEDS_REQUEST,FACILITY_BEDS_SUCCESS,FACILITY_BEDS_FAIL
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
    
export const facilityListReducer = (state = { facilitiesList: {results:[],message:''} }, action) => {
    switch (action.type) {
        case FACILITY_LIST_REQUEST:
            return { loading: true, facilitiesList: {results:[],message:''} };
        case FACILITY_LIST_SUCCESS:
            return { loading: false, facilitiesList: action.payload};
        case FACILITY_LIST_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const facilitiesActiveReducer = (state = { facilitiesActiveList: {results:[],message:''} }, action) => {
    switch (action.type) {
        case FACILITY_ACTIVE_REQUEST:
            return { loading: true, facilitiesActiveList: {results:[],message:''} };
        case FACILITY_ACTIVE_SUCCESS:
            return { loading: false, facilitiesActiveList: action.payload};
        case FACILITY_ACTIVE_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const facilitiesRecoveredReducer = (state = { facilitiesRecoveredList: {results:[],message:''} }, action) => {
    switch (action.type) {
        case FACILITY_RECOVERED_REQUEST:
            return { loading: true, facilitiesRecoveredList: {results:[],message:''} };
        case FACILITY_RECOVERED_SUCCESS:
            return { loading: false, facilitiesRecoveredList: action.payload};
        case FACILITY_RECOVERED_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const facilitiesDeathsReducer = (state = { facilitiesDeathsList: {results:[],message:''} }, action) => {
    switch (action.type) {
        case FACILITY_DEATHS_REQUEST:
            return { loading: true, facilitiesDeathsList: {results:[],message:''} };
        case FACILITY_DEATHS_SUCCESS:
            return { loading: false, facilitiesDeathsList: action.payload};
        case FACILITY_DEATHS_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const facilitiesBedsReducer = (state = { facilitiesBedsList: {results:[],message:''} }, action) => {
    switch (action.type) {
        case FACILITY_BEDS_REQUEST:
            return { loading: true, facilitiesBedsList: {results:[],message:''} };
        case FACILITY_BEDS_SUCCESS:
            return { loading: false, facilitiesBedsList: action.payload};
        case FACILITY_BEDS_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};
