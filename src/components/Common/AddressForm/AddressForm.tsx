import { statesInIndia } from "@/Pages/LoginAndSignUp/Constants";
import { ChangeEvent, useReducer, useState } from "react";
// import {Input } from "@/components/ui/input"
import { RegisterAddressFormState } from "@/Pages/LoginAndSignUp/Interfaces";
import styles from "@/Pages/LoginAndSignUp/LoginandSignup.module.css";
import { addressFields } from "@/Pages/LoginAndSignUp/Constants";
import TextInput from "@/components/Common/UI/TextInput/TextInput";

const initialAddressState: RegisterAddressFormState={
    houseNumber: "",
    street: "",
    locality: "",
    pinCode: "",
    city: "",
    selectState: "",
    selectCountry: "",
}

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

const AddressForm = () => {
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [addressFormState, dispatchAddress] = useReducer(addressFormReducer, initialAddressState);
    
    const handleChangeAddress = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        dispatchAddress({ type: e.target.name, payload: e.target.value });
        setErrors({ ...errors, [e.target.name]: "" });
      };

  return (
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
        </div> 
  )
}

export default AddressForm