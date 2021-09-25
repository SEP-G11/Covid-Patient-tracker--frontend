import {
    USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGOUT,
    USER_REGISTER_REQUEST,USER_REGISTER_SUCCESS,USER_REGISTER_FAIL,USER_REGISTER_RESET,
    USER_FORGOT_PW_REQUEST,USER_FORGOT_PW_SUCCESS,USER_FORGOT_PW_FAIL,
    USER_RESET_PW_REQUEST,USER_RESET_PW_SUCCESS,USER_RESET_PW_FAIL,
    USER_DETAILS_REQUEST, USER_DETAILS_SUCCESS, USER_DETAILS_FAIL, USER_DETAILS_RESET,
} from '../constants/userConstants'

export const userLoginReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_LOGIN_REQUEST:
            return { loading: true }
        case USER_LOGIN_SUCCESS:
            return { loading: false, userInfo: action.payload }
        case USER_LOGIN_FAIL:
            return { loading: false, error: action.payload }
        case USER_LOGOUT:
            return {}
        default:
            return state
    }
}

export const userRegisterReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_REGISTER_REQUEST:
            return { loading: true};
        case USER_REGISTER_SUCCESS:
            return { loading: false, success: true, user: action.payload };
        case USER_REGISTER_FAIL:
            return { loading: false, error: action.payload };
        case USER_REGISTER_RESET:
            return {};
        default:
            return state;
    }
};

export const userForgotPasswordReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_FORGOT_PW_REQUEST:
            return { loading: true};
        case USER_FORGOT_PW_SUCCESS:
            return { loading: false, success: true, message: action.payload };
        case USER_FORGOT_PW_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const userResetPasswordReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_RESET_PW_REQUEST:
            return { loading: true};
        case USER_RESET_PW_SUCCESS:
            return { loading: false, success: true, message: action.payload };
        case USER_RESET_PW_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const userDetailsReducer = (state = {userDetails: {results:[],message:''}}, action) => {
    switch (action.type) {
        case USER_DETAILS_REQUEST:
            return { ...state, loading: true};
        case USER_DETAILS_SUCCESS:
            return { loading: false, userDetails: action.payload };
        case USER_DETAILS_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};