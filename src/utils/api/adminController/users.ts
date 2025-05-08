import { handleApiError } from "@/utils/errorHandler";
import { QUERY_KEYS } from "@/utils/queryKeys";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Cookies from "universal-cookie";
import { apiClient } from "@/utils/api/index";
import {FilteredData, SpecificOrderDetails, User, UserData, UsersResponse} from "@/utils/types/types"
import { toast } from "sonner";

//get user details
export const useGetAllUsers = (pageable?: {
  page?: number;
  size?: number;
  sort?: string[];
}) => {
  const cookies = new Cookies();
  const token = cookies.get("token");

  const getAllUsers = async (): Promise<UsersResponse> => {
    if (!token) throw new Error("Unauthorized: No token found");

    try {
      const response = await apiClient.get<UsersResponse>("/users", {
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

  const { data, isLoading, error, isError, isSuccess } = useQuery({
    queryKey: [QUERY_KEYS.USER_DATA, pageable],
    queryFn: getAllUsers,
    staleTime: 5 * 60 * 1000,
    retry: 2,
    enabled: !!token, 
  });

  return { data, isLoading, error, isError, isSuccess };
};

//get users by role

export const useGetUsersByRole = (role:string,pageable?: {
    page?: number;
    size?: number;
    sort?: string[];
  }) => {
    const cookies = new Cookies();
    const token = cookies.get("token");
    const getUsersByRole = async (role:string): Promise<User[]> => {
      try {
        const response = await apiClient.get(`/users/${role}`, {
            params:pageable,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        return response.data.content;
      } catch (error) {
        handleApiError(error);
      }
      return [{email:"",firstName:"",lastName:"",role:""}]
    };
  const { data, isLoading, error, isError,isSuccess,refetch } = useQuery<User[]>({
    queryKey: [QUERY_KEYS.USER,token],
    queryFn:()=> getUsersByRole(role),
    staleTime: 5 * 60 * 1000,
    retry: 2,
    enabled: !!token, 
  });

  return { data, isLoading, error, isError ,isSuccess,refetch};
};

//get user by emails

export const useGetUserByEmail = (email:string,pageable: {
    page: number;
    size: number;
    sort: string[];
  }) => {
    const cookies = new Cookies();
    const token = cookies.get("token");
    const getUserByEmail = async (): Promise<User[]> => {
      try {
        const response = await apiClient.get<User[]>(`/user/${email}`, {
            params:pageable,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        return response.data;
      } catch (error) {
        handleApiError(error);
      }
      return [{firstName:"",lastName:"",email:"",role:""}]
    };
  const { data, isLoading, error, isError,isSuccess } = useQuery<User[]>({
    queryKey: [QUERY_KEYS.USER,token],
    queryFn: getUserByEmail,
    staleTime: 5 * 60 * 1000,
    retry: 2,
    enabled: !!token, 
  });

  return { data, isLoading, error, isError ,isSuccess};
};

// unBlock users by email
export const useUnBlockUsersByEmail = (email:string) => {
  const cookies = new Cookies();
  const token = cookies.get("token");
  const queryClient = useQueryClient(); 
  const unBlockUsersByEmail = async (email:string) => {
    try {
      const response = await apiClient.put(`/user/${email}`,{}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  };

  const { mutate, data, isError, error, isPending, isSuccess } = useMutation({
      mutationFn: ()=>unBlockUsersByEmail(email),
      onSuccess: () => {
        toast.success("User Un-Blocked Successfully");
        queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.USER_DATA] });
      },
      onError: (error) => {
        toast.error("Failed to un-block user!\n Error: " + error);
      },
    });
    return { mutate, data, isError, error, isPending, isSuccess };
};
// Block users by email
export const useBlockUsersByEmail = (email:string) => {
    const cookies = new Cookies();
    const token = cookies.get("token");
    const queryClient = useQueryClient(); 
    const blockUsersByEmail = async (email:string) => {
      try {
        const response = await apiClient.delete(`/user/${email}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        return response.data;
      } catch (error) {
        handleApiError(error);
      }
    };
  
    const { mutate, data, isError, error, isPending, isSuccess } = useMutation({
        mutationFn: ()=>blockUsersByEmail(email),
        onSuccess: () => {
          toast.success("User Blocked Successfully");
          queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.USER] });
        },
        onError: (error) => {
          toast.error("Failed to block user!\n Error: " + error);
        },
      });
    
      return { mutate, data, isError, error, isPending, isSuccess };
};
//get user details by email

export const useGetUserDetailsByEmail = (email:string) => {
    const cookies = new Cookies();
    const token = cookies.get("token");
    const getUserDetailsByEmail = async (token: string): Promise<UserData> => {
      try {
        const response = await apiClient.get(`/user-details/${email}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        return response.data;
      } catch (error) {
        handleApiError(error);
      }
      return {firstName:"",lastName:"",email:"",address:[],phoneNumber:""}
    };
  const { data, isLoading, error, isError,isSuccess,refetch } = useQuery<UserData>({
    queryKey: [QUERY_KEYS.INDIVIDUAL_USER,token],
    queryFn: () => getUserDetailsByEmail(token),
    staleTime: 5 * 60 * 1000,
    retry: 2,
    enabled: !!token, 
  });

  return { data, isLoading, error, isError ,isSuccess, refetch};
};

//Specific Order Details

export const useGetSpecificOrderDetails = (orderId: string | undefined) => {
  const cookies = new Cookies();
  const token = cookies.get("token");
  const getSpecificOrderDetails = async (): Promise<SpecificOrderDetails> => {
    try {
      const response = await apiClient.get<SpecificOrderDetails>(`/specific-order-details/${orderId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      handleApiError(error);
      throw error;
    }
  };if (orderId) {
    const { data, isLoading, error, isError, isSuccess,refetch } = useQuery<SpecificOrderDetails>({
      queryKey: [QUERY_KEYS.SPECIFIC_ORDER_DETAILS, token, orderId],
      queryFn:getSpecificOrderDetails,
      staleTime: 5 * 60 * 1000,
      retry: 2,
      enabled: !!token && !!orderId,
    });

    return { data, isLoading, error, isError, isSuccess, refetch };
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
}
// get Order History

export const useGetOrderHistory = (pageable?: {
    page?: number;
    size?: number;
    sort?: string[];
  }) => {
    const cookies = new Cookies();
    const token = cookies.get("token");
  
    const getOrderHistory = async (): Promise<FilteredData[]> => {
      if (!token) throw new Error("Unauthorized: No token found");
  
      try {
        const response = await apiClient.get('/order-history', {
          params: pageable,
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
      queryKey: [QUERY_KEYS.ORDER_HISTORY, pageable],
      queryFn: getOrderHistory,
      staleTime: 5 * 60 * 1000,
      retry: 2,
      enabled: !!token, 
    });
  
    return { data, isLoading, error, isError, isSuccess };
  };

  //filtered Orders
  export const useGetFilterOrders = (params:{
    page?: number;
    size?: number;
    sort?: string[];
   firstDate?: string, secondDate?: string, minPrice?: number, maxPrice?: number, status?: string}) => {
    const cookies = new Cookies();
    const token = cookies.get("token");
    
    const getFilterOrders = async () => {
      if (!token) throw new Error("Unauthorized: No token found");
      try {
        const response = await  apiClient.get('/filter-orders', {
          params: params,
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

    const { data, isLoading, error, isError, isSuccess,refetch } = useQuery({
      queryKey: [QUERY_KEYS.ADMIN_FILTER_ORDER, token],
      queryFn: getFilterOrders,
      staleTime: 5 * 60 * 1000,
      retry: 2,
      enabled: !!token, 
    });
  
    return { data, isLoading, error, isError, isSuccess,refetch };
  };

// deleted users

export const useGetDeletedUsers = (pageable?: {
    page?: number;
    size?: number;
    sort?: string[];
  }) => {
    const cookies = new Cookies();
    const token = cookies.get("token");
    const getOrderHistory = async (): Promise<UsersResponse> => {
      if (!token) throw new Error("Unauthorized: No token found");
  
      try {
        const response = await apiClient.get<UsersResponse>("/deleted-users", {
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
  
    const { data, isLoading, error, isError, isSuccess, refetch} = useQuery<UsersResponse>({
      queryKey: [QUERY_KEYS.USER_DATA, pageable],
      queryFn: getOrderHistory,
      staleTime: 5 * 60 * 1000,
      retry: 2,
      enabled: !!token, 
    });
  
    return { data, isLoading, error, isError, isSuccess, refetch };
  };