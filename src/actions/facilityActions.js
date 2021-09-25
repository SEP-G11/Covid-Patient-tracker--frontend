import axios from "axios";

import {
  FACILITY_GET_REQUEST,
  FACILITY_GET_SUCCESS,
  FACILITY_GET_FAIL,

} from "../constants/facilityConstants";
import { logout } from "./userActions";



export const getFacility = () => async (dispatch, getState) => {


  try {
    dispatch({
      type: FACILITY_GET_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo["results"]["token"]}`,

      },
    };
 
    const { data } = await axios.get(`/facility/getAllFacility`, config);

    dispatch({
      type: FACILITY_GET_SUCCESS,
      payload: data,
    });
  
    localStorage.setItem("facilityInfo", JSON.stringify(data));

  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: FACILITY_GET_FAIL,
      payload: message,
    });
  }
};
