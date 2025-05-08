import axios from "axios";
import { Statistics } from "@/utils/types/statistics";  

const API_BASE_URL = "http://localhost:8080/"; // Replace with actual API URL

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Custom error handling
const handleApiError = (error: unknown): never => {
  if (axios.isAxiosError(error)) {
    throw new Error(error.response?.data?.message || "API request failed");
  }
  throw new Error("An unexpected error occurred");
};

// Fetch statistics
export const fetchStatistics = async (): Promise<Statistics[]> => {
  try {
    const response = await apiClient.get<Statistics[]>("homepage-statistics");
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
  return [];
}