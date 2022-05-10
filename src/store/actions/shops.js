import {
  LOAD_SHOPS, NEW_SHOP
} from "../types";
import { getDatabase, ref, onValue, onDisconnect, push } from 'firebase/database';
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../../../app.config";


export const getShops = () => async (dispatch, getState) => {
	const app = initializeApp(firebaseConfig);
  const db = getDatabase();
  const reference = ref(db, '/shops/');

  
  onValue(reference, (snapshot) => {
    dispatch({ type: LOAD_SHOPS, payload: snapshot.val() });
  });
  
  onDisconnect(reference, () => {
    dispatch({ type: LOAD_SHOPS, payload: getShopsFromAsyncStorage() });

  });
  
};

export const addShopAction = (params) => async (dispatch, getState) => {
	const app = initializeApp(firebaseConfig);
  const db = getDatabase();
  const reference = ref(db, '/shops/');

  push(reference, params);
  
  onValue(reference, (snapshot) => {
    dispatch({ type: NEW_SHOP, payload: snapshot.val() });
  });

  onDisconnect(reference, () => {
    dispatch({ type: NEW_SHOP, payload: getShopsFromAsyncStorage() });

  });
};

const getShopsFromAsyncStorage = async () => {
  const shops = {
    0: {
      name: "BERSHKA",
      sizes: {
        mens: {
          XS: [82, 60, 88],
          S:  [88, 66, 94],
          M:  [94, 72, 100],
          L:  [102, 79, 108],
          XL: [108, 85, 114],
        },
        womens: {
          XS: [82, 60, 88],
          S:  [88, 66, 94],
          M:  [94, 72, 100],
          L:  [102, 79, 108],
          XL: [108, 85, 114],
        }
      }
    },
    1: {
      name: "HANDM",
      sizes: {
        mens: {
          XS: [82, 60, 88],
          S:  [88, 66, 94],
          M:  [94, 72, 100],
          L:  [102, 79, 108],
          XL: [108, 85, 114],
        },
        womens: {
          XS: [82, 60, 88],
          S:  [88, 66, 94],
          M:  [94, 72, 100],
          L:  [102, 79, 108],
          XL: [108, 85, 114],
        }
      }
    }
  };

  return shops;
};

