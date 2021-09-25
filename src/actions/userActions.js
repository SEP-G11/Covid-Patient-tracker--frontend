import axios from 'axios'
import {
  USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGOUT,
  USER_REGISTER_REQUEST,USER_REGISTER_SUCCESS,USER_REGISTER_FAIL,
  USER_FORGOT_PW_REQUEST,USER_FORGOT_PW_SUCCESS,USER_FORGOT_PW_FAIL,
  USER_RESET_PW_REQUEST,USER_RESET_PW_SUCCESS,USER_RESET_PW_FAIL,
  USER_DETAILS_REQUEST, USER_DETAILS_SUCCESS, USER_DETAILS_FAIL, USER_DETAILS_RESET,
} from '../constants/userConstants'


export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    })

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const { data } = await axios.post(
        '/auth/login',
        { email, password },
        config
    )

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data.results,
    })

    localStorage.setItem('userInfo', JSON.stringify(data.results))
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
          error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
    })
  }
}

export const logout = () => (dispatch) => {
  localStorage.removeItem('userInfo')
  dispatch({ type: USER_LOGOUT })
  document.location.href = '/'
}

export const register = (id, name, email, contact, password, accountType, facilityId) => async (dispatch,getState) => {
  try {
    dispatch({
      type: USER_REGISTER_REQUEST
    });

    const { userLogin: { userInfo } } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    const { data } = await axios.post(
        '/moh/register',
        {id,name,email,contact,password,accountType,facilityId},
        config
    );
    // const data = {
    //     id: id,
    //     name: name,
    //     email: email,
    //     contact: contact,
    //     password: password,
    //     accountType: accountType
    // }


    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: data
    });

    // dispatch({
    //   type: USER_LOGIN_SUCCESS,
    //   payload: data
    // });

    // localStorage.setItem('userInfo', JSON.stringify(data));
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
        '/auth/forgot-password',
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
        '/auth/reset-password',
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
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    const { data } = await axios.get(`/api/user/profile`, config);

    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: data
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



// export const register = () => async (dispatch, getState) => {
//     try {
//         dispatch({
//             type: USER_REGISTER_REQUEST
//         });
//
//         const { userLogin: { userInfo } } = getState();
//
//         const config = {
//             headers: {
//                 Authorization: `Bearer ${userInfo.token}`
//             }
//         };
//
//         const { data } = await axios.post(`/api/products`,{}, config);
//
//         dispatch({
//             type: USER_REGISTER_SUCCESS,
//             payload: data
//         });
//     }
//     catch (error) {
//         dispatch({
//             type: USER_REGISTER_FAIL,
//             payload: error.response && error.response.data.message ?
//                 error.response.data.message :
//                 error.message
//         });
//     }
// };

