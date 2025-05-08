export interface LoginFormState {
    email: string;
    password: string;
  }
export interface RegisterGeneralFormState {
    email: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    password: string;
    userType: string;
  }
export interface RegisterAddressFormState{
    houseNumber: string;
    street: string;
    locality: string;
    pinCode: string;
    city: string;
    selectState: string;
    selectCountry: string;
}    