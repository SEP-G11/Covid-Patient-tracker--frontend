import axios from "axios";
import {
    REPORT_CREATE_REQUEST,
    REPORT_CREATE_SUCCESS,
    REPORT_CREATE_FAIL,
    PATIENT_REPORT_REQUEST,
    PATIENT_REPORT_SUCCESS,
    PATIENT_REPORT_FAIL,
    REPORT_UPDATE_REQUEST,
    REPORT_UPDATE_SUCCESS,
    REPORT_UPDATE_FAIL,

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

    export const getPatientReportDetails = (id) => async (dispatch, getState) => {
        try {
          dispatch({
            type: PATIENT_REPORT_REQUEST,
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
      
          const { data } = await axios.get(`/report/patientReportDetails/${id}`, config)
      
          dispatch({
            type: PATIENT_REPORT_SUCCESS,
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
            type: PATIENT_REPORT_FAIL,
            payload: message,
          });
        }
      };

      export const updateReport = (report) => async (dispatch, getState) => {
        try {
          dispatch({
            type: REPORT_UPDATE_REQUEST,
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
      
          const { data } = await axios.put(
            `/report/updateReport/${report.patient_id}`,
            report,
            config
          );
         
      
         dispatch({
            type: REPORT_UPDATE_SUCCESS,
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
            type: REPORT_UPDATE_FAIL,
            payload: message,
          });
        }
      };
      

