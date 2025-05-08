import React from 'react'
import PageHeader from "../../../../components/Common/pageHeaders/PageHeader";
import ItemCard from "./ItemCard";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { addJunkItem, removeJunkItem } from "@/slice/junkOrderDetialSlice";
import { ItemDetailType } from "@/utils/types/types";
import { toast } from 'sonner';


const UploadJunkDetails:React.FC=()=>{

  const [isAddDataCardOpen, setisAddDataCardOpen] = useState(false);
  const dispatch = useDispatch();
  const junkOrderDetails = useSelector((state: RootState) => state.junkOrder.junkOrderDetails);

  const addNewJunkItems = () => {
    setisAddDataCardOpen(true);
  };

  const getjunkDetails = (data: ItemDetailType) => {
    dispatch(addJunkItem(data));
    setisAddDataCardOpen(false);
    toast.success("Item added successfully");
  };

  const handleCloseCard = () => {
    setisAddDataCardOpen(false);
  };

  const handleDeleteJunkOrder = (junkTypeToDelete: string) => {
    dispatch(removeJunkItem(junkTypeToDelete));
    toast.success("Item deleted successfully");
  };

  return (
  

<div className='w-[100%]'>
<PageHeader heading="Schedule Pickup" />
<div className="m-10 p-5 sm:p-10 border-1 custom-scrollbar border-black rounded-4xl h-[100vh]">
  <div className="h-full overflow-y-scroll">
    <button
      className="text-primary-green text-xl underline ml-15 md:ml-10 cursor-pointer disabled:cursor-not-allowed"
      onClick={addNewJunkItems}
      disabled={junkOrderDetails.length === 0 || isAddDataCardOpen}
    >
      Add more junk items
    </button>
    <div className="w-full justify-items-center">
      {(junkOrderDetails.length === 0 || isAddDataCardOpen) && (
        <ItemCard setJunkDetails={getjunkDetails} junkorderdetails={junkOrderDetails} handleClose={handleCloseCard} />
      )}
      {junkOrderDetails.map((item) => (
        <ItemCard selectedJunkdata={item} key={item.junkType} deleteJunkOrder={handleDeleteJunkOrder} />
      ))}
    </div>
  </div>
</div>
</div>
)
}

export default  UploadJunkDetails;