import Box from "@/components/Common/box/Box";
import React, { useEffect, useRef, useState } from "react"
import AdminPageHeader from "@/components/Common/pageHeaders/adminPageHeader";
import profilePic from "@/assets/icons/user.svg"
import { Card, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import CommonModalCard, { ModalRef } from "@/components/Common/ModalCards/commonModalCard";
import { modalContent } from "@/utils/constants/constants";
import { useGetDeletedUsers, useUnBlockUsersByEmail } from "@/utils/api/adminController/users";
import { User } from "@/utils/types/types";
import BetterSearchBar from "@/components/Common/SearchBar/BetterSearchBar";
import { toast } from "sonner";

const ManageBlockedUsers:React.FC=()=> {
  const navigate = useNavigate();
  const [email,setEmail] = useState<string>("");
    const [blockedUsers,setBlockedUsers]= useState<User[]>();
    const {data:blockedUsersData, isError, error, isLoading,isSuccess, refetch} = useGetDeletedUsers();
    const {mutate}=useUnBlockUsersByEmail(email);
    useEffect(()=>{
      if(isSuccess){
        refetch();
        setBlockedUsers(blockedUsersData?.content)
      }
      else if(isError){toast.error(`Error:Could Not retrive data-${error?.message}`)}
    },[blockedUsersData?.content])
  
      const modalref = useRef<ModalRef>(null)
      const confirmFilter=()=>{
        mutate();
        modalref.current?.closeModal()
      }
      const handleOpenCard=(email:string)=>{
        setEmail(email);
          modalref.current?.openModal()
      }  
      const handleUpdateData=(searchResult?:User[])=>{
        setBlockedUsers(searchResult);
      }
    return (
    <div className="h-[100vh] w-[98vw]">
      <AdminPageHeader heading="Manage Blocked Users" />
      <div className="flex justify-center items-center">
      <BetterSearchBar<User> placeholder="Search Blocked Users with Name or Email" data={blockedUsersData?.content} updateData={handleUpdateData}/>
      </div>
      <div className="flex flex-col justify-center items-center h-[80%] mt-0">
      <Box className="w-[95%] p-10 ">
        {isLoading&& <div>Loading...</div>}
        {isError&& <div>No Data Found</div>}
        {isSuccess && <div className="w-[100%] h-[100%] overflow-y-scroll pr-10">
          {blockedUsers?.map((blockedUser,index)=>{
            return(
            <Card key={index} className="sm:flex shadow-2xl gap-10 rounded-2xl mt-4 p-5 justify-between">
              <div className="flex gap-5">
                <img src={profilePic} alt="Profile pic" />
                <div>
                  <CardTitle className={`text-[24px] font-primary-bold mt-4  md:text-[28px] `}>
                  {`${blockedUser.firstName} ${blockedUser.lastName}`}
                  </CardTitle>
                  <p>
                    {blockedUser.email}
                  </p>
                </div>
              </div>
              <div className="sm:w-[40%] flex gap-5 items-end">
                <Button
                  className="hover:cursor-pointer border-secondary-green mt-4 p-1  px-4  md:text-[16px] font-primary-bold md:block hover:bg-gray-200 bg-white text-secondary-green border-2 w-[45%]" onClick={()=>handleOpenCard(blockedUser.email)}
                >
                  Unblock
                </Button>
                <Button
                  className="hover:cursor-pointer bg-secondary-green text-white border-2 border-secondary-green mt-4 p-1  px-4  md:text-[16px] font-primary-bold   md:block hover:bg-primary-green w-[45%]" onClick={()=>{navigate(`/admindashboard/blockedusers/${blockedUser.email}`)}}
                >
                  View Details
                </Button>
              </div>
            </Card>
            )
          })}
        </div>}
      </Box>
      </div>
      <CommonModalCard ref={modalref} title={modalContent.unblockuser.title} description={modalContent.unblockuser.description}>
                <Button
                className="bg-secondary-green text-white w-[45%] hover:bg-primary-green"
                onClick={confirmFilter}
                >
                Confirm
                </Button>
        </CommonModalCard>
    </div>
  )
}
export default  ManageBlockedUsers;

