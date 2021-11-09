
import axios from 'axios'
import {
  USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGOUT,
  USER_REGISTER_REQUEST,USER_REGISTER_SUCCESS,USER_REGISTER_FAIL,
  USER_FORGOT_PW_REQUEST,USER_FORGOT_PW_SUCCESS,USER_FORGOT_PW_FAIL,
  USER_RESET_PW_REQUEST,USER_RESET_PW_SUCCESS,USER_RESET_PW_FAIL,
  USER_DETAILS_REQUEST, USER_DETAILS_SUCCESS, USER_DETAILS_FAIL,
  USER_UPDATE_PROFILE_REQUEST,USER_UPDATE_PROFILE_SUCCESS,USER_UPDATE_PROFILE_FAIL
} from '../constants/userConstants'
import {API_URL} from '../config';

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      `${API_URL}/auth/login`,
      { email, password },
      config
    );

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });

    localStorage.setItem("userInfo", JSON.stringify(data));

  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const logout = () => (dispatch) => {

  localStorage.removeItem("userInfo");
  localStorage.removeItem("bedInfo");
  localStorage.removeItem("facilityInfo");
  dispatch({ type: USER_LOGOUT });
  document.location.href = "/";
};


export const register = (id, name, email, contact, password, accountType, facilityId) => async (dispatch,getState) => {
  try {
    dispatch({
      type: USER_REGISTER_REQUEST
    });

    const { userLogin: { userInfo } } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.results.token}`
      }
    };

    const { data } = await axios.post(
        `${API_URL}/moh/register`,
        {id,name,email,contact,password,accountType,facilityId},
        config
    );

    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: data
    });
    
  }
  catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload: error.response && error.response.data.message ?
          error.response.data.message :
          error.message
    });
  }
};

export const forgotPassword = (email) => async (dispatch) => {
  try {
    dispatch({
      type: USER_FORGOT_PW_REQUEST,
    });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.post(
        `${API_URL}/auth/forgot-password`,
        { email },
        config
    );

    dispatch({
      type: USER_FORGOT_PW_SUCCESS,
      payload: data.message,
    });

  } catch (error) {
    dispatch({
      type: USER_FORGOT_PW_FAIL,
      payload:
          error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
    })
  }
};

export const resetPassword = (password,token) => async (dispatch) => {
  try {
    dispatch({
      type: USER_RESET_PW_REQUEST,
    });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.put(
        `${API_URL}/auth/reset-password`,
        { password, token },
        config
    );

    dispatch({
      type: USER_RESET_PW_SUCCESS,
      payload: data.message,
    });

  } catch (error) {
    dispatch({
      type: USER_RESET_PW_FAIL,
      payload:
          error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
    })
  }
};

export const getUserDetails = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_DETAILS_REQUEST
    });

    const { userLogin: { userInfo } } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.results.token}`
      }
    };

    const { data } = await axios.get(`${API_URL}/user/profile`, config);

    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: data.results
    });
  }
  catch (error) {
    dispatch({
      type: USER_DETAILS_FAIL,
      payload: error.response && error.response.data.message ?
          error.response.data.message :
          error.message
    });
  }
};

export const updateUserProfile = (user) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_UPDATE_PROFILE_REQUEST
    });

    const { userLogin: { userInfo } } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.results.token}`
      }
    };

    const { data } = await axios.put(`${API_URL}/user/profile`, user, config);

    dispatch({
      type: USER_UPDATE_PROFILE_SUCCESS,
      payload: data
    });

  }
  catch (error) {
    dispatch({
      type: USER_UPDATE_PROFILE_FAIL,
      payload: error.response && error.response.data.message ?
          error.response.data.message :
          error.message
    });
  }
};