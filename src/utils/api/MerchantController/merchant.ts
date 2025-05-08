import { AvailableOrderContent, ClientDetails, MerchantStatistics } from "@/utils/types/types";
import Cookies from "universal-cookie";
import { apiClient } from "..";
import { handleApiError } from "@/utils/errorHandler";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/utils/queryKeys";
import { toast } from "sonner";
import { UUID } from "crypto";

export const useGetMerchantStatistics = () => {
    const cookies = new Cookies();
    const token = cookies.get("token");
    const getMerchantStatistics = async (token: string): Promise<MerchantStatistics[]> => {
      try {
        const response = await apiClient.get<MerchantStatistics[]>("/pickup-statistics", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response.data);
        return response.data;
      } catch (error) {
        console.log(error)
      }
      return [];
    };
    const { data, isLoading, error, isError, isSuccess } = useQuery({
        queryKey: [QUERY_KEYS.MERCHANT_STATISTICS, token],
        queryFn: () => getMerchantStatistics(token),
        staleTime: 5 * 60 * 1000,
        enabled: !!token,
      });
    
      return { data, isLoading, error, isError, isSuccess };
}


export const useGetMerchantExpenses = () => {
    const cookies = new Cookies();
    const token = cookies.get("token");
    const getMerchantExpenses = async (token: string): Promise<number> => {
      try {
        const response = await apiClient.get<number>("/merchant-expenses", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        return response.data;
      } catch (error) {
        console.log(error);
      }
      return 0;
    };
    const { data, isLoading, error, isError, isSuccess } = useQuery({
        queryKey: [QUERY_KEYS.MERCHANT_EXPENSES, token],
        queryFn: () => getMerchantExpenses(token),
        staleTime: 5 * 60 * 1000,
        enabled: !!token,
      });
    
      return { data, isLoading, error, isError, isSuccess };
}

export const useGetAvailableOrder = ()=> {
    const cookies = new Cookies();
    const token = cookies.get("token");
    const getAvailableOrder = async (token: string):Promise<AvailableOrderContent[]>  => {
      try {
        const response = await apiClient.get("/order-list", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        return response.data.content;
      } catch (error) {
        console.log(error);
        handleApiError(error);
      }
      return [];
    };
    const { data, isLoading, error, isError, isSuccess,refetch } = useQuery({
        queryKey: [QUERY_KEYS.AVAILABLE_ORDERS, token],
        queryFn: () => getAvailableOrder(token),
        staleTime: 5 * 60 * 1000,
        enabled: !!token,
      });
    
      return { data, isLoading, error, isError, isSuccess ,refetch};
}

export const useGetUserDetailsByorderId = (id?:string)=> {
    const cookies = new Cookies();
    const token = cookies.get("token");

    const getUserDetailsByOrderId = async (token: string,id:string) => {
      if(id){
      try {
        const response = await apiClient.get("/user-detail", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params:{
            id:id
          }
        });
        console.log("response is ",response);
        return response.data;
      } catch (error) {
        console.log(error);
        handleApiError(error);
      }
    }
      return {} as ClientDetails;
    };
    const { data, isLoading, error, isError, isSuccess, refetch } = useQuery({
        queryKey: [QUERY_KEYS.SPECIFIC_USER_DETAILS, token],
        queryFn: () => getUserDetailsByOrderId(token!,id!),
        staleTime: 5 * 60 * 1000,
        enabled: !!token,
        retry: 2,
      });
      return { data, isLoading, error, isError, isSuccess, refetch };
}

export const useAcceptOrder = ()=>{
  const queryClient = useQueryClient();
  const cookies = new Cookies();
  const token = cookies.get("token");
  const acceptOrder = async (orderId:UUID):Promise<boolean>  => {
    console.log(orderId);
    try {
      const response = await apiClient.post(
      "/apply-pickup",
      {},
      {
        headers: {
        Authorization: `Bearer ${token}`,
        },
        params: {
        id: orderId,
        },
      }
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
    return false;
    }
    return useMutation({
    mutationFn: acceptOrder,
    onSuccess: () => {
      toast.success(" your Have Applied for the Order Successfully");
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.AVAILABLE_ORDERS,token] });
      setTimeout(()=>{
        window.location.href = "/merchant/available-orders";
      },1000)
    },
    onError: (error) => {
      toast.error("Failed to cancel order error: " + error);
    },
  });
}


export const useRejectOrder = ()=>{
  const queryClient = useQueryClient();
  const cookies = new Cookies();
  const token = cookies.get("token");
  const acceptOrder = async (orderId:UUID):Promise<boolean>  => {
    console.log(orderId);
    try {
      const response = await apiClient.put(
      "/reject-pickup",
      {},
      {
        headers: {
        Authorization: `Bearer ${token}`,
        },
        params: {
        id: orderId,
        },
      }
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
    return false;
    }
    return useMutation({
    mutationFn: acceptOrder,
    onSuccess: () => {
      toast.success(" you Rejected the order Successfully");
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.AVAILABLE_ORDERS,token] });
      setTimeout(()=>{
        window.location.href = "/merchant/available-orders";
      },1000)
    },
    onError: (error) => {
      toast.error("Failed to cancel order error: " + error);
    },
  });
}


export const useGetApplieOrder = ()=> {
  const cookies = new Cookies();
  const token = cookies.get("token");
  const getAvailableOrder = async (token: string):Promise<AvailableOrderContent[]>  => {
    try {
      const response = await apiClient.get("/applied-pickups", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.content;
    } catch (error) {
      console.log(error);
      handleApiError(error);
    }
    return [];
  };
  const { data, isLoading, error, isError, isSuccess,refetch } = useQuery({
      queryKey: [QUERY_KEYS.APPLIED_ORDERS, token],
      queryFn: () => getAvailableOrder(token),
      staleTime: 5 * 60 * 1000,
      enabled: !!token,
    });
  
    return { data, isLoading, error, isError, isSuccess,refetch };
}

