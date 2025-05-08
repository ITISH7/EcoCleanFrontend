import Title from "@/components/Title";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import user from "@/assets/icons/user.svg";
import update from "@/assets/icons/update.svg";
import React, { useEffect, useState } from "react";
import { formattedDate } from "@/utils/utils";
import { profileDetails } from "@/utils/constants/constants";
import { useUpdateUser, useUserData } from "@/utils/api/profileController/userDetails";
import {  useForm } from "react-hook-form";
import { PersonalDetails } from "@/utils/types/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { personalDetailSchema } from "@/utils/ProfileValidations";
import { toast } from "sonner";
const Myprofile: React.FC = () => {
  const [isUpdate, setIsUpdate] = useState(true);
  const { data, isLoading, isSuccess ,isError,error} = useUserData();
  const {mutateAsync:updateuser} = useUpdateUser();

  const { register, handleSubmit, reset ,formState:{errors}} = useForm<PersonalDetails>({
    resolver: zodResolver(personalDetailSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      phoneNumber: "",
    }, 
  });
  const address={
        houseNumber: data?.address[0].houseNumber||"",
        locality: data?.address[0].locality||"",
        street: data?.address[0].street||"",
        city: data?.address[0].city||"",
        state: data?.address[0].state||"",
        country: data?.address[0].country||"",
        pinCode: data?.address[0].pinCode||"",
  };

  const email = data?.email || "";
  const handleUpdate = () => {
    setIsUpdate(false);
  };
  const handlecancel = () => {
    reset();
    setIsUpdate(true);
  };
  const onSubmit = (formData: PersonalDetails) => {
    updateuser(formData)
    setIsUpdate(true);
    
  };

  useEffect(() => {
    if (isSuccess && data) {
      reset({
        firstName: data?.firstName,
        lastName: data?.lastName,
        phoneNumber: data?.phoneNumber,
      });
    }
  }, [data,reset]);
  useEffect(() => {
    if (isError) {
      toast.error(`${error}`);
    }
  }, [isError]);
  return (
    <div className="w-[90vw] md:w-[100vw] lg:w-[75%] mx-4">
      <Title title={`Welcome! ${data?.firstName || ""}`}  className="mx-2"/>
      <div className="text-gray-600 flex justify-between ">
        <p className="text-[18px] font-primary-medium mt-4 mx-2">
          {formattedDate}
        </p>
      </div>
      {isLoading && <p>Loading...</p>}
      {/* basic information */}
      <Card className="p-0 mt-6 lg:w-[75vw]">
        <div className=" flex p-2 items-center">
          <img src={user} className="h-[70px] " alt="" />
          <div className="mx-8">
            <p className="text-[20px] font-bold ">
              {data?.firstName} {data?.lastName}
            </p>
            <p className="text-[16px] font-bold text-gray-500 ">{email}</p>
          </div>
        </div>
      </Card>
      {/* personal information */}
      <Card className="p-6 mt-6 lg:w-[75vw] ">
        <div className="flex justify-between mb-8 items-center">
          <p className="text-[18px] font-bold  text-secondary-green">
            {profileDetails.personalInformationHeading}
          </p>
          {isUpdate && (
            <Button
              className="flex bg-secondary-green items-center rounded-xl hover:bg-primary-green"
              onClick={handleUpdate}
            >
              <img src={update} className="h-[20px] hidden md:block" alt="" />
              <p className="text-white  text-[18px] ">
                {profileDetails.update}
              </p>
            </Button>
          )}
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-col-1 md:grid-cols-2 gap-6   md:min-w-full mb-6 items-center"> 

          {(["firstName","lastName","phoneNumber"]as (keyof PersonalDetails)[]).map((key) => (
              <div key={key} className="w-full">
                <p className="text-[18px] font-bold">{key}</p>  
                    <input
                    {...register(key)}
                      type="text"
                      className={`w-[75%] md:w-full bg-gray-100 min-h-[40px] mt-4 rounded-xl font-bold text-left md:text-[16px] text-gray-600 px-2 pt-2 ${
                        !isUpdate
                          ? "border-2 outline-0 box-border border-green-500"
                          : ""
                      } ${ errors[key]?.message ? "border-2 border-red-500" : ""}`}
                      
                      disabled={isUpdate}
                    />
                    {errors[key] && (
            <p className="text-red-500 text-sm mt-1">{errors[key as keyof PersonalDetails]?.message}</p>
          )}
          </div>
        ))}
            {!isUpdate && (
              <div className=" w-[75%] md:w-[100%] flex justify-end mt-8 mx-8 md:mx-0">
                <Button
                  className="flex bg-red-600 items-center rounded-xl hover:bg-red-400 "
                  onClick={handlecancel}
                >
                  <img
                    src={update}
                    className="h-[20px] hidden : md:block"
                    alt=""
                  />
                  <p className="text-white text-[18px] ">
                    {profileDetails.cancel}
                  </p>
                </Button>
                <Button
                  className="flex bg-secondary-green items-center rounded-xl hover:bg-primary-green mx-2 md:mx-6 mr-5"
                  type="submit"
                >
                  <img
                    src={update}
                    className="h-[20px] hidden : md:block"
                    alt=""
                  />
                  <p className="text-white text-[18px] ">
                    {profileDetails.save}
                  </p>
                </Button>
              </div>
            )}
          </div>
        </form>
      </Card>

      {/* Address section */}
      <Card className="p-6 mt-6 lg:w-[75vw] mb-10">
        <div className=" flex justify-between items-center mb-6">
          <p className="text-[18px] font-bold  text-secondary-green">
            {profileDetails.primaryAddressHeading}
          </p>
        </div>
        <div className="grid grid-col-1 md:grid-cols-2 gap-6 min-w-full mb-6">
          {Object.entries(address).map(([key, value]) => (
            <div key={key} className="w-full">
              <p className="text-[18px] font-bold">{key}</p>
              <p className="w-full bg-gray-100 min-h-[40px] mt-4 rounded-xl font-bold text-left  text-gray-600 px-2 pt-2">
                {value}
              </p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};
export default Myprofile;
