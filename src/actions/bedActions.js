import axios from "axios";
import {
  BED_SEARCH_REQUEST,
  BED_SEARCH_SUCCESS,
  BED_SEARCH_FAIL,

  BED_LOAD_REQUEST,
  BED_LOAD_SUCCESS,
  BED_LOAD_FAIL,

} from "../constants/bedConstants";
import { logout } from "./userActions";



export const Search = (facilityId) => async (dispatch, getState) => {
  try {

   
    dispatch({
      type: BED_SEARCH_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo["results"]["token"]}`,

      },
    };

    const { data } = await axios.get(`/bed/search/${facilityId}`, config);

    dispatch({
      type: BED_SEARCH_SUCCESS,
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
      type: BED_SEARCH_FAIL,
      payload: message,
    });
  }
};

export const loadbeds = (facilityId) => async (dispatch, getState) => {

  try {
    dispatch({
      type: BED_LOAD_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo["results"]["token"]}`,

      },
    };

    console.log(userInfo["results"]["token"])

    const { data } = await axios.get(`/bed/search/${facilityId}`, config);

    dispatch({
      type: BED_LOAD_SUCCESS,
      payload: data,
    });
  
    localStorage.setItem("bedInfo", JSON.stringify(data));

  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: BED_LOAD_FAIL,
      payload: message,
    });
  }
};


