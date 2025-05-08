interface LoginFormState {
  email: string;
  password: string;
}

interface RegisterGeneralFormState {
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  password: string;
  userType: string;
}

interface RegisterAddressFormState {

    houseNumber?: string;
    street?: string;
    locality?: string;
    pinCode?: string;
    city?: string;
    selectState?: string;
    selectCountry?: string;
}

export const validateFields = (formState: RegisterGeneralFormState) => {
  const newErrors: { [key: string]: string } = {};

  if (!formState.firstName) newErrors.firstName = "Please enter a valid first name.";
  if (!formState.lastName) newErrors.lastName = "Please enter a valid last name.";
  if (!formState.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email)) {
    newErrors.email = "Please enter a valid email address.";
  }
  if (!formState.phoneNumber || !/^[0-9]{10}$/.test(formState.phoneNumber)) {
    newErrors.phoneNumber = "Please enter a valid 10-digit phone number.";
  }
  if (!formState.password || formState.password.length < 6) {
    newErrors.password = "Password must be at least 6 characters long.";
  }
  if (!formState.userType) newErrors.userType = "Please select a user type.";

  return newErrors;
};

export const validateAddressFields = (formState: RegisterAddressFormState) => {
  const newErrors: { [key: string]: string } = {};

  if (!formState.houseNumber || !/^[0-9]*$/.test(formState.houseNumber)) newErrors.houseNumber = "House number can not be empty or non-numerical.";
  if (!formState.street) newErrors.street = "Street can not be empty.";
  if (!formState.locality) newErrors.locality = "Locality can not be empty.";
  if (!formState.pinCode || !/^[0-9]{6}$/.test(formState.pinCode)) {
    newErrors.pinCode = "Please enter a valid 6-digit zip code.";
  }
  if (!formState.city) newErrors.city = "Please enter a valid city.";
  if (!formState.selectState) newErrors.State = "Please select a state.";
  if (!formState.selectCountry) newErrors.Country = "Please select a country.";

  return newErrors;
};

  export const validateLoginFields=(formState: LoginFormState)=>{
    const newErrors: { [key: string]: string } = {};
    
    if (!formState.email) {
      newErrors.email = "Email address can not be empty.";
    }
    if (!formState.password) {
      newErrors.password = "Password can not be empty.";
    }
    return newErrors;
  }