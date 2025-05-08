import { handleApiError } from "@/utils/errorHandler";
import { LoginFormData, passwordDetails } from "@/utils/types/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import Cookies from 'universal-cookie'; 
import { apiClient } from "@/utils/api/index";
import { QUERY_KEYS } from "@/utils/queryKeys";

//reset password
export const useChangePassword = ()=>{

  const updatePassword =async(data:passwordDetails)=>{
    try {
      const cookies = new Cookies();
      const token = cookies.get("token");
      const response = await apiClient.put(`/reset-password`,{
        oldPassword:data.oldPassword,
        newPassword:data.newPassword
      },
        {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      handleApiError(error);
      throw error; 
    }
  } 
  return useMutation({
    mutationFn: updatePassword,
    onSuccess:()=>{
      toast.success("Password Updated Successfully");
      setTimeout(() => {
        window.location.href="/profile";
      }, 2000); 
    },
    onError: (error) => {
      toast.error("Failed to update password error: " + error);
    },
  })
}
//logout user

export const useLogoutUser = ()=>{
  const queryClient = useQueryClient();

  const logoutUser =async()=>{
    try {
      const cookies = new Cookies();
      const token = cookies.get("token");

      const response = await apiClient.post(`/user-logout`,
        {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error) {
      handleApiError(error);
      throw error; 
    }
  } 
  return useMutation({
    mutationFn:logoutUser,
    onSuccess:()=>{
      toast.success("Logged Out Successfully");
      queryClient.invalidateQueries({queryKey:[QUERY_KEYS.LOGOUT]});
    },
    onError: (error) => {
      toast.error("Failed to logout user error: " + error);
    },
  })
}

// login by email

export const useLoginUser = () => {
  const loginUser = async (data: LoginFormData) => {
    const cookies = new Cookies();
    const {email,password} = data;
    try {
      const response = await apiClient.post(`/login`,{
        email,password
      });
      cookies.set("token",response.data.token);
      cookies.set("role",response.data.role);

      return response.data.token;
      }
     catch (error) {
      handleApiError(error);
      throw error;
    }
  }
  return useMutation({
    mutationFn:loginUser
  })
}