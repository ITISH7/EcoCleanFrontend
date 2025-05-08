import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/utils/queryKeys";
import { Statistics } from "@/utils/types/statistics";
import { handleApiError } from "@/utils/errorHandler";
import { apiClient } from "@/utils/api/index";

export const useStatistics = () => {
  const fetchStatistics = async (): Promise<Statistics[]> => {
    try {
      const response = await apiClient.get<Statistics[]>("homepage-statistics");
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
    return [];
  }
  const {data,isLoading,error,isError}= useQuery<Statistics[]>({
      queryKey: [QUERY_KEYS.STATISTICS],
      queryFn: fetchStatistics,
      staleTime: 5 * 60 * 1000, 
      retry: 2,
    });
    return {data,isLoading,error,isError};
  };