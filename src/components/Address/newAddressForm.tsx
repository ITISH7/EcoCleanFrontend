import React, { useState } from 'react'
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { useForm } from 'react-hook-form';
import { AddressDetails } from '@/utils/types/types';
import { addressSchema } from '@/utils/ProfileValidations';
import { zodResolver } from '@hookform/resolvers/zod';
import update from '@/assets/icons/update.svg';
import { useAddAddress } from '@/utils/api/addressController/address';

const newAddressForm: React.FC<{ handleclose: () => void }> = ({ handleclose }) => {
  const[isCreating,_setIsCreating]=useState(false);
  const {mutateAsync:addAddress}=useAddAddress();
  const { register, reset,handleSubmit, formState: { errors } } = useForm<AddressDetails>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      houseNumber: "",
      locality: "",
      street: "",
      city: "",
      state: "",
      pinCode: "",
      country: "",
    },
  });
  const onClose=()=>{
    handleclose();
  }
  const handlecancel=()=>{
    reset();
  }
  const onSubmit=(data:AddressDetails)=>{
    addAddress(data);
    handleclose();
  }
  return (
    <Card className="p-6 mt-6 lg:w-[90%] mx-4">
    <div className="flex justify-between mb-8 items-center">
      <p className="text-[18px] font-bold  text-secondary-green">
        Create New Address
      </p>
      {!isCreating && (
        <Button
          className="flex bg-white box-border border-2 border-secondary-green items-center rounded-xl hover:bg-gray-100 cursor-pointer"
          onClick={onClose}
        >
          <p className="text-black  text-[18px] ">
            close
          </p>
        </Button>
      )}
    </div>
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-col-1 md:grid-cols-2 gap-6 min-w-full mb-6 items-center"> 

      {(["houseNumber","locality","street","city","state","country","pinCode"]as (keyof AddressDetails)[]).map((key) => (
          <div key={key} className="w-full">
            <p className="text-[18px] font-bold">{key}</p>  
                <input
                {...register(key)}
                  type="text"
                  className={`w-full bg-gray-100 min-h-[40px] mt-4 rounded-xl font-bold text-left md:text-[16px] text-gray-600 px-2 pt-2 ${
                    !isCreating
                      ? "border-2 outline-0 box-border border-green-500"
                      : ""
                  } ${ errors[key]?.message ? "border-2 border-red-500" : ""}`}
                  
                  disabled={isCreating}
                />
                {errors[key] && (
        <p className="text-red-500 text-sm mt-1">{errors[key as keyof AddressDetails]?.message}</p>
      )}
      </div>
    ))}
        {!isCreating && (
          <div className=" w-[100%] flex justify-end mt-8 mx-8 md:mx-0">
            <Button
              className="flex bg-red-700 items-center rounded-xl hover:bg-red-400 cursor-pointer "
              onClick={handlecancel}
            >
              <img
                src={update}
                className="h-[20px] hidden : md:block"
                alt=""
              />
              <p className="text-white text-[18px] ">
                cancel
              </p>
            </Button>
            <Button
              className="flex bg-secondary-green items-center rounded-xl hover:bg-primary-green mx-2 md:mx-6 mr-5 cursor-pointer "
              type="submit"
            >
              <img
                src={update}
                className="h-[20px] hidden : md:block"
                alt=""
              />
              <p className="text-white text-[18px] ">
                save
              </p>
            </Button>
          </div>
        )}
      </div>
    </form>
  </Card>
  )
}
export default newAddressForm;