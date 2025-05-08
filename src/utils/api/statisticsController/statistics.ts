import { handleApiError } from "@/utils/errorHandler";
import { QUERY_KEYS } from "@/utils/queryKeys";
import { AdminStatisics, HomePageStatistics } from "@/utils/types/types";
import { useQuery } from "@tanstack/react-query";
import Cookies from "universal-cookie";
import { apiClient } from "@/utils/api/index";

//hompage Statistics
export const useHomePageStatistics=()=>{
  const cookies = new Cookies();
  const token = cookies.get("token");
  const getHomPageStatistics = async (): Promise<HomePageStatistics[]>=>{
    try{
      const response = await apiClient.get<HomePageStatistics[]>('/homepage-statistics',{
        headers:{
          Authorization: `Bearer ${token}`,
        },
      })
      return response.data;
    }
    catch(error){
      handleApiError(error);
      throw error;
    }
  }
  const {data,isError,error,isSuccess}= useQuery<HomePageStatistics[]>({
    queryKey:[QUERY_KEYS.HOMEPAGE_STATISTICS,token],
    queryFn: getHomPageStatistics,
    staleTime: 5 * 60 * 1000,
    retry:2,
    enabled:!!token,
  })
  return {data,isError,error,isSuccess}
}
//get admin statistics by emails
export const useGetAdminStatisticsByEmail = (email:string) => {
    const cookies = new Cookies();
    const token = cookies.get("token");
    const getAdminStatisticsByEmail  = async (): Promise<AdminStatisics> => {
      try {
        const response = await apiClient.get<AdminStatisics>(`/admin-stats/${email}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        return response.data;
      } catch (error) {
        handleApiError(error);
      }
      return {completedOrders:0,pendingOrders:0,cancelledOrders:0,ongoingOrders:0};
    };
  const { data, isLoading, error, isError,isSuccess } = useQuery<AdminStatisics>({
    queryKey: [QUERY_KEYS.ADMIN_STATISTICS,token],
    queryFn: getAdminStatisticsByEmail,
    staleTime: 5 * 60 * 1000,
    retry: 2,
    enabled: !!token, 
  });
  return { data, isLoading, error, isError ,isSuccess};
};
