import { Outlet, useLocation } from "react-router-dom";
import ScheduleStatus from "./ScheduleStatus";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { toast } from "sonner";
import { useCreateOrder } from "@/utils/api/orderController/order";

const SchedulePickup: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {mutateAsync:createJunkOrder}=useCreateOrder();
  const addressDetails = useSelector(
    (state: RootState) => state.Addressdetails.selectedAddressDetails
  );
  const handleNextNavigate = () => {
    switch (location.pathname) {
      case "/dashboard/schedulepickup": {
        if(junkOrderDetails.length===0){
          toast.error("Please add items to schedule a pickup");
          return;
        }
        navigate("/dashboard/schedulepickup/selectAddress");
        break;
      }
      case "/dashboard/schedulepickup/selectAddress": {
        if (junkOrderDetails.length===0&& addressDetails=== null) {
          toast.error("Please select an address first");
        } else {
          navigate("/dashboard/schedulepickup/confirmDetails");
        }
        break;
      }
      case "/dashboard/schedulepickup/confirmDetails": {
        if(junkOrderDetails.length!==0&&addressDetails){
          createJunkOrder({
            addressId: addressDetails.addressId,
            junkdetails: junkOrderDetails,
          });
      }
      else if(junkOrderDetails.length===0 ||addressDetails=== null){
        toast.error("please add items and select address to schedule a pickup");
      }
        break;}
    }
  };
  const handleBackNavigate = () => {
    switch (location.pathname) {
      case "/dashboard/schedulepickup/selectAddress": {
        navigate("/dashboard/schedulepickup");
        break;
      }
      case "/dashboard/schedulepickup/confirmDetails": {
        navigate("/dashboard/schedulepickup/selectAddress");
        break;
      }
      
    }
  };
  const getstep=()=>{
    switch(location.pathname){
      case "/dashboard/schedulepickup": {
        return 1;
      }
      case "/dashboard/schedulepickup/selectAddress": {
        return 2;
      }
      case "/dashboard/schedulepickup/confirmDetails": {
        return 3;
      }
      case "/dashboard/schedulepickup/success": {
        return 4;
      }
      default:{
        return 1;
      }
    }
  }
  const junkOrderDetails = useSelector(
    (state: RootState) => state.junkOrder.junkOrderDetails
  );
  return (
    <div className="w-full flex min-h-[100vh]">
      <div className="w-[80%] md:w-[80%] mb-8 justify-center items-center">
        <Outlet />
        {location.pathname!=="/dashboard/schedulepickup/success" &&<div className="w-[100%] flex justify-end mt-10 pr-12">
          {location.pathname!="/dashboard/schedulepickup"&&<button
            className="bg-white text-secondary-green  box-border border-secondary-green border-2 p-2 rounded-2xl w-[20%] cursor-pointer disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-800 mr-4"
            onClick={handleBackNavigate}
          >
            Back
          </button>}
          <button
            className="bg-secondary-green text-white p-2 rounded-2xl w-[20%] cursor-pointer disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-800"
            onClick={handleNextNavigate}
          >
            Next
          </button>
        </div>}
      </div>

      <div className="hidden md:block border-1 border-t-0 pt-5 w-[20%]">
        <ScheduleStatus steps={getstep()} />
      </div>
    </div>
  );
};

export default SchedulePickup;
