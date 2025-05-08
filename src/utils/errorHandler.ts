import axios from "axios";
import { toast } from "sonner";
import Cookies from "universal-cookie";

export const handleApiError = (error: unknown): never => {
  const cookies = new Cookies();
    if (axios.isAxiosError(error)) {
      if(error.status==401||error.status==403){
        cookies.remove("token");
        cookies.remove("role");
        toast.error("Unauthorized access. Redirecting to login...");
        // window.location.href = "/loginandsignup/login"; 
      }
      console.log(error);
      toast.error(error.response?.data||"An unexpected error occurred");
      throw new Error(error.message||"Network Error");
      
    }
    throw new Error("An unexpected error occurred");
  };
  