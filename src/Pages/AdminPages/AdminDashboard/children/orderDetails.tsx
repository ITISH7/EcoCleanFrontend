import Box from "@/components/Common/box/Box";
import AdminTable from "@/components/Common/Table/AdminTable";
import { completeOrderDetails } from "@/utils/constants/constants";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AdminPageHeader from "@/components/Common/pageHeaders/adminPageHeader";
import UserDetailsCard from "@/components/Common/userDetailsCard/userDetailsCard";
import UserAddressCard from "@/components/Common/userAddressCard/userAddressCard";
import { useGetSpecificOrderDetails } from "@/utils/api/adminController/users";
import { formatedAddress } from "@/utils/utils";
import { SpecificOrderDetails } from "@/utils/types/types";

const OrderDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const {data:orderData,isSuccess,refetch} = useGetSpecificOrderDetails(id);
  const [specificOrderDetails, setSpecificOrderDetails] = useState<SpecificOrderDetails>();
  useEffect(()=>{
    if(isSuccess&& orderData){
      refetch();
      setSpecificOrderDetails(orderData)}
  },[orderData])

  return (
    <div className="w-[100vw]">
      <AdminPageHeader heading="Order Details" link="/admindashboard/orders"/>
      <div className="flex flex-col items-center justify-center w-[90%] md:w-[95%] mx-4 md:mx-0">
        <Box className="md:ml-0">
          {specificOrderDetails?.junkItems &&
           <AdminTable
            header={completeOrderDetails.header}
            data={specificOrderDetails?.junkItems}
          />}
          <div className="flex  mx-4 md:mx-0 justify-between w-[80%] md:w-[20%] mt-4 md:ml-16 border-b-2 border-gray-400">
            <p className="text-[20px] font-medium">Total Amount:</p>
            <p className="text-[20px] font-medium text-secondary-green">{`₹${specificOrderDetails?.totalPrice}`}</p>
          </div>
         <UserAddressCard 
          addressHeading={completeOrderDetails.pickUpAddressHeading} 
          address={formatedAddress(specificOrderDetails?.address)}/>       
          <div className="flex  mx-4 md:mx-0 justify-between w-[80%] md:w-[20%] mt-4 md:ml-16 border-b-2 border-gray-400">
            <p className="text-[24px] font-medium">
              {completeOrderDetails.clientheading}
            </p>
          </div>
          <UserDetailsCard 
            profilePic={completeOrderDetails.clientprofilepic} 
            name={specificOrderDetails?.userDetails?.firstName} 
            email={specificOrderDetails?.userDetails?.email} 
            phoneNumber={Number(specificOrderDetails?.userDetails?.phoneNumber)} />
          <div className="flex  mx-4 md:mx-0 justify-between w-[80%] md:w-[20%] mt-4 md:ml-16 border-b-2 border-gray-400">
            <p className="text-[24px] font-medium">
              {completeOrderDetails.merchantheading}
            </p>
          </div>
          <UserDetailsCard 
            profilePic={completeOrderDetails.merchantprofilepic} 
            name={specificOrderDetails?.merchantDetails?.firstName} 
            email={specificOrderDetails?.merchantDetails?.email} 
            phoneNumber={Number(specificOrderDetails?.merchantDetails?.phoneNumber)} />
        </Box>
      </div>
    </div>
  );
};

export default OrderDetails;
