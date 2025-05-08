import Box from '@/components/Common/box/Box';
import { Button } from '@/components/ui/button';
import { Card} from '@/components/ui/card';
import { usegetInterestedMerchantsDetails } from '@/utils/api/orderController/order';
import { UUID } from 'crypto';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import image404 from "@/assets/images/404page.gif"
import user from '@/assets/icons/user.svg';

export const ViewMerchants: React.FC = () => {
  const { id } = useParams();
  console.log(id);
  const navigate = useNavigate();
  const [merchants, setMerchants] = useState<any[]>([]); // State to store merchant details
  const orderid = id as UUID;
    const { data } = usegetInterestedMerchantsDetails(orderid); // Fetch merchant details based on order id
    useEffect(() => {
        if (data) {
            setMerchants(data);
        }
    }, [data]);
    console.log(data);
  return (
    <div className="w-[100%] h-[100vh]">
      <div className="flex justify-between w-[91%] items-center mt-6">
        <div className="flex items-center">
          <Button
            className="mx-10 bg-white border-2 border-secondary-green text-secondary-green hover:bg-gray-100 cursor-pointer"
            onClick={() => {
              navigate("/dashboard/pendingOrders");
            }}
          >
            {"< Back"}
          </Button>
          <h1 className="text-[32px] font-primary-bold text-text-grey">
            Interested Merchants
          </h1>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center h-[80%] mt-0">
        <Box className="w-[95%]  lg:overflow-hidden p-10">
          <div className="w-[100%] pr-10">
            {merchants.map((merchant, index) => (
             <Card key={index} className="p-0 mt-6 lg:w-[75vw]">
             <div className=" flex p-2 items-center">
               <img src={user} className="h-[70px] " alt="" />
               <div className="mx-8">
                 <p className="text-[20px] font-bold ">
                   {merchant.firstName} {merchant.lastName}
                 </p>
                 <p className="text-[16px] font-bold text-gray-500 ">{merchant.email}</p>
               </div>
             </div>
           </Card>
            ))}
            {
              merchants.length==0 && <div className="items-center justify-center flex flex-col h-screen">
              <h1 className=" font-bold text-2xl md:text-4xl">OOPS! No Merchant Interested yet </h1>
              <img src={image404} alt="404 page" />
              </div>

            }
          </div>
        </Box>
      </div>
    </div>
  );
};