import axios from 'axios'
import {
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
    PATIENT_REPORT_REQUEST,
    PATIENT_REPORT_SUCCESS,
    PATIENT_REPORT_FAIL,
    TEST_DETAILS_REQUEST,
    TEST_DETAILS_SUCCESS,
    TEST_DETAILS_FAIL,
    REPORT_UPDATE_REQUEST,
    REPORT_UPDATE_SUCCESS,
    REPORT_UPDATE_FAIL,
    REPORT_UPDATE_RESET

} from '../constants/patientConstants'

export const listPatients = () => async (dispatch) => {
    try {
      dispatch({
        type: PATIENT_LIST_REQUEST,
      })
  
      const config = {
        headers: {
            'Content-Type': 'application/json',
        },
      }
  
      const { data } = await axios.get(`/patient/getPatients`, config)
  
      dispatch({
        type: PATIENT_LIST_SUCCESS,
        payload: data,
      })
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      dispatch({
        type: PATIENT_LIST_FAIL,
        payload: message,
      })
    }
}

export const getPatientDetails = (id) => async (dispatch) => {
  try {
    dispatch({
      type: PATIENT_DETAILS_REQUEST,
    })

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const { data } = await axios.get(`/patient/patientDetails/${id}`, config)

    dispatch({
      type: PATIENT_DETAILS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    const message =
    error.response && error.response.data.message
    ? error.response.data.message
    : error.message
    dispatch({
      type: PATIENT_DETAILS_FAIL,
      payload: message,
    })
  }
}

export const getPatientReportDetails = (id) => async (dispatch) => {
  try {
    dispatch({
      type: PATIENT_REPORT_REQUEST,
    })

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const { data } = await axios.get(`/patient/patientReportDetails/${id}`, config)

    dispatch({
      type: PATIENT_REPORT_SUCCESS,
      payload: data,
    })
  } catch (error) {
    const message =
    error.response && error.response.data.message
    ? error.response.data.message
    : error.message
    dispatch({
      type: PATIENT_REPORT_FAIL,
      payload: message,
    })
  }
}

export const getPatientTestDetails = (id) => async (dispatch) => {
  try {
    dispatch({
      type: TEST_DETAILS_REQUEST,
    })

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const { data } = await axios.get(`/patient/testDetails/${id}`, config)

    dispatch({
      type: TEST_DETAILS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    const message =
    error.response && error.response.data.message
    ? error.response.data.message
    : error.message
    dispatch({
      type: TEST_DETAILS_FAIL,
      payload: message,
    })
  }
}

export const updatePatient = (patient) => async (dispatch) => {
  try {
    dispatch({
      type: PATIENT_UPDATE_REQUEST,
    })

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const { data } = await axios.put(
      `/patient/updatePatient/${patient.patient_id}`,
      patient,
      config
    )

    dispatch({
      type: PATIENT_UPDATE_SUCCESS,
      payload: data,
    })
    dispatch({ type: PATIENT_UPDATE_SUCCESS, payload: data })
  } catch (error) {
    const message =
      error.response && error.response.data.message
      ? error.response.data.message
      : error.message
    dispatch({
      type: PATIENT_UPDATE_FAIL,
      payload: message,
    })
  }
}

export const updatePatientReport = (report) => async (dispatch) => {
  try {
    dispatch({
      type: REPORT_UPDATE_REQUEST,
    })

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const { data } = await axios.put(
      `/patient/updatePatientReport/${report.patient_id}`,
      report,
      config
    )

    dispatch({
      type: REPORT_UPDATE_SUCCESS,
      payload: data,
    })
    dispatch({ type: REPORT_UPDATE_SUCCESS, payload: data })
  } catch (error) {
    const message =
      error.response && error.response.data.message
      ? error.response.data.message
      : error.message
    dispatch({
      type: REPORT_UPDATE_FAIL,
      payload: message,
    })
  }
}
  
  