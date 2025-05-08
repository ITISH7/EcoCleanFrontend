import Box from "@/components/Common/box/Box";
import Table from "@/components/Common/Table/Table";
import Title from "@/components/Title";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { useCancelOrder, usegetOrderHistorybyId } from "@/utils/api/orderController/order";
import { dashboard, orderDetails } from "@/utils/constants/constants";

import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

const Orderdetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data, isSuccess } = usegetOrderHistorybyId(id);
  const { mutateAsync: cancelOrder } = useCancelOrder();
  const [header, setHeader] = React.useState<string[]>([]);
  const [junkOrderData, setJunkOrderData] = React.useState<
    Record<string, any>[]
  >([]);
  const [address, setAddress] = useState<string>("");

  const handleCancelOrder = async (orderId: string | undefined) => {
    if (orderId) {
      const response = await cancelOrder(orderId);
      if (response) {
        navigate(-1);
      }
    } else {
      toast.error("Order Id is not available");
    }
  };
  useEffect(() => {
    if (
      isSuccess &&
      data != undefined &&
      data.junkItems != undefined &&
      data.address != undefined
    ) {
      setHeader([...new Set(data.junkItems.flatMap(Object.keys))] as string[]);
      setJunkOrderData(data.junkItems);
      setAddress(() => {
        return Object.entries(data.address)
          .filter(([key]) => key !== "addressId")
          .map(([_, value]) => value)
          .join(",");
      });
    }
  }, [data,isSuccess]);
  return (
    <div className="w-[100vw]">
      <Title title={dashboard.orderDetails} />
      <Button
        onClick={() => {
          navigate(-1);
        }}
        className="bg-secondary-green text-white mx-6 mt-6 text-[16px] hover:bg-gray-100 hover:text-primary-green"
      >{`< Back`}</Button>
      <div className="flex  w-[75%] md:w-[94%] justify-between">
        <p className="text-[14px] md:text-[18px] text-gray-600 font-medium mt-4 mx-6">
          {data ? data.orderDate : "date not found"}
        </p>
        <div className="flex justify-between items-center">
          <p
            className={`justify-end uppercase text-[18px] ${
              data && data.status === "PENDING"
                ? "text-destructive"
                : "text-secondary-green"
            } font-medium mt-4 mx-6`}
          >
            {data && data.status}
          </p>
          {data && data.status === "PENDING" && (
            <Button
              className="bg-white border box-border border-destructive text-destructive mx-6 mt-4  text-[12px] md:text-[16px] hover:bg-amber-50"
              onClick={() => {
                handleCancelOrder(id);
              }}
            >{`Cancel Order `}</Button>
          )}
        </div>
      </div>
      <div className="flex flex-col items-center justify-center w-[90%] md:w-[95%] mx-4 md:mx-0">
        <Box className="md:ml-0">
          <Table header={header} data={junkOrderData} />
          <div className="flex  mx-4 md:mx-0 justify-between w-[80%] md:w-[20%] mt-4 md:ml-16 border-b-2 border-gray-400">
            <p className="text-[20px] font-medium">Total Amount:</p>
            <p className="text-[20px] font-medium text-secondary-green">{`₹${
              data ? data.totalPrice : 0
            }`}</p>
          </div>
        </Box>
      </div>
    </div>
  );
};

export default Orderdetails;
