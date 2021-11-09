import axios from "axios";
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
  PATIENT_FILTER_REQUEST,
  PATIENT_FILTER_FAIL,
  PATIENT_FILTER_SUCCESS,
  PATIENT_DETAILS_REQUEST,
  PATIENT_DETAILS_SUCCESS,
  PATIENT_DETAILS_FAIL,
  PATIENT_UPDATE_REQUEST,
  PATIENT_UPDATE_SUCCESS,
  PATIENT_UPDATE_FAIL,
} from "../constants/patientConstants";
import { logout } from "./userActions";
import {API_URL} from '../config';

export const admit = (
  name,
        id,
        age,
        gender,
        address,
        contactnumber,
        bloodtype,
        district,
        testId,
        isvaccinated,
        RATresult,
        medicalHistory,
        reportId,
        bedId,
        allocationId,
        admitDateTime,
        bday,
        Type_vaccine,
        Num_vaccine
) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PATIENT_ADMIT_REQUEST,
    });

     const {
   userLogin: { userInfo },
  } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo["results"]["token"]}`,
      },
    };

    const { data } = await axios.post(
      `${API_URL}/patient/admit`,
      {
        name,
        id,
        age,
        gender,
        address,
        contactnumber,
        bloodtype,
        district,
        testId,
        isvaccinated,
        RATresult,
        medicalHistory,
        reportId,
        bedId,
        allocationId,
        admitDateTime,
        bday,
        Type_vaccine,
        Num_vaccine
      },
      config
    );
   

   dispatch({
      type: PATIENT_ADMIT_SUCCESS,
      payload: data,
    });
  
  
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: PATIENT_ADMIT_FAIL,
      payload: message,
    });
  }
};

export const discharge = (
  patient_id,discharged_at,description,status
) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PATIENT_DISCHARGE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo["results"]["token"]}`,
      },
    };

    const { data } = await axios.post(
      `${API_URL}/patient/discharge`,
      {
        patient_id,discharged_at,description,status
      },
      config
    );


    console.log(data)

    dispatch({
      type: PATIENT_DISCHARGE_SUCCESS,
      payload: data,
    });
   
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: PATIENT_DISCHARGE_FAIL,
      payload: message,
    });
  }
};

export const transfer = (
  patient_id,
  dest_bed_id,
  transfer_date
) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PATIENT_TRANSFER_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo["results"]["token"]}`,
      },
    };

    const { data } = await axios.post(
      `${API_URL}/patient/transfer`,
      {
        patient_id,    
        dest_bed_id,
        transfer_date
      },
      config
    );

    dispatch({
      type: PATIENT_TRANSFER_SUCCESS,
      payload: data,
    });
 
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: PATIENT_TRANSFER_FAIL,
      payload: message,
    });
  }
};


export const listPatients = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: PATIENT_LIST_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo["results"]["token"]}`,
      },
    };

    const { data } = await axios.get(`${API_URL}/patient/getPatients`, config)

    dispatch({
      type: PATIENT_LIST_SUCCESS,
      payload: data,
    });

    console.log(data)
 
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: PATIENT_LIST_FAIL,
      payload: message,
    });
  }
};


export const getPatientDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PATIENT_DETAILS_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo["results"]["token"]}`,
      },
    };

    const { data } = await axios.get(`${API_URL}/patient/patientDetails/${id}`, config)

    dispatch({
      type: PATIENT_DETAILS_SUCCESS,
      payload: data,
    });
 
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: PATIENT_DETAILS_FAIL,
      payload: message,
    });
  }
};


export const updatePatient = (patient) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PATIENT_UPDATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo["results"]["token"]}`,
      },
    };

    const { data } = await axios.put(
      `${API_URL}/patient/updatePatient/${patient.patient_id}`,
      patient,
      config
    )

    dispatch({
      type: PATIENT_UPDATE_SUCCESS,
      payload: data,
    });
 
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: PATIENT_UPDATE_FAIL,
      payload: message,
    });
  }
};

export const filterPatients = (input) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PATIENT_FILTER_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo["results"]["token"]}`,
      },
    };

    const { data } = await axios.get(`${API_URL}/patient/filterPatients/${input}`, config)

    dispatch({
      type: PATIENT_FILTER_SUCCESS,
      payload: data,
    });
 
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: PATIENT_FILTER_FAIL,
      payload: message,
    });
  }
};

