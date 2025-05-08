import { handleApiError } from "@/utils/errorHandler";
import { QUERY_KEYS } from "@/utils/queryKeys";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Cookies from "universal-cookie";
import { apiClient } from "@/utils/api/index";
import { PersonalDetails, UserData } from "@/utils/types/types";
import { toast } from "sonner";

//get user details
export const useUserData = () => {
    const cookies = new Cookies();
    const token = cookies.get("token");
    const getUserData = async (token: string): Promise<UserData> => {
      try {
        const response = await apiClient.get<UserData>("/user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        return response.data;
      } catch (error) {
        handleApiError(error);
      }
      return {firstName:"",lastName:"",address:[],email:"",phoneNumber:""}
    };
  const { data, isLoading, error, isError,isSuccess } = useQuery<UserData>({
    queryKey: [QUERY_KEYS.USER_DATA,token],
    queryFn: () => getUserData(token),
    staleTime: 5 * 60 * 1000,
    retry: 2,
    enabled: !!token, 
  });

  return { data, isLoading, error, isError ,isSuccess};
};

//update user details

export const useUpdateUser = () => {
    const queryClient = useQueryClient();
    const updateUserData = async (userData: PersonalDetails): Promise<PersonalDetails> => {
      try {
        const cookies = new Cookies();
        const token = cookies.get("token");
    
        const response = await apiClient.put<PersonalDetails>("/user", userData, {
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
    return useMutation({
      mutationFn: updateUserData,
      onSuccess: () => {
        toast.success("User data updated successfully");
        queryClient.invalidateQueries({queryKey:[QUERY_KEYS.USER_DATA]});
      },
      onError: (error) => {
        toast.error("Failed to update user details error: " + error);
      },
    });
  };
