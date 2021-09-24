import {
    REPORT_CREATE_REQUEST,
    REPORT_CREATE_SUCCESS,
    REPORT_CREATE_FAIL,
    PATIENT_REPORT_REQUEST,
    PATIENT_REPORT_SUCCESS,
    PATIENT_REPORT_FAIL,
    REPORT_UPDATE_REQUEST,
    REPORT_UPDATE_SUCCESS,
    REPORT_UPDATE_FAIL,
    REPORT_UPDATE_RESET

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

export const patientReportDetailsReducer = (state = { report: {} }, action) => {
    switch (action.type) {
      case PATIENT_REPORT_REQUEST:
        return { loading: true }
      case PATIENT_REPORT_SUCCESS:
        return { loading: false , report:action.payload, ward:action.payload  }
      case PATIENT_REPORT_FAIL:
        return { loading: false, error: action.payload }
      default:
        return state
    }
  }

  export const reportUpdateReducer = (state = { report: {} }, action) => {
    switch (action.type) {
      case REPORT_UPDATE_REQUEST:
        return { loading: true }
      case REPORT_UPDATE_SUCCESS:
        return { loading: false , response:action.payload  }
      case REPORT_UPDATE_FAIL:
        return { loading: false, error: action.payload }
      case REPORT_UPDATE_RESET:
          return {
            report: {},
          }
      default:
        return state
    }
  }

