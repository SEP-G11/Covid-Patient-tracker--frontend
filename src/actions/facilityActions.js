import axios from "axios";

import {
  FACILITY_GET_REQUEST,FACILITY_GET_SUCCESS,FACILITY_GET_FAIL,
  FACILITY_LIST_REQUEST,FACILITY_LIST_SUCCESS,FACILITY_LIST_FAIL,
  FACILITY_ACTIVE_REQUEST,FACILITY_ACTIVE_SUCCESS,FACILITY_ACTIVE_FAIL,
  FACILITY_RECOVERED_REQUEST,FACILITY_RECOVERED_SUCCESS,FACILITY_RECOVERED_FAIL,
  FACILITY_DEATHS_REQUEST,FACILITY_DEATHS_SUCCESS,FACILITY_DEATHS_FAIL,
  FACILITY_BEDS_REQUEST,FACILITY_BEDS_SUCCESS,FACILITY_BEDS_FAIL
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

export const listFacilities = () => async (dispatch,getState) => {
    try {
        dispatch({type: FACILITY_LIST_REQUEST});

        const { userLogin: { userInfo } } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        };


        const { data } = await axios.get(`/moh/facilities`,config);

        dispatch({
            type: FACILITY_LIST_SUCCESS,
            payload: data
        })
    }
    catch (error) {
        dispatch({
            type: FACILITY_LIST_FAIL,
            payload: error.response && error.response.data.message ?
                error.response.data.message :
                error.message
        })
    }
};

export const listFacilitiesActive = () => async (dispatch,getState) => {
    try {
        dispatch({type: FACILITY_ACTIVE_REQUEST});

        const { userLogin: { userInfo } } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        };


        const { data } = await axios.get(`/moh/facilities/active`,config);

        dispatch({
            type: FACILITY_ACTIVE_SUCCESS,
            payload: data
        })
    }
    catch (error) {
        dispatch({
            type: FACILITY_ACTIVE_FAIL,
            payload: error.response && error.response.data.message ?
                error.response.data.message :
                error.message
        })
    }
};

export const listFacilitiesRecovered = () => async (dispatch,getState) => {
    try {
        dispatch({type: FACILITY_RECOVERED_REQUEST});

        const { userLogin: { userInfo } } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        };


        const { data } = await axios.get(`/moh/facilities/recovered`,config);

        dispatch({
            type: FACILITY_RECOVERED_SUCCESS,
            payload: data
        })
    }
    catch (error) {
        dispatch({
            type: FACILITY_RECOVERED_FAIL,
            payload: error.response && error.response.data.message ?
                error.response.data.message :
                error.message
        })
    }
};

export const listFacilitiesDeaths = () => async (dispatch,getState) => {
    try {
        dispatch({type: FACILITY_DEATHS_REQUEST});

        const { userLogin: { userInfo } } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        };


        const { data } = await axios.get(`/moh/facilities/deaths`,config);

        dispatch({
            type: FACILITY_DEATHS_SUCCESS,
            payload: data
        })
    }
    catch (error) {
        dispatch({
            type: FACILITY_DEATHS_FAIL,
            payload: error.response && error.response.data.message ?
                error.response.data.message :
                error.message
        })
    }
};

export const listFacilitiesBeds = () => async (dispatch,getState) => {
    try {
        dispatch({type: FACILITY_BEDS_REQUEST});

        const { userLogin: { userInfo } } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        };


        const { data } = await axios.get(`/moh/facilities/beds`,config);

        dispatch({
            type: FACILITY_BEDS_SUCCESS,
            payload: data
        })
    }
    catch (error) {
        dispatch({
            type: FACILITY_BEDS_FAIL,
            payload: error.response && error.response.data.message ?
                error.response.data.message :
                error.message
        })
    }
};
