import { handleApiError } from "@/utils/errorHandler";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Cookies from "universal-cookie";
import { QUERY_KEYS } from "@/utils/queryKeys";
import { apiClient } from "@/utils/api/index";
import { toast } from "sonner";
import { JunkItemDetails } from "@/utils/types/types";

//get junk details
export const useGetJunkData = () => {
  const cookies = new Cookies();
  const token = cookies.get("token");
  async function getJunkData() {

    try {
      const response = await apiClient.get("/junk-details", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.content;
    } catch (error) {
      handleApiError(error);
      throw error;
    }
  }
  const { data, isLoading, error, isError,isSuccess } = useQuery({
    queryKey: [QUERY_KEYS.JUNK_DETAILS, token],
    queryFn: getJunkData,
    staleTime: 5 * 60 * 1000,
    retry:2,
    enabled: !!token,
  });
  return { data, isLoading, error, isError,isSuccess };
};

//update junk details 
export const useUpdateJunkDetails = () => {
  const cookies = new Cookies();
  const token = cookies.get("token");
  const queryClient = useQueryClient();

  async function updateJunkDetails(junkItemDetails:JunkItemDetails) { 
    if (!token) throw new Error("Unauthorized: No token found");

    try {
      const response = await apiClient.put("/junk-details",junkItemDetails, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      handleApiError(error);
      throw error;
    }
  }

  const { mutate, data, isError, error, isPending, isSuccess } = useMutation({
    mutationFn: updateJunkDetails, 
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.JUNK_DETAILS] });
      toast.success("Junk Item Updated Successfully");
    },
    onError: (error) => {
        toast.error("Failed to update junk details error: " + error);
      },
  });

  return { mutate, data, isError, error, isPending, isSuccess };
};

// post junk details
export const usePostJunkDetails = () => {
    const cookies = new Cookies();
    const token = cookies.get("token");
    const queryClient = useQueryClient();
  
    async function postJunkDetails(junkItemDetails:JunkItemDetails) { 
      if (!token) throw new Error("Unauthorized: No token found");
      try {
        const response = await apiClient.post("/junk-details",
          junkItemDetails,
          {
          headers: { Authorization: `Bearer ${token}` },
          });
        return response.data;
      } catch (error) {
        handleApiError(error);
        throw error;
      }
    }
  
    const { mutate, data, isError, error, isPending, isSuccess } = useMutation({
      mutationFn: postJunkDetails, 
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.JUNK_DETAILS] });
        toast.success("New Junk Item Created Successfully");
      },
      onError: (error) => {
        toast.error("Failed to post junk details error: " + error);
      },
    });
  
    return { mutate, data, isError, error, isPending, isSuccess };
  };
  
  //delete junk type
  export const useDeleteJunkDetails = () => {
    const cookies = new Cookies();
    const token = cookies.get("token");
    const queryClient = useQueryClient(); 
  
    const deleteJunkDetails = async (junkType: string) => {
      if (!token) throw new Error("Unauthorized: No token found");
  
      try {
        const response = await apiClient.delete(`/junk-details/${junkType}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
      } catch (error) {
        handleApiError(error);
        throw error;
      }
    };
  
    const { mutate, data, isError, error, isPending, isSuccess } = useMutation({
        mutationFn: deleteJunkDetails,
        onSuccess: () => {
            toast.success("Junk Details Deleted Successfully");
          queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.JUNK_DETAILS] });
        },
        onError: (error) => {
            toast.error("Failed to delete junk details error: " + error);
          },
      });
    
      return { mutate, data, isError, error, isPending, isSuccess };
 };
  