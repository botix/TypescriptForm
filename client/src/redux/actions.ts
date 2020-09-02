import { AppEvents } from "./events";

const makeAction = <T extends AppEvents, P>(type: T) => (payload: P) => {
  return {
    type,
    payload
  };
};

export const SetFirstName     = makeAction<AppEvents.SET_FIRST_NAME, string>(AppEvents.SET_FIRST_NAME);

export const SetLastName      = makeAction<AppEvents.SET_LAST_NAME, string>(AppEvents.SET_LAST_NAME);

export const SetAddress       = makeAction<AppEvents.SET_ADDRESS, string>(AppEvents.SET_ADDRESS);

export const SetPhoneNumber   = makeAction<AppEvents.SET_PHONE_NUMBER, string>(AppEvents.SET_PHONE_NUMBER);

export const SetEmail         = makeAction<AppEvents.SET_EMAIL, string>(AppEvents.SET_EMAIL);


interface IStringMap<T> {
  [key: string]: T;
};

type IAnyFunction = (...args: any[]) => any;
type IActionUnion<A extends IStringMap<IAnyFunction>> = ReturnType<A[keyof A]>;

const actions = {
  SetFirstName,
  SetLastName,
  SetAddress,
  SetPhoneNumber,
  SetEmail
};

export type IAction = IActionUnion<typeof actions>