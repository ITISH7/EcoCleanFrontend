import { handleApiError } from "@/utils/errorHandler";
import { QUERY_KEYS } from "@/utils/queryKeys";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "universal-cookie";

const useGetAPI = <T,>(endPoint: string, queryKey: keyof typeof QUERY_KEYS) => {
  const cookies = new Cookies();
  const token = cookies.get("token");

  // Helper function to fetch data from API
  const getUserDetails = async (): Promise<T> => {
    if (!token) throw new Error("Unauthorized: No token found");

    try {
      const response = await axios.get<T>(`http://localhost:8080/${endPoint}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      handleApiError(error);
      throw error; 
    }
  };

  return useQuery<T>({
    queryKey: [QUERY_KEYS[queryKey], token],
    queryFn: getUserDetails,
    enabled: !!token,
  });
};

export default useGetAPI;
