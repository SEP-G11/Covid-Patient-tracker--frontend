import {
    REPORT_CREATE_REQUEST,
REPORT_CREATE_SUCCESS,
REPORT_CREATE_FAIL

} from "../constants/reportConstants";


export const reportCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case REPORT_CREATE_REQUEST:
            return { loading: true }
        case REPORT_CREATE_SUCCESS:
            return { loading: false, response: action.payload }
        case REPORT_CREATE_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

