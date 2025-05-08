import Box from "@/components/Common/box/Box";
import DynamicSearchBar from "@/components/Common/SearchBar/DynamicSearchBar";
import Table from "@/components/Common/Table/Table";
import Title from "@/components/Title";
import { Button } from "@/components/ui/button";
import { useGetJunkData } from "@/utils/api/junkController/junkDetails";
import {  dashboard } from "@/utils/constants/constants";
import React, { useEffect } from "react"
import { useNavigate } from "react-router-dom";

const CheckCurrentPrice:React.FC=()=> {
 
   
  const {data}: { data?: { unitPrice?: number; [key: string]: any }[] } = useGetJunkData();
  console.log(data);
  const navigate = useNavigate();
  const [header, setHeader] = React.useState<string[]>([]);
    const [junkOrderData, setJunkOrderData] = React.useState<any[]>([]);
    useEffect(() => {
      console.log("Data: ", data);
      if ( data != undefined && data.length > 0) {
        setHeader(
          [...new Set(data.flatMap(Object.keys))]
            .filter((key) => key !== "orderId") as string[]
        );
        setJunkOrderData(
          data.map(({ unitPrice, ...rest }: { unitPrice?: number; [key: string]: any }) => ({
            ...rest,
            unitPrice: unitPrice ? `Rs ${unitPrice}` : unitPrice,
          }))
        );
      }
    }, [data]);
  return (
    <div className="h-[100vh] w-[98vw]">
    <Title title={dashboard.checkCurrentPrice} />
    
    <Button onClick={()=>{navigate(-1)}} className="bg-white text-secondary-green  box-border border-2 border-secondary-green mx-7 mt-4 text-[16px] hover:bg-gray-100 hover:cursor-pointer ">{`< Back`}</Button>
    <div className="flex justify-center items-center">
    <DynamicSearchBar/>
    </div>
    <div className="flex flex-col justify-center items-center h-[80%] mt-0">
    <Box className="w-[95%] mt-0">
      <Table header={header} data={junkOrderData}/>
      </Box>
    </div>
    </div>
  )
}
export default  CheckCurrentPrice;

