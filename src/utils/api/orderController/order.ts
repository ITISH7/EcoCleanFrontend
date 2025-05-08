import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { FilterParams, OrderDetails } from "@/utils/types/types";
import Cookies from "universal-cookie";
import { apiClient } from "@/utils/api/index";
import { handleApiError } from "@/utils/errorHandler";
import { QUERY_KEYS } from "@/utils/queryKeys";
import { UUID } from "crypto";

// Create order
export const useCreateOrder = () => {
  const createJunkOrder = async (data: OrderDetails) => {
    try {
      const cookies = new Cookies();
      const token = cookies.get("token");
      const junkItems = data.junkdetails.map((item) => {
        return {
          junkType: item.junkType,
          weight: item.JunkWeight,
        };
      });
      const response = await apiClient.post(
        "/order",
        {
          addressId: data.addressId,
          junkItems: junkItems,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      handleApiError(error);
      throw error;
    }
  };
  return useMutation({
    mutationFn: createJunkOrder,
    onSuccess: () => {
      toast.success(" order created  Successfully");
      setTimeout(() => {
        window.location.href = "/dashboard/schedulepickup/success";
      }, 1500);
    },
    onError: (error) => {
      toast.error("Failed to create order error: " + error);
    },
  });
};

//get Order Details

export const usegetAllPendingOrderHistory = () => {
  const cookies = new Cookies();
  const token = cookies.get("token");
  const getAllOrderHistory = async (token: string) => {
    try {
      const response = await apiClient.get("/order/filterOrders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          status: "pending",
        },
      });
      return response.data.content;
    } catch (error) {
      handleApiError(error);
      throw error;
    }
  };
  const { data, isLoading, error, isError, isSuccess } = useQuery({
    queryKey: [QUERY_KEYS.PENDING_ORDERS, token],
    queryFn: () => getAllOrderHistory(token),
    staleTime: 5 * 60 * 1000,
    retry: 2,
    enabled: !!token,
  });

  return { data, isLoading, error, isError, isSuccess };
};

