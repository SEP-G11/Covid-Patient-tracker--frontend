import {
    PATIENT_LIST_REQUEST,
    PATIENT_LIST_SUCCESS,
    PATIENT_LIST_FAIL,
    PATIENT_DETAILS_REQUEST,
    PATIENT_DETAILS_SUCCESS,
    PATIENT_DETAILS_FAIL,
    PATIENT_UPDATE_REQUEST,
    PATIENT_UPDATE_SUCCESS,
    PATIENT_UPDATE_FAIL,
    PATIENT_UPDATE_RESET,
    PATIENT_REPORT_REQUEST,
    PATIENT_REPORT_SUCCESS,
    PATIENT_REPORT_FAIL,
    REPORT_UPDATE_REQUEST,
    REPORT_UPDATE_SUCCESS,
    REPORT_UPDATE_FAIL,
    REPORT_UPDATE_RESET
} from '../constants/patientConstants'

export const patientListReducer = (state = { patients: [] }, action) => {
    switch (action.type) {
      case PATIENT_LIST_REQUEST:
        return {
          loading: true,
        }
      case PATIENT_LIST_SUCCESS:
        return {
          loading: false,
          patients: action.payload,
        }
      case PATIENT_LIST_FAIL:
        return {
          loading: false,
          error: action.payload,
        }
      default:
        return state
    }
}

export const patientDetailsReducer = (state = { patient: {} }, action) => {
  switch (action.type) {
    case PATIENT_DETAILS_REQUEST:
      return { 
        loading: true,
      }
    case PATIENT_DETAILS_SUCCESS:
      return {
        loading: false,
        patient: action.payload,
      }
    case PATIENT_DETAILS_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const patientReportDetailsReducer = (state = { report: {} }, action) => {
  switch (action.type) {
    case PATIENT_REPORT_REQUEST:
      return { 
        loading: true,
      }
    case PATIENT_REPORT_SUCCESS:
      return {
        loading: false,
        report: action.payload,
      }
    case PATIENT_REPORT_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const patientUpdateReducer = (state = { patient: {} }, action) => {
  switch (action.type) {
    case PATIENT_UPDATE_REQUEST:
      return { 
        loading: true 
      }
    case PATIENT_UPDATE_SUCCESS:
      return { 
        loading: false, 
        success: true 
      }
    case PATIENT_UPDATE_FAIL:
      return { 
        loading: false, 
        error: action.payload }
    case PATIENT_UPDATE_RESET:
      return {
        patient: {},
      }
    default:
      return state
  }
}

export const patientReportUpdateReducer = (state = { report: {} }, action) => {
  switch (action.type) {
    case REPORT_UPDATE_REQUEST:
      return { 
        loading: true 
      }
    case REPORT_UPDATE_SUCCESS:
      return { 
        loading: false, 
        success: true 
      }
    case REPORT_UPDATE_FAIL:
      return { 
        loading: false, 
        error: action.payload }
    case REPORT_UPDATE_RESET:
      return {
        report: {},
      }
    default:
      return state
  }
}