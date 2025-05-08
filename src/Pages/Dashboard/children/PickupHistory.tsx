import Box from "@/components/Common/box/Box";
import FilterCard from "@/components/Common/filterCard/filterCard";
import Table from "@/components/Common/Table/Table";
import Title from "@/components/Title";
import { Button } from "@/components/ui/button";
import { usegetAllOrderHistory, usegetFilteredOrders } from "@/utils/api/orderController/order";
import { FilterParams } from "@/utils/types/types";
import React, { useEffect, useState } from "react"
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { dashboard } from "@/utils/constants/constants";
import { ErrorDisplay } from "@/components/Common/ErrorDisplay";

interface OrderData {
  orderId: string;
  [key: string]: any;
}
const PickupHistory: React.FC = () => {
  const [isAllOrderHistoryEmpty, setIsAllOrderHistoryEmpty] = useState(true);
  const [modal, setModal] = useState(false);
  const { data :allOrderHistory, isLoading, isSuccess } = usegetAllOrderHistory();
  const [header, setHeader] = React.useState<string[]>([]);
  const [junkOrderData, setJunkOrderData] = React.useState<OrderData[]>([]);
  useEffect(() => {
    console.log("Data: ", allOrderHistory);
    if (isSuccess && allOrderHistory != undefined && allOrderHistory.length > 0) {
      setHeader(
        [...new Set(allOrderHistory.flatMap(Object.keys))]
          .filter((key) => key !== "orderId")
          .concat("View details") as string[]
      );
      setJunkOrderData(
        allOrderHistory.map(({ ...rest }: OrderData) => ({
          ...rest,
          "View details": "View", 
        }))
      );
    }
  }, [allOrderHistory]);

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
          .concat("View details") as string[]
      );
      setJunkOrderData(
        filterereddata.map(({ ...rest }: OrderData) => ({
          ...rest,
          "View details": "View", 
        }))
      );
    }

  },[filterereddata])
  useEffect(()=>{
    if(allOrderHistory != undefined && allOrderHistory.length ===0){
     setIsAllOrderHistoryEmpty(true);
    }
    else{
      setIsAllOrderHistoryEmpty(false);
    }
    
  },[allOrderHistory])
  return (
    <div className="h-[100vh] w-[100vw]">
      <Title title={dashboard.pickupHistory} />
      <div className="flex w-[100%]">
      <Button onClick={()=>{navigate(-1)}} className="bg-white text-secondary-green  box-border border-2 border-secondary-green mx-7 mt-4 text-[16px] hover:bg-gray-100 hover:cursor-pointer" >{`< Back`}</Button>
    
      <Button className="hover:cursor-pointer bg-secondary-green text-white border-2 border-secondary-green mt-4 p-1  px-4  md:text-[16px] font-primary-bold   md:block hover:bg-primary-green outline-none inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0" 
      onClick={toggleModal}>
              Filter
      </Button>    
      </div>
      <div className="flex flex-col justify-center items-center h-[80%]">
        <Box className="w-[94%]">
          {!isLoading &&allOrderHistory.length!=0? (
            <Table header={header} data={junkOrderData} />
          ) : (
            <ErrorDisplay errorMsg={"OOPS!! no Order History Available "}/>
          )}
        </Box>
      </div>
      {modal && <FilterCard closeCard={toggleModal} confirmFilter={confirmFilter}/>}
      </div>
  );
};

export default PickupHistory;
