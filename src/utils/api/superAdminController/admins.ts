import { handleApiError } from "@/utils/errorHandler";
import { QUERY_KEYS } from "@/utils/queryKeys";
import { AdminsResponse } from "@/utils/types/types";
import { useQuery } from "@tanstack/react-query";
import Cookies from "universal-cookie";
import { apiClient } from "@/utils/api/index";

//get user details
export const useGetAllAdmins = (pageable?: {
    page?: number;
    size?: number;
    sort?: string[];
  }) => {
    const cookies = new Cookies();
    const token = cookies.get("token");
  
    const getAllAdmins = async (): Promise<AdminsResponse> => {
      if (!token) throw new Error("Unauthorized: No token found");
  
      try {
        const response = await apiClient.get<AdminsResponse>("/admin", {
          params: pageable,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        return response.data;
      } catch (error) {
        handleApiError(error);
        throw error;
      }
    };
  
    const { data, isLoading, error, isError, isSuccess,refetch } = useQuery({
      queryKey: [QUERY_KEYS.USER_DATA, pageable],
      queryFn: getAllAdmins,
      staleTime: 5 * 60 * 1000,
      retry: 2,
      enabled: !!token, 
    });
  
    return { data, isLoading, error, isError, isSuccess,refetch };
  };