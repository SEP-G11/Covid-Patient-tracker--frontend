import {
    TEST_ENTER_REQUEST,
    TEST_ENTER_SUCCESS,
    TEST_ENTER_FAIL,
    TEST_DETAILS_REQUEST,
    TEST_DETAILS_SUCCESS,
    TEST_DETAILS_FAIL,

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

export const patientTestDetailsReducer = (state = { tests: [] }, action) => {
    switch (action.type) {
      case TEST_DETAILS_REQUEST:
        return { loading: true }
      case TEST_DETAILS_SUCCESS:
        return { loading: false , tests:action.payload  }
      case TEST_DETAILS_FAIL:
        return { loading: false, error: action.payload }
      default:
        return state
    }
  }

