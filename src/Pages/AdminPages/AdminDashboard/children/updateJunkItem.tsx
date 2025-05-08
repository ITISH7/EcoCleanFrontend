import { Card, CardTitle } from "@/components/ui/card";
import AdminPageHeader from "@/components/Common/pageHeaders/adminPageHeader";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import CommonModalCard, { ModalRef } from "@/components/Common/ModalCards/commonModalCard";
import { modalContent } from "@/utils/constants/constants";
import { useRef, useState } from "react";
import { flushSync } from "react-dom";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useDeleteJunkDetails, useGetJunkData, useUpdateJunkDetails } from "@/utils/api/junkController/junkDetails";
import { AdminJunkData, JunkItemDetails } from "@/utils/types/types";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const UpdateJunkItem = () => {
  const [isDeleteButton, setIsDeleteButton] = useState(false);
      const modalref = useRef<ModalRef>(null)
      const navigate = useNavigate();
      const {data:junkData,isSuccess}= useGetJunkData();
      const { mutate:updateJunkItem } = useUpdateJunkDetails();
      const { mutate:deleteJunkItem } = useDeleteJunkDetails();
      const [junkItemDetails, setJunkDetails] = useState<JunkItemDetails>({
        junkType: "",
        junkCategory: "",
        unitPrice:0,
      });
      const handleChange = (name: string, value: string | number) => {
        setJunkDetails((prev) => ({
          ...prev,
          [name]: name === "unitPrice" ? Number(value) : value,
        }));
      };     
      const handleReset = () => {
        setJunkDetails({
          junkType: "",
          junkCategory: "",
          unitPrice: 0,
        });
      };
      const confirmUpdateFilter=()=>{
        if(junkItemDetails.junkType== ""){toast.error("Please select a junk type to Update")}
        else if(junkItemDetails.junkCategory== ""){toast.error("Please select the junk category")}
        else if(junkItemDetails.unitPrice== 0){toast.error("Please enter the unit price")}
        else{updateJunkItem(junkItemDetails)};
        modalref.current?.closeModal();
        navigate("/admindashboard/junkItems")
      }    
      const confirmDeleteFilter=()=>{
        if(junkItemDetails.junkType!== ""){deleteJunkItem(junkItemDetails.junkType)}
        else {toast.error("Please select a junk type to Delete")};
        modalref.current?.closeModal();
        navigate("/admindashboard/junkItems")

      }   
      const handleOpenUpdateCard=async()=>{
        flushSync(() => setIsDeleteButton(false));
        modalref.current?.openModal()
      }  
      const handleOpenDeleteCard= async()=>{
        flushSync(() => setIsDeleteButton(true));
        modalref.current?.openModal()
      }  
  return (
    <div className="w-full h-screen">
      <AdminPageHeader heading="Manage Junk Items" link="/admindashboard/junkitems"/>
      <div className="m-10 justify-items-start">
        <Card className="w-full lg:w-[80%] shadow-xl grid gap-10 p-10">
          <div className="flex justify-between">
            <CardTitle className="text-2xl">Update Junk Item</CardTitle>
            <Button className="hover:cursor-pointer hover:bg-red-500 hover:text-white border-2 border-red-500 mt-4 p-1  px-4  md:text-[16px] font-primary-bold   md:block bg-white text-red-500 w-[20%]" onClick={handleOpenDeleteCard}>
              Delete
          </Button>
          </div>
          <div>
            <p>Junk Item Name</p>
            <Select
              value={junkItemDetails.junkType}
              onValueChange={(value) => handleChange("junkType", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select junk item Type" />
              </SelectTrigger>
              <SelectContent>
                {isSuccess &&
                  junkData.map((item: AdminJunkData) => (
                    <SelectItem key={item.junkType} value={item.junkType}>
                      {item.junkType}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <p>Junk Item Category</p>
            <Select
              value={junkItemDetails.junkCategory}
              onValueChange={(value) => handleChange("junkCategory", value)} >
              <SelectTrigger>
                <SelectValue placeholder="Select junk item Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recyclable">Recyclable</SelectItem>
                <SelectItem value="non-recyclable">Non-Recyclable</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <p>Estimated Unit price per KG</p>
            <Input placeholder="Estimated Unit Price" name="unitPrice" 
            type="number" onChange={(e) => handleChange(e.target.name, e.target.value)} 
            value={junkItemDetails.unitPrice || ""}
            />
          </div>
          <div className="w-full flex justify-end">
            <div className="w-[50%] flex justify-between">
            <Button className="hover:cursor-pointer hover:bg-red-500 hover:text-white border-2 border-red-500 mt-4 p-1  px-4  md:text-[16px] font-primary-bold   md:block bg-white text-red-500 w-[45%]" onClick={handleReset}>
              Reset
            </Button>
            <Button className="hover:cursor-pointer bg-secondary-green text-white border-2 border-secondary-green mt-4 p-1  px-4  md:text-[16px] font-primary-bold   md:block hover:bg-primary-green w-[45%]" onClick={handleOpenUpdateCard}>
              Submit
            </Button>
            </div>
          </div>
        </Card>
      </div>
      {/* update junk item modal */}
      {!isDeleteButton && <CommonModalCard ref={modalref} title={modalContent.updatejunkitem.title} description={modalContent.updatejunkitem.description}>
                <Button
                className="bg-secondary-green text-white w-[45%] hover:bg-primary-green"
                onClick={confirmUpdateFilter}
                >
                Confirm
                </Button>
        </CommonModalCard>}
      {/* delete junk item modal */}
      {isDeleteButton && <CommonModalCard ref={modalref} title={modalContent.deletejunkitem.title} description={modalContent.deletejunkitem.description} isDelete={true}>
                <Button
                className="bg-red-500 text-white w-[45%] hover:text-red-500 hover:bg-white border-red-500 border-2"
                onClick={confirmDeleteFilter}
                >
                Confirm
                </Button>
        </CommonModalCard>}
    </div>
  );
};

export default UpdateJunkItem;
