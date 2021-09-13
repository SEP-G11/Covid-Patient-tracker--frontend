import axios from "axios";
import {
  BED_SEARCH_REQUEST,
  BED_SEARCH_SUCCESS,
  BED_SEARCH_FAIL,
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
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/bed/search/${facilityId}`, config);
    console.log(data);
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
