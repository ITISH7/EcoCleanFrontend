import { Card, CardTitle } from "@/components/ui/card";
import AdminPageHeader from "@/components/Common/pageHeaders/adminPageHeader";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import CommonModalCard, { ModalRef } from "@/components/Common/ModalCards/commonModalCard";
import { modalContent } from "@/utils/constants/constants";
import { useRef, useState } from "react";
import { usePostJunkDetails } from "@/utils/api/junkController/junkDetails";
import { JunkItemDetails } from "@/utils/types/types";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useNavigate } from "react-router-dom";

const CreateNewJunkItem = () => {
  const modalref = useRef<ModalRef>(null);
  const navigate = useNavigate();
  const { mutate: createJunkItem } = usePostJunkDetails();

  const [junkItemDetails, setJunkDetails] = useState<JunkItemDetails>({
    junkType: "",
    junkCategory: "",
    unitPrice: 0,
  });

  const handleInputChanges = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setJunkDetails((prev) => ({
      ...prev,
      [name]: name === "unitPrice" ? Number(value) : value,
    }));
  };

  const handleCategoryChange = (value: string) => {
    setJunkDetails((prev) => ({
      ...prev,
      junkCategory: value,
    }));
  };

  const handleReset = () => {
    setJunkDetails({
      junkType: "",
      junkCategory: "",
      unitPrice: 0,
    });
  };

  const confirmFilter = () => {
    if (junkItemDetails) createJunkItem(junkItemDetails);
    modalref.current?.closeModal();
    navigate("/admindashboard/junkItems")
  };

  const handleOpenCard = () => {
    modalref.current?.openModal();
  };

  return (
    <div className="w-full h-screen">
      <AdminPageHeader heading="Manage Junk Items" link="/admindashboard/junkitems" />
      <div className="m-10 justify-items-start">
        <Card className="w-full lg:w-[80%] shadow-xl grid gap-10 p-10">
          <CardTitle className="text-2xl">Create new Junk Item</CardTitle>
          <div>
            <p>Junk Item Type</p>
            <Input
              placeholder="Enter junk item type"
              name="junkType"
              type="text"
              onChange={handleInputChanges}
              value={junkItemDetails.junkType}
            />
          </div>
          <div>
            <p>Junk Item Category</p>
            <Select value={junkItemDetails.junkCategory} onValueChange={handleCategoryChange}>
              <SelectTrigger>
                <SelectValue placeholder="Enter junk item Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recyclable">Recyclable</SelectItem>
                <SelectItem value="non-recyclable">Non-Recyclable</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <p>Estimated Unit price per KG</p>
            <Input
              placeholder="Enter estimate unit price here"
              name="unitPrice"
              type="number"
              onChange={handleInputChanges}
              value={junkItemDetails.unitPrice || ""}
            />
          </div>
          <div className="w-full flex justify-end">
            <div className="w-[50%] flex justify-between">
              <Button
                className="hover:cursor-pointer hover:bg-red-500 hover:text-white border-2 border-red-500 mt-4 p-1 px-4 md:text-[16px] font-primary-bold bg-white text-red-500 w-[45%]"
                onClick={handleReset}
              >
                Reset
              </Button>
              <Button
                className="hover:cursor-pointer bg-secondary-green text-white border-2 border-secondary-green mt-4 p-1 px-4 md:text-[16px] font-primary-bold hover:bg-primary-green w-[45%]"
                onClick={handleOpenCard}
              >
                Submit
              </Button>
            </div>
          </div>
        </Card>
      </div>
      <CommonModalCard ref={modalref} title={modalContent.createjunkitem.title} description={modalContent.createjunkitem.description}>
        <Button className="bg-secondary-green text-white w-[45%] hover:bg-primary-green" onClick={confirmFilter}>
          Confirm
        </Button>
      </CommonModalCard>
    </div>
  );
};

export default CreateNewJunkItem;
