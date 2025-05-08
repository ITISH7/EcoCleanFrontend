import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../queryKeys";
import { Statistics } from "../types/statistics";
import axios from "axios";

const API_BASE_URL = "http://localhost:8080/"; // Replace with actual API URL
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const handleApiError = (error: unknown): never => {
  if (axios.isAxiosError(error)) {
    throw new Error(error.response?.data?.message || "API request failed");
  }
  throw new Error("An unexpected error occurred");
};
const fetchStatistics = async (): Promise<Statistics[]> => {
  try {
    const response = await apiClient.get<Statistics[]>("homepage-statistics");
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
  return [];
}
export const useStatistics = () => {
  const {data,isLoading,error,isError}= useQuery<Statistics[]>({
      queryKey: [QUERY_KEYS.STATISTICS],
      queryFn: fetchStatistics,
      staleTime: 5 * 60 * 1000, 
      retry: 2,
    });
    return {data,isLoading,error,isError};
  };