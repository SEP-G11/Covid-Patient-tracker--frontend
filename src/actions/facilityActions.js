import axios from 'axios';
import {
    FACILITY_LIST_REQUEST,FACILITY_LIST_SUCCESS,FACILITY_LIST_FAIL
} from '../constants/facilityConstants';

export const listFacilities = () => async (dispatch) => {
    try {
        dispatch({type: FACILITY_LIST_REQUEST});

        const { data } = await axios.get(`/moh/facilities`);

        dispatch({
            type: FACILITY_LIST_SUCCESS,
            payload: data
        })
    }
    catch (error) {
        dispatch({
            type: FACILITY_LIST_FAIL,
            payload: error.response && error.response.data.message ?
                error.response.data.message :
                error.message
        })
    }
};