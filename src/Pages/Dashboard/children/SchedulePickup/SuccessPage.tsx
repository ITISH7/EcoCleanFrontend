import React, { useEffect } from 'react'
import success from "@/assets/icons/success.svg"
import Box from '@/components/Common/box/Box';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { clearJunkOrders } from '@/slice/junkOrderDetialSlice';
import { clearSelectedAddressDetails } from '@/slice/selectedAddressDetailSlice';
import { toast } from 'sonner';
const successPage:React.FC = () => {
  const dispatch= useDispatch();
  const navigate = useNavigate();
  useEffect(()=>{
    dispatch(clearJunkOrders());
    dispatch(clearSelectedAddressDetails());
    toast.success(" redirecting to dashboard in 5 seconds");
    setTimeout(() => {
      navigate("/dashboard");
    }, 5000);
  },[]);
  return (
    <div className='w-[50%] h-[40%] m-auto  md:mt-40'>
    <Box className='justify-center items-center'>
        <img src={success} alt="success" className="w-20 h-20 mx-auto mt-10"/>
        <div>
        <p className="text-center text-[24px] font-semibold mt-4">
            Your order has been successfully placed
        </p>
        <p className="text-center text-[16px] mt-4">
            Thank you for choosing EcoCLean
        </p>
        <p className='text-center text-[16px] mt-8'>
        <Link to="/dashboard" className="text-center text-secondary-green mt-4 hover:underline">Go to dashboard</Link>
        </p>
        </div>
    </Box>
    </div>
  )
}
export default successPage;
