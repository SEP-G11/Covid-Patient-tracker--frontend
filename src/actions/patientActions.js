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
} from "../constants/patientConstants";
import store from "../store";
import { logout } from "./userActions";

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
      "/patient/admit",
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
      "/patient/discharge",
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
  origin_bed_id,
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
      "/patient/transfer",
      {
        patient_id,
        origin_bed_id,
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
