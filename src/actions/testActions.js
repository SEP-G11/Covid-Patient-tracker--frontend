import axios from "axios";
import {
    TEST_ENTER_REQUEST,
    TEST_ENTER_SUCCESS,
    TEST_ENTER_FAIL,
    TEST_DETAILS_REQUEST,
    TEST_DETAILS_SUCCESS,
    TEST_DETAILS_FAIL,

} from "../constants/testConstants";
import { logout } from "./userActions";



export const Enter = (testId,
    id,
    date,
    testType,
    RATresult) => async (dispatch, getState) => {
        try {


            dispatch({
                type: TEST_ENTER_REQUEST,
            });

            const {
                userLogin: { userInfo },
            } = getState();

            const config = {
                headers: {
                    Authorization: `Bearer ${userInfo["results"]["token"]}`,

                },
            };

            const { data } = await axios.post(
                "/test/enter",
                {
                    testId,
                    id,
                    date,
                    testType,
                    RATresult
                },
                config
            );

            dispatch({
                type: TEST_ENTER_SUCCESS,
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
                type: TEST_ENTER_FAIL,
                payload: message,
            });
        }
    };

    export const getPatientTestDetails = (id) => async (dispatch, getState) => {
        try {
          dispatch({
            type: TEST_DETAILS_REQUEST,
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
      
          const { data } = await axios.get(`/test/testDetails/${id}`, config)
      
          dispatch({
            type: TEST_DETAILS_SUCCESS,
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
            type: TEST_DETAILS_FAIL,
            payload: message,
          });
        }
      };
      
      

