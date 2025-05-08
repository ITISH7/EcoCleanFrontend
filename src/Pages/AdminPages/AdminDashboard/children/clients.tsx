import Box from "@/components/Common/box/Box";
import React, { useEffect, useState } from "react"
import AdminPageHeader from "@/components/Common/pageHeaders/adminPageHeader";
import profilePic from "@/assets/icons/user.svg"
import { Card, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useGetUsersByRole } from "@/utils/api/adminController/users";
import { User } from "@/utils/types/types";
import BetterSearchBar from "@/components/Common/SearchBar/BetterSearchBar";
import { toast } from "sonner";

const ManageClients:React.FC=()=> {
  const navigate = useNavigate();
  const [clients,setClients]= useState<User[]>();
  const {data:clientsData, isError, error, isLoading,isSuccess,refetch} = useGetUsersByRole('USER');
  useEffect(()=>{
    if(isSuccess){
      refetch();
      setClients(clientsData)
    }
    else if(isError){toast.error(`Error:Could Not retrive data-${error?.message}`)}
  },[clientsData])

  const handleUpdateData=(searchResult?:User[])=>{
    setClients(searchResult);
  }
    return (
    <div className="h-[100vh] w-[98vw]">
      <AdminPageHeader heading="Manage Clients" />
      <div className="flex justify-center items-center">
      <BetterSearchBar<User> placeholder="Search Clients with Name or Email" data={clientsData} updateData={handleUpdateData} />
      </div>
      <div className="flex flex-col justify-center items-center h-[80%] mt-0">
      <Box className="w-[95%] p-10 ">
        {isLoading&& <div>Loading...</div>}
        {isError&& <div >No Data Found</div>}
        {isSuccess && <div className="w-[100%] h-[100%] overflow-y-scroll pr-10">
          {clients?.map((client,index)=>{
            return(
            <Card key={index} className="sm:flex shadow-2xl gap-10 rounded-2xl mt-4 p-5 justify-between">
              <div className="flex gap-5">
                <img src={profilePic} alt="Profile pic" />
                <div>
                  <CardTitle className={`text-[24px] font-primary-bold mt-4  md:text-[28px] `}>
                      {`${client.firstName} ${client.lastName}`}
                  </CardTitle>
                  <p>
                    {client.email}
                  </p>
                </div>
              </div>
              <div className="sm:w-[40%] flex gap-5 items-end">
                <Button
                  className="hover:cursor-pointer border-secondary-green mt-4 p-1  px-4  md:text-[16px] font-primary-bold md:block hover:bg-gray-200 bg-white text-secondary-green border-2 w-[45%]"
                >
                  View Orders
                </Button>
                <Button
                  className="hover:cursor-pointer bg-secondary-green text-white border-2 border-secondary-green mt-4 p-1  px-4  md:text-[16px] font-primary-bold   md:block hover:bg-primary-green w-[45%]"
                  onClick={()=>{navigate(`/admindashboard/clients/${client.email}`)}}
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
    </div>
  )
}
export default  ManageClients;

