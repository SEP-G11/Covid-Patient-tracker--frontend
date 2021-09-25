import {
  PATIENT_ADMIT_REQUEST,
  PATIENT_ADMIT_SUCCESS,
  PATIENT_ADMIT_FAIL,
  PATIENT_DISCHARGE_REQUEST,
  PATIENT_DISCHARGE_SUCCESS,
  PATIENT_DISCHARGE_FAIL,
  PATIENT_TRANSFER_REQUEST,
  PATIENT_TRANSFER_SUCCESS,
  PATIENT_TRANSFER_FAIL,
  PATIENT_LIST_FAIL,
  PATIENT_LIST_SUCCESS,
  PATIENT_LIST_REQUEST,
  PATIENT_DETAILS_REQUEST,
  PATIENT_DETAILS_SUCCESS,
  PATIENT_DETAILS_FAIL,
  PATIENT_UPDATE_REQUEST,
  PATIENT_UPDATE_SUCCESS,
  PATIENT_UPDATE_FAIL,
  PATIENT_UPDATE_RESET,
} from "../constants/patientConstants";


  
  export const patientAdmitReducer = (state = {}, action) => {
    switch (action.type) {
      case PATIENT_ADMIT_REQUEST:
        return { loading: true }
      case PATIENT_ADMIT_SUCCESS:
        return { loading: false , response:action.payload  }
      case PATIENT_ADMIT_FAIL:
        return { loading: false, error: action.payload }
      default:
        return state
    }
  }
  

  export const patientDischargeReducer = (state = {}, action) => {
    switch (action.type) {
      case PATIENT_DISCHARGE_REQUEST:
        return { loading: true }
      case PATIENT_DISCHARGE_SUCCESS:
        return { loading: false , response:action.payload  }
      case PATIENT_DISCHARGE_FAIL:
        return { loading: false, error: action.payload }
      default:
        return state
    }
}
  


export const patientTransferReducer = (state = {}, action) => {
  switch (action.type) {
    case PATIENT_TRANSFER_REQUEST:
      return { loading: true }
    case PATIENT_TRANSFER_SUCCESS:
      return { loading: false , response:action.payload  }
    case PATIENT_TRANSFER_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const patientListReducer = (state = { patients: [] }, action) => {
  switch (action.type) {
    case PATIENT_LIST_REQUEST:
      return { loading: true }
    case PATIENT_LIST_SUCCESS:
      return { loading: false , patients:action.payload  }
    case PATIENT_LIST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const patientDetailsReducer = (state = { patient: {} }, action) => {
  switch (action.type) {
    case PATIENT_DETAILS_REQUEST:
      return { loading: true }
    case PATIENT_DETAILS_SUCCESS:
      return { loading: false , patient:action.payload  }
    case PATIENT_DETAILS_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const patientUpdateReducer = (state = { patient: {} }, action) => {
  switch (action.type) {
    case PATIENT_UPDATE_REQUEST:
      return { loading: true }
    case PATIENT_UPDATE_SUCCESS:
      return { loading: false ,  success: true   }
    case PATIENT_UPDATE_FAIL:
      return { loading: false, error: action.payload }
    case PATIENT_UPDATE_RESET:
      return {
        patient: {},
      }
    default:
      return state
  }
}




  