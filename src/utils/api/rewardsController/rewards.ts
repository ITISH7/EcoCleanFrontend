import { handleApiError } from "@/utils/errorHandler";
import { QUERY_KEYS } from "@/utils/queryKeys";
import { useQuery } from "@tanstack/react-query";
import Cookies from "universal-cookie";
import { apiClient } from "..";
import { Rewards } from "@/utils/types/types";

export const usegetUserRewards = () => {
    const cookies = new Cookies();
    const token = cookies.get("token");
    const getuserRewards= async () => {
      if (!token) throw new Error("Unauthorized: No token found");
  
      try {
        const response = await apiClient.get("/rewards", {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("response is ", response);
        return response.data;
  
      } catch (error) {
        console.log("error is ", error);
        handleApiError(error);
        throw error;
      }
    };
  
    const {data,isLoading,isError,error,refetch}= useQuery({
      queryKey: [QUERY_KEYS.USER_REWARDS, token],
      queryFn: getuserRewards,
      staleTime: 5 * 60 * 1000,
      retry: 2,
      enabled:!!token,
    });
    return {data,isLoading,isError,error,refetch};
  };
//get rewards by emails
export const useGetRewardsByEmail = (email:string) => {
    const cookies = new Cookies();
    const token = cookies.get("token");
    const getRewardsByEmail  = async (): Promise<Rewards> => {
      try {
        const response = await apiClient.get<Rewards>(`/rewards/user/${email}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        return response.data;
      } 
      catch (error) {
        handleApiError(error);
      }
      return {totalRewards:0};
    };
  const { data, isLoading, error, isError,isSuccess } = useQuery<Rewards>({
    queryKey: [QUERY_KEYS.REWARDS,token],
    queryFn: getRewardsByEmail,
    staleTime: 5 * 60 * 1000,
    retry: 2,
    enabled: !!token, 
  });

  return { data, isLoading, error, isError ,isSuccess};
};
