import Box from "@/components/Common/box/Box";
import FilterCard from "@/components/Common/filterCard/filterCard";
import AdminTable from "@/components/Common/Table/AdminTable"
import { Button } from "@/components/ui/button";
import { FilteredData, FilterParams } from "@/utils/types/types";
import React, { useEffect, useState } from "react"
import AdminPageHeader from "@/components/Common/pageHeaders/adminPageHeader";
import filterIcon from "@/assets/icons/filter.svg"
import { useGetFilterOrders, useGetOrderHistory } from "@/utils/api/adminController/users";
import { flushSync } from "react-dom";
import BetterSearchBar from "@/components/Common/SearchBar/BetterSearchBar";

const ManageOrders:React.FC=()=> {
  const [modal, setModal] = useState(false);
  const { data:orderHistoryData, isLoading, isSuccess } = useGetOrderHistory();
  const [allOrderData, setAllOrderData] = useState<FilteredData[]>([]);
  const [header, setHeader] = React.useState<string[]>([]);
  const [params, setParams] = useState<FilterParams>();
  const {data:filteredData,refetch} = useGetFilterOrders(params??{});
  useEffect(() => {
    if (isSuccess && orderHistoryData != undefined) {
      const mappedData = filteredData? filteredData:orderHistoryData;
      setHeader(
        [...new Set(mappedData.flatMap(Object.keys))]
          .filter((key) => key !== "orderId")
          .concat("View details") as string[]
      );
      setAllOrderData(
        mappedData.map(({...rest }:FilteredData) => ({
          ...rest,
          "View details": "View", 
        }))
      )
    }
  }, [orderHistoryData,filteredData]);
  
  const toggleModal=()=>{
    setModal(!modal);
  }
  const confirmFilter = async (newParams:FilterParams)=>{
    const cleanedParams = Object.fromEntries(
      Object.entries(newParams).filter(([_, value]) => value)
    ) as FilterParams;
    flushSync (()=>{setParams(cleanedParams)});
    refetch();
  }
  const handleUpdateData=(searchResult:FilteredData[])=>{
    setAllOrderData(
      searchResult.map(({...rest }:FilteredData) => ({
        ...rest,
        "View details": "View", 
      }))
    )
  }
  return (
      <div className="h-[100vh] w-[100vw]">
        <AdminPageHeader heading="Manage Orders" />
        <div className="flex flex-col justify-center items-center h-[80%]">
          <BetterSearchBar<FilteredData> placeholder="Search Orders" data={filteredData? filteredData:orderHistoryData} updateData={handleUpdateData}/>
          <Box className="w-[94%] overflow-y-hidden">
            <div className="w-full pr-10 justify-items-end">
              <Button className="hover:cursor-pointer bg-white text-secondary-green hover:bg-secondary-green hover:text-white border-2 border-secondary-green mt-4 p-1  px-4 md:text-[16px] font-primary-bold md:block" 
                onClick={toggleModal}>
                  <div className="flex gap-1">
                    <img src={filterIcon} />
                    <p>
                      Filter
                    </p>
                  </div>
              </Button> 
            </div>
            {!isLoading ? (
              <AdminTable header={header} data={allOrderData} endPoint={`orderdetails`} />
            ):(
              <p>Loading...</p>
            )}
          </Box>
        </div>
        {modal && <FilterCard closeCard={toggleModal} confirmFilter={confirmFilter}/>}
      </div>
  )
}

export default ManageOrders