import {
    BED_SEARCH_REQUEST,
    BED_SEARCH_SUCCESS,
    BED_SEARCH_FAIL,
  
  } from "../constants/bedConstants";
  
      
    export const bedSearchReducer = (state = {}, action) => {
      switch (action.type) {
        case BED_SEARCH_REQUEST:
          return { loading: true }
        case BED_SEARCH_SUCCESS:
          return { loading: false , response:action.payload  }
        case BED_SEARCH_FAIL:
          return { loading: false, error: action.payload }
        default:
          return state
      }
    }
    
  
