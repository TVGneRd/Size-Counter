import {
  LOAD_SHOPS, NEW_SHOP
} from "../types";

const initialState = {
  shopsList: [],
};

export const shopsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_SHOPS:

      return {
        ...state,
        shopsList: action.payload
      };
   

    
    case NEW_SHOP:
      return {
        ...state,
        shopsList: action.payload
      };

    default:
      return state;
  }
};
