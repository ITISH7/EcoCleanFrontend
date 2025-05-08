import Box from "@/components/Common/box/Box";
import FilterCard from "@/components/Common/filterCard/filterCard";
import Table from "@/components/Common/Table/Table";
import Title from "@/components/Title";
import { Button } from "@/components/ui/button";
import {  usegetAllPendingOrderHistory, usegetFilteredOrders } from "@/utils/api/orderController/order";

import { FilterParams } from "@/utils/types/types";
import React, { useEffect, useState } from "react"

import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

interface OrderData {
  orderId: string;
  [key: string]: any;
}
const PendingOrders: React.FC = () => {
  const [modal, setModal] = useState(false);
  const { data, isLoading, isSuccess } = usegetAllPendingOrderHistory();
  const [header, setHeader] = React.useState<string[]>([]);
  const [junkOrderData, setJunkOrderData] = React.useState([]);
  useEffect(() => {
    console.log("Data: ", data);
    if (isSuccess && data != undefined && data.length > 0) {
      setHeader(
        [...new Set(data.flatMap(Object.keys))]
          .filter((key) => key !== "orderId")
          .concat("View Merchants") as string[]
      );
      setJunkOrderData(
        data
          .sort((a: OrderData, b: OrderData) => new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime())
          .map(({ ...rest }: OrderData) => ({
        ...rest,
        "View Merchants": "View Merchants", 
          }))
      );
    }
  }, [data]);

  const navigate = useNavigate();
  const { minPrice, maxPrice, startDate, endDate, status } = useSelector((state: RootState) => state.filterCard);
  const [params, setParams] = useState<FilterParams>({
    startDate,
    endDate,
    minPrice:Number(minPrice),
    maxPrice:Number(maxPrice),
    status 
  });
  const {data:filterereddata,refetch} = usegetFilteredOrders(params);
  const toggleModal=()=>{
    setModal(!modal);
  }
  const setParameters=(params:FilterParams)=>{
    setParams(params);
  }
  const confirmFilter=(newParams:FilterParams)=>{
    const cleanedParams = Object.fromEntries(
      Object.entries(newParams).filter(([_, value]) => value)
    ) as FilterParams;
    setParameters(cleanedParams);
  }
  useEffect(() => {
    refetch();
  },[params])
  useEffect(()=>{
    if(filterereddata != undefined && filterereddata.length > 0){
      setHeader(
        [...new Set(filterereddata.flatMap(Object.keys))]
          .filter((key) => key !== "orderId")
          .concat("View Merchants") as string[]
      );
      setJunkOrderData(
        filterereddata.map(({ ...rest }: OrderData) => ({
          ...rest,
          "View Merchants": "View Merchants", 
        }))
      );
    }

  },[filterereddata])
  return (
    <div className="h-[100vh] w-[100vw]">
      <Title title="My Pending Orders" />
      <div className="flex w-[100%]">
      <Button onClick={()=>{navigate("/dashboard")}} className="bg-white text-secondary-green  box-border border-2 border-secondary-green mx-7 mt-4 text-[16px] hover:bg-gray-100 hover:cursor-pointer" >{`< Back`}</Button>   
      </div>
      <div className="flex flex-col justify-center items-center h-[80%]">
        <Box className="w-[94%]">
          {!isLoading ? (
            <Table header={header} data={junkOrderData} />
          ) : (
            <p>Loading...</p>
          )}
        </Box>
      </div>
      {modal && <FilterCard closeCard={toggleModal} confirmFilter={confirmFilter}/>}
    </div>
  );
};

export default PendingOrders;
