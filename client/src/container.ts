import { App as Component } from "./App";
import { compose } from "redux";
import { connect } from "react-redux";
import { Dispatch } from "react";
import { SetFirstName, SetLastName, SetAddress, SetEmail, SetPhoneNumber, IAction } from "./redux/actions";
import { IAppState } from "./redux/store";

const mapStateToProps = (state: IAppState) => {
  return {
    firstName: state.app.firstName,
    lastName: state.app.lastName,
    address: state.app.address,
    phoneNumber: state.app.phoneNumber,
    email: state.app.email,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<IAction>) => {
  return {
    onFirstNameChange: (e: string) => dispatch(SetFirstName(e)),
    onLastNameChange: (e: string) => dispatch(SetLastName(e)),
    onAddressChange: (e: string) => dispatch(SetAddress(e)),
    onPhoneNumberChange: (e: string) => dispatch(SetPhoneNumber(e)),
    onEmailChange: (e: string) => dispatch(SetEmail(e))
  }
}


export const App = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(Component);