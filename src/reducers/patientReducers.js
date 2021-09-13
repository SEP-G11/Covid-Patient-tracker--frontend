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

  