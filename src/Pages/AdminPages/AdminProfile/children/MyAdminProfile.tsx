import UserDetailsCard from "@/components/Common/userDetailsCard/userDetailsCard"
import AdminPageHeader from "@/components/Common/pageHeaders/adminPageHeader"
import profilepic from "@/assets/icons/user.svg"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { profileDetails } from "@/utils/constants/constants"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { useUpdateUser, useUserData } from "@/utils/api/profileController/userDetails"
import { toast } from "sonner"
import { zodResolver } from "@hookform/resolvers/zod"
import { personalDetailSchema } from "@/utils/ProfileValidations"
import { useForm } from "react-hook-form"
import { PersonalDetails } from "@/utils/types/types"

const MyAdminProfile = () => {
 const [isUpdate, setIsUpdate] = useState(true);
  const { data, isLoading, isSuccess ,isError,error} = useUserData();
  const {mutateAsync:updateUser} = useUpdateUser();
  const { register, handleSubmit, reset ,formState:{errors}} = useForm<PersonalDetails>({
    resolver: zodResolver(personalDetailSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      phoneNumber: "",
    }, 
  });
  const email = data?.email || "";

  const handleUpdate = () => {
    setIsUpdate(false);
  };
  const handleCancel = () => {
    reset();
    setIsUpdate(true);
  };
  const onSubmit = (formData: PersonalDetails) => {
    updateUser(formData)
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
    <div className=" w-full">
        <AdminPageHeader heading={`Welcome ${data?.firstName||""}`} />
        {isLoading && <p>Loading...</p>}
        <UserDetailsCard profilePic={profilepic} name={`${data?.firstName||""} ${data?.lastName || ""}`} email={email}/>
        <div className="m-10 justify-items-start">
        <Card className="w-full shadow-xl grid gap-10 p-10 ">
        <div className="flex justify-between mb-8 items-center">
        <CardTitle className="text-2xl text-secondary-green">Personal Information</CardTitle>
          {isUpdate && (
            <Button
              className="flex bg-secondary-green items-center hover:bg-primary-green"
              onClick={handleUpdate}
            >
              <p className="text-white text-[18px] ">
                {profileDetails.update}
              </p>
            </Button>
          )}
        </div>
        <CardContent className="w-[90%]">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-col-1 md:grid-cols-2 gap-6 mx-10 mb-10 md:min-w-full items-center"> 

              {(["firstName","lastName","phoneNumber"]as (keyof PersonalDetails)[]).map((key) => (
                <div key={key} className="w-[9/20]">
                  <p className="text-[18px] text-secondary-green">{key}</p>  
                      <input
                      {...register(key)}
                        type="text"
                        className={`w-[75%] md:w-full border-2 p-2 bg-gray-10 min-h-[40px] mt-4 rounded-xl text-left md:text-[16px] text-gray-600 bg-gray-100 px-2 pt-2 ${
                          !isUpdate
                            ? "border-2 outline-0 box-border font-bold border-green-500"
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
                <div className="w-[75%] md:w-[100%] flex justify-end mt-8 mx-8 md:mx-0">
                  <Button
                    className="flex bg-red-600 items-center rounded-xl hover:bg-red-400 "
                    onClick={handleCancel}
                  >
                    <p className="text-white text-[18px] ">
                      {profileDetails.cancel}
                    </p>
                  </Button>
                  <Button
                    className="flex bg-secondary-green items-center rounded-xl hover:bg-primary-green mx-2 md:mx-6 mr-5"
                    type="submit"
                  >
                    <p className="text-white text-[18px] ">
                      {profileDetails.save}
                    </p>
                  </Button>
                </div>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
      </div>
    </div>
  )
}

export default MyAdminProfile