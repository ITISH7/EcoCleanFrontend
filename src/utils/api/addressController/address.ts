import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/utils/queryKeys";
import { Address, AddressDetails } from "@/utils/types/types";
import Cookies from "universal-cookie";
import { handleApiError } from "@/utils/errorHandler";
import { apiClient } from "@/utils/api/index";
import { toast } from "sonner";

export const usegetAllAddress =()=>{
  const cookies = new Cookies();
  const token = cookies.get("token");
  const getAllAddresses = async(token:string):Promise<Address[]>=>{
    try {
      const response = await apiClient.get<Address[]>("/address", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      handleApiError(error);
      throw error;
    }
  }
    const { data, isLoading, error, isError,isSuccess } = useQuery<Address[]>({
    queryKey: [QUERY_KEYS.ADDRESS,token],
    queryFn: () => getAllAddresses(token),
    staleTime: 5 * 60 * 1000,
    retry: 2,
    enabled: !!token, 
    });

    return { data, isLoading, error, isError ,isSuccess};
} 

export const useUpdateAddress = ()=>{
  const queryClient = useQueryClient();
    const updateAddress =async(AddressData:Address):Promise<Address>=>{
        try {
        const cookies = new Cookies();
        const token = cookies.get("token");
    
        const response = await apiClient.put<Address>(`/address/${AddressData.addressId}`,
            {
            houseNumber:AddressData.houseNumber,
            street:AddressData.street,
            locality:AddressData.locality,
            city:AddressData.city,
            state:AddressData.state,
            country:AddressData.country,
            pinCode:AddressData.pinCode,
        }, {
            headers: {
            Authorization: `Bearer ${token}`,
            },
        });
    
        return response.data;
        } catch (error) {
        handleApiError(error);
        throw error; 
        }
    } 
  return useMutation({
    mutationFn:updateAddress,
    onSuccess:()=>{
      toast.success("Address Updated Successfully");
      queryClient.invalidateQueries({queryKey:[QUERY_KEYS.ADDRESS]});
    },
    onError: (error) => {
      toast.error("Failed to update address error: " + error);
    },
  })
}

export const useAddAddress = ()=>{
  const queryClient = useQueryClient();
  const addAddress =async(AddressData:AddressDetails):Promise<AddressDetails>=>{
    try {
      const cookies = new Cookies();
      const token = cookies.get("token");

      const response = await apiClient.post<AddressDetails>(`/address`,
        {
        houseNumber:AddressData.houseNumber,
        street:AddressData.street,
        locality:AddressData.locality,
        city:AddressData.city,
        state:AddressData.state,
        country:AddressData.country,
        pinCode:AddressData.pinCode,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error) {
      handleApiError(error);
      throw error; 
    }
  } 
  return useMutation({
    mutationFn:addAddress,
    onSuccess:()=>{
      toast.success("Address Added Successfully");
      queryClient.invalidateQueries({queryKey:[QUERY_KEYS.ADDRESS]});
    },
    onError: (error) => {
      toast.error("Failed to add address error: " + error);
    },
  })
}

export const useDeleteAddress = ()=>{
  const queryClient = useQueryClient();
  const deleteAddress =async(AddressId:number)=>{
    try {
    const cookies = new Cookies();
    const token = cookies.get("token");

    const response = await apiClient.delete(`/address/${AddressId}`,
        {
        headers: {
        Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
    } catch (error) {
    handleApiError(error);
    throw error; 
    }
} 
  return useMutation({
    mutationFn:deleteAddress,
    onSuccess:()=>{
      toast.success("Address Deleted Successfully");
      queryClient.invalidateQueries({queryKey:[QUERY_KEYS.ADDRESS]});
    },
    onError: (error) => {
      toast.error("Failed to delete address error: " + error);
    },
  })
}

export const useUpdatePrimaryAddress = ()=>{
  const queryClient = useQueryClient();
  const updatePrimaryAddress =async(AddressId:number)=>{
    try {
      const cookies = new Cookies();
      const token = cookies.get("token");
      const response = await apiClient.put(`/address/change-primary-address/${AddressId}`,{},
         {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      handleApiError(error);
      throw error; 
    }
  } 
  return useMutation({
    mutationFn:updatePrimaryAddress,
    onSuccess:()=>{
      toast.success("Primary Address Updated SuccessfullY");
      queryClient.invalidateQueries({queryKey:[QUERY_KEYS.ADDRESS]});
    },
    onError: (error) => {
      toast.error("Failed to update primary address error: " + error);
    },
  })
}