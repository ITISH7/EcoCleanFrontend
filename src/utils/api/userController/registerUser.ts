import axios from "axios";
import {RegisterFormData} from "@/utils/types/types"
import { useMutation } from "@tanstack/react-query";
import { handleApiError } from "@/utils/errorHandler";

export const useRegisterUser=()=>{
  const registerUser = async (data: RegisterFormData): Promise<any> => {
    const { generalForm, addressForm } = data;

    const { firstName, lastName, password, email, phoneNumber, userType: role } = generalForm;
    const {houseNumber,locality, street, city,selectState:state,pinCode,selectCountry: country} = addressForm;
    const address = [{houseNumber,locality, street, city, state,pinCode, country}];
    try {
      const response = await axios.post("http://localhost:8080/user", {
        firstName,
        lastName,
        password,
        email,
        address,
        phoneNumber,
        role
      });
      return response.data ;
    }catch (error: unknown) {
        handleApiError(error);
        throw error; 
    }
}
  return useMutation({
  mutationFn: registerUser,
  })

}