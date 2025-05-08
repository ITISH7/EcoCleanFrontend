import Title from '@/components/Title'
import { Button } from '@/components/ui/button'
import { Card, CardTitle } from '@/components/ui/card';
import React, { useEffect } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import user from "@/assets/icons/user.svg"
import Box from '@/components/Common/box/Box';
import Table from '@/components/Common/Table/Table';
import { useAcceptOrder, useGetUserDetailsByorderId, useRejectOrder } from '@/utils/api/MerchantController/merchant';
import { UUID } from 'crypto';
import { usegetSpecificOrderDetails } from '@/utils/api/orderController/order';
export const MerchantOrderDetails:React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const {id} = useParams();
    const {amount} = useParams();
    console.log("id is ", id);
    const {mutateAsync:acceptOrder} = useAcceptOrder();
    const {mutateAsync:rejectOrder} = useRejectOrder();
    const { data ,refetch} = useGetUserDetailsByorderId(id)
    useEffect(()=>{
        if(id){
            refetch();
        }
    }
    ,[id]);
    console.log("data is ", data);
    const onAcceptOrder = (orderId:string)=>{
        const order = orderId as UUID;
        acceptOrder(order as UUID);
    }
    const onRejectOrder = (orderId:string)=>{
        const order = orderId as UUID;
        rejectOrder(order as UUID);
    }
    const {data:orderData} = usegetSpecificOrderDetails(id as UUID)
    const [header, setHeader] = React.useState<string[]>([]);
      const [junkOrderData, setJunkOrderData] = React.useState<any[]>([]);
      useEffect(() => {
        if (orderData!= undefined && orderData.length > 0) {
          setHeader(
            [...new Set(orderData.flatMap(Object.keys))]
              .filter((key) => key !== "orderId") as string[]
          );
          setJunkOrderData(
            orderData.map(({ ...rest }) => ({
              ...rest,
              
            }))
          );
        }
      }, [orderData]);

  return (
    <div className="h-[100%] w-[98vw]">

        <div className='w-[98%] flex justify-between items-center '>
            <div className='flex justify-center items-center'>
                <Button className="bg-white text-secondary-green  box-border border-2 border-secondary-green mx-7 mt-4 text-[16px] hover:bg-gray-100 hover:cursor-pointer " onClick={()=>{
                    navigate(-1)
                }}>{`< Back`}</Button>
                <Title title="Order Details" />
            </div>
            {
                location.pathname.includes( "/merchant/apply-order") &&<div className='flex justify-end items-center w-[50%] h-[100%]'>
                    <Button className="bg-white text-red-700 border-2 border-red-700 hover:cursor-pointer hover:bg-gray-100" onClick={()=>id&&onRejectOrder(id)}>not interested</Button>
                    <Button className="bg-white text-secondary-green border-2 border-secondary-green hover:cursor-pointer hover:bg-gray-100 mx-4" onClick={()=>id&&onAcceptOrder(id)}>interested</Button>
                </div> 
            }
        </div>

        <div className='h-[100%] mt-0 w-[98%]'>
            <h1 className="text-[24px] font-primary-bold text-gray-700 mt-4 mx-7">client Details</h1>
            <Card className='flex mx-7 h-[100%] p-4 rounded-2xl items-center mt-4 '>
                <img src={user} className='h-[70px]'></img>
                <div className='flex flex-col  mx-6'>
                    <p className="text-[18px] font-regular ">
                    {data? `${data.firstName }${data.lastName }`:"loading..."}
                    </p>
                    <p className="text-[18px] font-regular text-gray-500 ">
                    { data ? `${data.email}`:"loading ......."}
                    </p>
                </div>
            </Card>
            <Card className='flex  flex-col mx-7 min-h-[120px] p-4 rounded-2xl mt-4'>
                    <CardTitle className='text-[20px] font-medium'>
                    {"Pick up Address"}
                    </CardTitle>
                    <p className="text-[18px] font-regular text-gray-500">
                    {data ? `${data.address[0].houseNumber}, ${data.address[0].street}, ${data.address[0].locality}, ${data.address[0].city}, ${data.address[0].state}, ${data.address[0].country} - ${data.address[0].pinCode}` : "loading..."}
                    </p>

            </Card>
        </div>
        <div className='h-[100%] mt-8 mx-7'>
            <div className='flex justify-between items-center w-[96%]'>
            <h1 className="text-[24px] font-primary-bold text-gray-700 mt-4 ">order Details</h1>
            <div className='flex w-[20%] justify-between items-center  border-b-2 border-gray-950'> 
                <p>{"total"} </p>
                <span>{amount}</span>
            </div>
            </div>
            <Box>
            <Table header={header} data={junkOrderData}/>
            </Box>
        </div>
    </div>
  )
}
