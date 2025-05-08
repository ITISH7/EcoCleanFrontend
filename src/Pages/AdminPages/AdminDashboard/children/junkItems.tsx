import Box from "@/components/Common/box/Box";
import AdminTable from "@/components/Common/Table/AdminTable";
import React, { useEffect, useState } from "react"
import AdminPageHeader from "@/components/Common/pageHeaders/adminPageHeader";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useGetJunkData } from "@/utils/api/junkController/junkDetails";
import { AdminJunkData } from "@/utils/types/types";
import BetterSearchBar from "@/components/Common/SearchBar/BetterSearchBar";

const ManageJunkItems:React.FC=()=> {
  const {data:junkData,isSuccess}= useGetJunkData();
  const [junkitems, setJunkitems] = useState<AdminJunkData[]>([]);
  const [header, setHeader] = React.useState<string[]>([]);

  const navigate = useNavigate();
  useEffect(()=>{
    if (isSuccess && junkData != undefined) {
     setHeader(
      [...new Set(junkData.flatMap(Object.keys))]
        .filter((key) => key !== "orderId")
        .concat("Actions") as string[]
    );
    setJunkitems(
        junkData.map(({...rest }:AdminJunkData) => ({
          ...rest,
          "Actions": "Modify", 
        }))
      )
      
    }
  },[junkData,isSuccess])
  const handleUpdateData=(searchResult:AdminJunkData[])=>{
    setJunkitems(
        searchResult.map(({...rest }:AdminJunkData) => ({
          ...rest,
          "Actions": "Modify", 
        }))
      );
  }
  return (
    <div className="h-[100vh] w-[98vw]">
      <div className="flex justify-between align-bottom">
        <AdminPageHeader heading="Manage Junk Items" />
        <Button className="hover:cursor-pointer bg-secondary-green text-white border-2 border-secondary-green mt-10 mr-8 p-1 px-4 md:text-[16px] font-primary-bold md:block hover:bg-primary-green" onClick={()=>{navigate("/admindashboard/junkitems/createnewjunk")}}>
          Add New Junk Item
        </Button>
      </div>
    <div className="flex justify-center items-center">
    <BetterSearchBar<AdminJunkData> placeholder="Search Orders" data={junkData} updateData={handleUpdateData}/>    </div>
    <div className="flex flex-col justify-center items-center h-[80%] mt-0">
    <Box className="w-[95%] mt-0">
      <AdminTable header={header} data={junkitems} endPoint="junkitems"/>
      </Box>
    </div>
    </div>
  )
}
export default  ManageJunkItems;

