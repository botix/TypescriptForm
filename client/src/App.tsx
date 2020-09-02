import React, { useState, useEffect } from "react";
import "./sass/App.scss";

interface IProps {
  firstName: string,
  lastName: string,
  address: string,
  phoneNumber: string,
  email: string,
  onFirstNameChange(e: string): void;
  onLastNameChange(e: string): void;
  onAddressChange(e: string): void;
  onEmailChange(e: string): void;
  onPhoneNumberChange(e: string): void;
};

export const App: React.FunctionComponent<IProps> = ({
    firstName,
    lastName,
    address,
    phoneNumber,
    email,
    onFirstNameChange,
    onLastNameChange,
    onAddressChange,
    onEmailChange,
    onPhoneNumberChange
  }) => {
  
  const[firstNameErr, setFirstNameErr]              = useState(false);
  const[lastNameErr, setLastNameErr]                = useState(false);
  const[addressErr, setAddressErr]                  = useState(false);
  const[phoneNumberErr, setPhoneNumberErr]          = useState(false);
  const[emailErr, setEmailErr]                      = useState(false);
    
  const[firstNameTouched, setFirstNameTouched]      = useState(false);
  const[lastNameTouched, setLastNameTouched]        = useState(false);
  const[addressTouched, setAddressTouched]          = useState(false);
  const[phoneNumberTouched, setPhoneNumberTouched]  = useState(false);
  const[emailTouched, setEmailTouched]              = useState(false);
  
  const[checkboxState, setCheckboxState]            = useState(false);
  const[buttonState, setButtonState]                = useState(true);

  const phoneNumberRegex: RegExpMatchArray = phoneNumber.match(/^\+\d{10}$/);
  const emailRegex: RegExpMatchArray = email.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
  
  const firstNameWarning    = firstNameErr && firstNameTouched;
  const lastNameWarning     = lastNameErr && lastNameTouched;
  const addressWarning      = addressErr && addressTouched;
  const phoneNumberWarning  = phoneNumberErr && phoneNumberTouched;
  const emailWarning        = emailErr && emailTouched;
  const buttonDisabled      = firstNameWarning || lastNameWarning || addressWarning || phoneNumberWarning || emailWarning || buttonState;
  
  
  useEffect(() => {
    setFirstNameErr(firstName.length < 1);
    setLastNameErr(lastName.length < 1);
    setAddressErr(address.length < 1);
    setPhoneNumberErr(phoneNumberRegex ? false : true);
    setEmailErr(emailRegex ? false : true);
    setButtonState(!(firstNameTouched && lastNameTouched && addressTouched && phoneNumberTouched && emailTouched && checkboxState));
  }, [firstName, lastName, address, phoneNumber, email]);

  const handleSubmit = (e: any) => {
    e.preventDefault();

    fetch("/formsubmit", {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify({ firstName, lastName, address, phoneNumber, email })
    })
    .then(res => console.log(res.status))
    .catch(err => console.log(err));
    
    onPhoneNumberChange("");  setPhoneNumberTouched(false);
    onFirstNameChange("");    setFirstNameTouched(false);
    onLastNameChange("");     setLastNameTouched(false);
    onAddressChange("");      setAddressTouched(false);
    onEmailChange("");        setEmailTouched(false);
  };
  
  return (
    <div className="form-container">

      <input 
        placeholder ="First Name"
        value={firstName}
        onChange={e => onFirstNameChange(e.target.value)}
        onBlur={() => setFirstNameTouched(true)}
        className={firstNameWarning ? "error-background_color" : "border_color"}
      />
      {firstNameWarning && <span className="error" >Required</span>}
    
      <input 
        placeholder ="Last Name"
        value={lastName}
        onChange={e => onLastNameChange(e.target.value)}
        onBlur={() => setLastNameTouched(true)}
        className={lastNameWarning? "error-background_color" : "border_color"}
      />
      {lastNameWarning && <span className="error">Required</span>}

      <input 
        placeholder ="Address"
        value={address}
        onChange={e => onAddressChange(e.target.value)}
        onBlur={() => setAddressTouched(true)}
        className={addressWarning ? "error-background_color" : "border_color"}
      />
      {addressWarning && <span className="error">Required</span>}


      <input 
        placeholder ="Phone Number"
        value={phoneNumber}
        onChange={e => onPhoneNumberChange(e.target.value)}
        onBlur={() => setPhoneNumberTouched(true)}
        className={phoneNumberWarning ? "error-background_color" : "border_color"}
      />
      {phoneNumberWarning && 
      <span className="error">
        {phoneNumber.length > 0  ? "Bad Format" : "Required" }
      </span>}

      <input 
        placeholder ="Email"
        value={email}
        onChange={e => onEmailChange(e.target.value)}
        onBlur={() => setEmailTouched(true)}
        className={emailWarning ? "error-background_color" : "border_color"}
      />
      {emailWarning && 
      <span className="error">
        {email.length > 0 ? "Bad Format" : "Required"  }
      </span>}

      <label 
        htmlFor="checkbox-clickme"
      >
        Check the box
      </label>  
      <input
        type="checkbox"
        id="checkbox-clickme"
        name="checkbox-clickme"
        onClick={() => {setCheckboxState(!checkboxState); setButtonState(false)}}
      />

      <button
        onClick={(e) => !buttonDisabled && handleSubmit(e)}
        className={buttonDisabled ?  "disabled-button" : "active-button" }
      >
        Save
      </button>
    
    </div>
    );
};