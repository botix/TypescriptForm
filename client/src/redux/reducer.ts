import { AppEvents } from "./events";
import { IAction } from "./actions";

const initState = {
  firstName: "",
  lastName: "",
  address: "",
  phoneNumber: "",
  email: "",
};

export interface IState {
  firstName: string,
  lastName: string,
  address: string,
  phoneNumber: string,
  email: string,
};

export const reducer = (state: IState = initState, action: IAction): IState => {
  switch(action.type){

    case AppEvents.SET_FIRST_NAME:
      return {
        ...state,
        firstName: action.payload
      };
    
    case AppEvents.SET_LAST_NAME:
      return {
        ...state,
        lastName: action.payload
      };
    
    case AppEvents.SET_ADDRESS:
      return {
        ...state,
        address: action.payload
      };
    
    case AppEvents.SET_PHONE_NUMBER:
      return {
        ...state,
        phoneNumber: action.payload
      };
    
    case AppEvents.SET_EMAIL:
      return {
        ...state,
        email: action.payload
      };

    default: 
      return state;
  };
};