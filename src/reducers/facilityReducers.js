import {
    FACILITY_LIST_REQUEST,FACILITY_LIST_SUCCESS,FACILITY_LIST_FAIL
} from '../constants/facilityConstants';

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