export const usegetAllOrderHistory = () => {
  const cookies = new Cookies();
  const token = cookies.get("token");
  const getAllOrderHistory = async (token: string) => {
    try {
      const response = await apiClient.get("/order", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.content;
    } catch (error) {
      handleApiError(error);
      throw error;
    }
  };
  const { data, isLoading, error, isError, isSuccess } = useQuery({
    queryKey: [QUERY_KEYS.ORDER, token],
    queryFn: () => getAllOrderHistory(token),
    staleTime: 5 * 60 * 1000,
    retry: 2,
    enabled: !!token,
  });

  return { data, isLoading, error, isError, isSuccess };
};
//get order history by id

export const usegetOrderHistorybyId = (orderId: string | undefined) => {
  const cookies = new Cookies();
  const token = cookies.get("token");
  const getOrderHistorybyId = async (token: string, orderId: string) => {
    try {
      const response = await apiClient.get(`/order/${orderId}`, {
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
  if (orderId) {
    const { data, isLoading, error, isError, isSuccess } = useQuery({
      queryKey: [QUERY_KEYS.INDIVIDUAL_ORDER, token, orderId],
      queryFn: () => getOrderHistorybyId(token, orderId),
      staleTime: 5 * 60 * 1000,
      retry: 2,
      enabled: !!token && !!orderId,
    });

    return { data, isLoading, error, isError, isSuccess };
  } else {
    toast.error("Order Id is not available");
    return {
      data: undefined,
      isLoading: false,
      error: undefined,
      isError: false,
      isSuccess: false,
    };
  }
};

//cancel order

export const useCancelOrder = () => {
  const queryClient = useQueryClient();

  const cancelOrder = async (orderId: string) => {
    const cookies = new Cookies();
    const token = cookies.get("token");
    try {
      const response = await apiClient.put(
        `/order/cancel-order/${orderId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data.content;
    } catch (error) {
      handleApiError(error);
      throw error;
    }
  };
  return useMutation({
    mutationFn: cancelOrder,
    onSuccess: () => {
      toast.success(" your order is canceled Successfully");
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.ORDER] });
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 1500);
    },
    onError: (error) => {
      toast.error("Failed to cancel order error: " + error);
    },
  });
};

// Filtered Orders

export const usegetFilteredOrders = (params: FilterParams) => {
  const cookies = new Cookies();
  const token = cookies.get("token");
  const getFilteredOrders = async () => {
    if (!token) throw new Error("Unauthorized: No token found");
    try {
      const response = await apiClient.get("/order/filterOrders", {
        headers: { Authorization: `Bearer ${token}` },
        params,
      });
      return response.data.content;

    } catch (error) {
      handleApiError(error);
      throw error;
    }
  };
  const {data,isLoading,isError,error,refetch}= useQuery({
    queryKey: [QUERY_KEYS.ORDER, token, params],
    queryFn: getFilteredOrders,
    staleTime: 5 * 60 * 1000,
    retry: 2,
    enabled: false,
  });
  return {data,isLoading,isError,error,refetch};
};

// delete Order

export const useDeleteOrder = () => {
  const cookies = new Cookies();
  const token = cookies.get("token");
  const queryClient = useQueryClient(); 

  const deleteOrder = async (orderId: string) => {
    if (!token) throw new Error("Unauthorized: No token found");

    try {
      const response = await apiClient.delete(`/order/${orderId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      handleApiError(error);
      throw error;
    }
  };

  return useMutation({
    mutationFn: deleteOrder,
    onSuccess: () => {
      toast.success("Order Deleted Successfully");
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.INDIVIDUAL_ORDER] });
    },
    onError: (error) => {
      toast.error("Failed to delete order error: " + error);
    },
  });
};



export const usegetInterestedMerchantsDetails = (orderId:UUID) => {
  const cookies = new Cookies();
  const token = cookies.get("token");
  console.log("order Id Is ",orderId);
  const getmerchants = async () => {
    if (!token) throw new Error("Unauthorized: No token found");

    try {
      const response = await apiClient.get("/order/applied-merchants", {
        headers: { Authorization: `Bearer ${token}` },
        params:{
          id:orderId
        }
      });
      console.log("response is ", response.data);
      console.log("data is ", response.data);
      console.log("content is ", response.data.content);
      return response.data.content;

    } catch (error) {
      console.log("error is ", error);
      handleApiError(error);
      throw error;
    }
  };

  const {data,isLoading,isError,error,refetch}= useQuery({
    queryKey: [QUERY_KEYS.MERCHANT_ORDER_DETAILS_WHICH_ARE_INTERESTED_FOR_A_PERTICULAR_ORDER, token,orderId],
    queryFn: getmerchants,
    staleTime: 5 * 60 * 1000,
    retry: 2,
    enabled:!!token,
  });
  return {data,isLoading,isError,error,refetch};
};


export const usegetSpecificOrderDetails = (orderId:UUID) => {
  const cookies = new Cookies();
  const token = cookies.get("token");
  console.log("order Id Is ",orderId);
  const getmerchants = async () => {
    if (!token) throw new Error("Unauthorized: No token found");

    try {
      const response = await apiClient.get("/order-details", {
        headers: { Authorization: `Bearer ${token}` },
        params:{
          id:orderId
        }
      });
      console.log("response is ", response);
      console.log("data is",response.data);
      return response.data;

    } catch (error) {
      console.log("error is ", error);
      handleApiError(error);
      throw error;
    }
  };

  const {data,isLoading,isError,error,refetch}= useQuery({
    queryKey: [QUERY_KEYS.Specififc_ORDER_DETAILS, token,orderId],
    queryFn: getmerchants,
    staleTime: 5 * 60 * 1000,
    retry: 2,
    enabled:!!token,
  });
  return {data,isLoading,isError,error,refetch};
};
