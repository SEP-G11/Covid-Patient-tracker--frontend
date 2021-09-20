import {
    TEST_ENTER_REQUEST,
    TEST_ENTER_SUCCESS,
    TEST_ENTER_FAIL
} from "../constants/testConstants";


export const testEnterReducer = (state = {}, action) => {
    switch (action.type) {
        case TEST_ENTER_REQUEST:
            return { loading: true }
        case TEST_ENTER_SUCCESS:
            return { loading: false, response: action.payload }
        case TEST_ENTER_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

