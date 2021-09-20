import axios from "axios";
import {
    REPORT_CREATE_REQUEST,
    REPORT_CREATE_SUCCESS,
    REPORT_CREATE_FAIL


} from "../constants/reportConstants";
import { logout } from "./userActions";



export const CreateReport= (
   id,
   testId,
   RATresult,
   reportId,
   bedId,
   allocationId,
   date,
   phonenumber,
   bday,
   description) => async (dispatch, getState) => {
        try {


            dispatch({
                type: REPORT_CREATE_REQUEST,
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
                "/report/createReport",
                {
                    id,
                testId,
                RATresult,
                reportId,
                bedId,
                allocationId,
                date,
                phonenumber,
                bday,
                description
                },
                config
            );

            dispatch({
                type: REPORT_CREATE_SUCCESS,
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
                type: REPORT_CREATE_FAIL,
                payload: message,
            });
        }
    };

