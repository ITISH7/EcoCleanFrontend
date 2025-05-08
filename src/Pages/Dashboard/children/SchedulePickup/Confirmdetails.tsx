import Box from "@/components/Common/box/Box";
import Table from "@/components/Common/Table/Table";
import Title from "@/components/Title";

import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { RootState } from "@/store/store";
import {  orderDetails } from "@/utils/constants/constants";


import React from "react";
import { useSelector } from "react-redux";



const ConfirmOrderDetails: React.FC = () => {
    const addressDetails = useSelector((state: RootState) => state.Addressdetails.selectedAddressDetails);
    const junkOrder = useSelector((state: RootState) => state.junkOrder.junkOrderDetails);
    const header = [...new Set(junkOrder.flatMap(Object.keys))];
  const totalAmount = junkOrder.reduce((acc, order) => acc + order.EstimatedPrice, 0);
  const formattedJunkOrder = junkOrder.map(order => ({
    ...order,
    JunkWeight: order.JunkWeight.toString()+" Kg",
    EstimatedPrice: "₹"+order.EstimatedPrice.toString(),
  }));
  const formatedAddress= ()=>{
    if(addressDetails){
        return  Object.entries(addressDetails)
        .filter(([key]) => key !== "addressId") 
        .map(([_, value]) => value) 
        .join(",");
    }
    else{
        return "No address selected";
    }
  }
  return (
    <div className="w-[100%] ">
      <Title title="Confirm Order Details" />

      <div className="flex flex-col items-center justify-center w-[90%]  md:w-[95%] mx-4 md:mx-0">
        <Box className="md:ml-0 ">
          <Table header={header} data={formattedJunkOrder} />
          <div className="flex  mx-4 md:mx-0 justify-between w-[80%] md:w-[20%] mt-4 md:ml-16 border-b-2 border-gray-400">
            <p className="text-[20px] font-medium">Total Amount:</p>
            <p className="text-[20px] font-medium text-secondary-green">{`₹${totalAmount}`}</p>
          </div>
          <Card className="md:mx-10 mt-6 min-h-36 shadow rounded-2xl ">
            <CardTitle className=" text-[18px] flex justify-between font-medium  md:text-[22px] pt-4 px-6 pr-6">
              <p> {orderDetails.pickUpAddressHeading}</p>
              <p className="text-secondary-green"> {orderDetails.pickupHistorylabel}</p>
            </CardTitle>
            <CardDescription className="text-[16px] md:text-[20px] px-6 py-2 max-w-[60%] md:max-w-[30%]">
             {formatedAddress()}
            </CardDescription>
          </Card>
        </Box>
      </div>
    </div>
  );
};

export default ConfirmOrderDetails;
