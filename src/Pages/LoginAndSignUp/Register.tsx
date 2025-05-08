import TextInput from "@/components/Common/UI/TextInput/TextInput";
import Button from "@/components/Common/UI/Button/Button";
import styles from "@/Pages/LoginAndSignUp/LoginandSignup.module.css";
import { ChangeEvent, FormEvent, useReducer, useState } from "react";
import { useRegisterUser } from "@/utils/api/userController/registerUser";
import { useNavigate } from "react-router-dom";
import { validateAddressFields, validateFields } from "@/utils/FormValidations";
import { RegisterGeneralFormState, RegisterAddressFormState } from "./Interfaces";
import { statesInIndia, generalFields, addressFields } from "./Constants";
import { toast } from "sonner";
// import AddressForm from "@/components/Common/AddressForm/AddressForm";

const initialState: RegisterGeneralFormState = {
  email: "",
  firstName: "",
  lastName: "",
  phoneNumber: "",
  password: "",
  userType: "",
};

const initialAddressState: RegisterAddressFormState={
    houseNumber: "",
    street: "",
    locality: "",
    pinCode: "",
    city: "",
    selectState: "",
    selectCountry: "",
}
const formReducer = (state: RegisterGeneralFormState, action: { type: string; payload: string }) => {
  switch(action.type){
    case 'email': return {...state, email:action.payload}
    case 'firstName': return {...state, firstName:action.payload}
    case 'lastName': return {...state, lastName:action.payload}
    case 'phoneNumber': return {...state, phoneNumber:action.payload}
    case 'password': return {...state, password:action.payload}
    case 'userType': return {...state, userType:action.payload}
    case 'reset': return initialState
    default : return state
  };
};
const addressFormReducer = (state: RegisterAddressFormState, action: { type: string; payload: string }) => {
  switch(action.type){
    case 'houseNumber': return {...state, houseNumber:action.payload}
    case 'street': return {...state, street:action.payload}
    case 'locality': return {...state, locality:action.payload}
    case 'pinCode': return {...state, pinCode:action.payload}
    case 'city': return {...state, city:action.payload}
    case 'selectState': return {...state, selectState:action.payload}
    case 'selectCountry': return {...state, selectCountry:action.payload}
    case 'reset': return initialAddressState
    default : return state
}
};

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [generalFormState, dispatchGeneral] = useReducer(formReducer, initialState);
  const [addressFormState, dispatchAddress] = useReducer(addressFormReducer, initialAddressState);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [pageNumber, setPageNumber] = useState(1);
  const {mutate:registerUser} = useRegisterUser();

  const handleChangeGeneral = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    dispatchGeneral({ type: e.target.name, payload: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };
  const handleChangeAddress = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    dispatchAddress({ type: e.target.name, payload: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };
  const handleNext = () => {
    const validationErrors = validateFields(generalFormState);
    if (Object.keys(validationErrors).length === 0) {
      setPageNumber(2);
    } else {
      setErrors(validationErrors);
    }
  };
  const handleBack=()=>{
    setPageNumber(1);
  }

  const handleSubmit = async (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const addressValidationErrors= validateAddressFields(addressFormState);
    if (Object.keys(addressValidationErrors).length === 0) {
      const formData = {
        generalForm: generalFormState,
        addressForm: addressFormState,
      };
     registerUser(formData,{
      onSuccess:()=>{
        toast.success("User Registered successfully");
        dispatchGeneral({ type: "reset", payload: "" });
        // Add reducx state for email to be displayed in login page.
        navigate("/loginandsignup/login");
      } ,
      onError:(error)=>{
        toast.error(`Error during registration: ${error.message || "Unknown error occurred"}`);
      }})
    } else {
      setErrors(addressValidationErrors);
    }
  };
  return (
    <form>
      {pageNumber === 1 ? (
        <div>
          <div className="bg-gray-50 mt-10 mb-10 p-5 w-full outline-green-800 outline-2 rounded-2xl">
          <p className="text-2xl w-full flex justify-center ">General details</p>
            <div className="gap-5 mb-5 mt-5 flex flex-wrap">
              {generalFields.map((field) => (
                <div className=" w-9/20 " key={field.name}>
                  <h3 className={`${styles.headings}`}>{field.displayName}</h3>
                  <TextInput
                    name={field.name}
                    onChange={handleChangeGeneral}
                    value={generalFormState[field.name as keyof RegisterGeneralFormState] || ""}
                    placeholder={`Enter your ${field.displayName}`}
                  />
                  {errors[field.name] && <p className="text-red-500">{errors[field.name]}</p>}
                </div>
              ))}
             </div>
            <h3 className={`${styles.headings}`}>Select User Type</h3>
            <div className={`${styles.UserType}`}>
              <select
                name="userType"
                onChange={handleChangeGeneral}
                value={generalFormState.userType}
                className={`${styles.Dropdown}`}
              >
                <option label="Select User Type" disabled></option>
                <option label="Client">User</option>
                <option label="Merchant">MERCHANT</option>
              </select>
            </div>
            {errors.userType && <p className="text-red-500">{errors.userType}</p>}
          </div>
          <div className={`${styles.register}`}>
              <Button button_type="button" label="Next" onClick={handleNext} />
          </div>
        </div>
      ) : (
        <div>
          <div className="bg-gray-50 mt-10 mb-10 p-5 w-full outline-green-800 outline-2 rounded-2xl ">
            <p className="text-2xl w-full flex justify-center ">Address details</p>
            <div className="gap-5 mb-5 mt-5 flex flex-wrap">
              {addressFields.map((field) => (
                <div className=" w-9/20" key={field.name}>
                  <h3 className={`${styles.headings}`}>{field.displayName}</h3>
                  <TextInput
                    name={field.name}
                    onChange={handleChangeAddress}
                    value={addressFormState[field.name as keyof RegisterAddressFormState] || ""}
                    placeholder={`Enter your ${field.displayName}`}
                  />
                  {errors[field.name] && <p className="text-red-500">{errors[field.name]}</p>}
                </div>
              ))}
            </div>
            <h3 className={`${styles.headings}`}>Select State</h3>
            <div className={`${styles.UserType} `}>
              <select
                name="selectState"
                onChange={handleChangeAddress}
                value={addressFormState.selectState}
                className={`${styles.Dropdown}`}
              >
                <option label="Select State" disabled></option>
                {statesInIndia.map((state) => (
                  <option key={state} value={state} label={state}></option>
                ))}
              </select>
            </div>
            {errors.State && <p className="text-red-500">{errors.State}</p>}

            <h3 className={`${styles.headings} mt-5`}>Select Country</h3>
            <div className={`${styles.UserType}`}>
              <select
                name="selectCountry"
                onChange={handleChangeAddress}
                value={addressFormState.selectCountry}
                className={`${styles.Dropdown}`}
              >
                <option label="Select Country" disabled></option>
                <option label="India">India</option>
              </select>
            </div>
            {errors.Country && <p className="text-red-500">{errors.Country}</p>}

          </div>
          <div className="flex justify-between">
            <Button button_type="button" label="Back" onClick={handleBack} />
            <Button button_type="submit" label="Register" onClick={handleSubmit} />
          </div>
        </div>  
      )}
    </form>
  );
};

export default Register;
