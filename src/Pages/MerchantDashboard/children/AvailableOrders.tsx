import Box from "@/components/Common/box/Box";
import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import { useGetAvailableOrder } from "@/utils/api/MerchantController/merchant";
import { getFormattedDate } from "@/utils/utils";
import { useNavigate } from "react-router-dom";
import image404 from "@/assets/images/404page.gif"
import { useEffect } from "react";

export const AvailableOrders = () => {
  const {data:orderList,refetch} = useGetAvailableOrder();
  useEffect(()=>{
    refetch();
  },[])
    const navigate = useNavigate();
  return (
    <div className="w-[100%] h-[100%]">
      <div className="flex justify-between w-[91%] items-center mt-6">
        <div className="flex items-center">
          <Button className=" mx-10 bg-white border-2 border-secondary-green text-secondary-green hover:bg-gray-100 cursor-pointer" onClick={() => {navigate("/merchant")}}>
            {" "}
            {"< Back"}
          </Button>
          <h1 className="text-[32px] font-primary-bold text-text-grey">
            Available Orders Details
          </h1>
        </div>
      </div>
      <div className="mt-8 mx-10 w-[92%] justify-center items-center">
        <Box className="mt-8">
          {orderList&&orderList.length>0&&orderList.map((order,index)=>
          <Card key= {index} className="w-[95%] ml-6 mt-4  p-6 shadow items-center rounded-2xl mb-4 md:mb-0">
            <div className="flex justify-between items-center">
              <CardTitle className="text-gray-500 font-medium text-[18px]">
                {getFormattedDate(order.orderDate)}
              </CardTitle>
              <CardTitle className="text-gray-500 font-medium text-[18px]">
                {"estimated price "}{" "}
                <span className="text-secondary-green mx-2">{order.totalPrice}</span>
              </CardTitle>
            </div>
            <div className="flex justify-between items-center mt-4 w-[100%] ">
              <div className="w-[50%]">
                <h1 className="text-[20px] font-medium">{"pick up Address"}</h1>
                <p className="text-[20px] font-regular text-gray-500 mt-2">
                  {order.address}
                </p>
              </div>
              <Button className="bg-secondary-green border-2 border-secondary-green text-white hover:bg-primary-green cursor-pointer text-[20px] h-[40px]" onClick={()=>{
                navigate(`/merchant/apply-order/${order.orderId}/${order.totalPrice}`)
              }}>
                View Details
              </Button>
            </div>
          </Card>
)}
{
  
    (orderList && orderList.length==0) && <div className="items-center justify-center flex flex-col h-screen">
    <h1 className=" font-bold text-2xl md:text-4xl">OOPS! No Available orders yet</h1>
    <img src={image404} alt="404 page" />
    </div>

  
}
        </Box>
      </div>
    </div>
  );
};
