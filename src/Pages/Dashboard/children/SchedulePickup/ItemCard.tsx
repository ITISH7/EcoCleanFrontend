import { Trash2 } from "lucide-react";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import React, { useEffect, useState } from "react";
import { useGetJunkData } from "@/utils/api/junkController/junkDetails";
import { Button } from "@/components/ui/button";
import { ItemType, JunkData } from "@/utils/types/types";
import { toast } from "sonner";

const ItemCard: React.FC<ItemType> = ({
  setJunkDetails,
  junkorderdetails,
  selectedJunkdata,
  deleteJunkOrder,
  handleClose,
}) => {
  const {data,isError,isLoading} = useGetJunkData();
  const [weight, setWeight] = useState(0);
  const [junkType, setJunkType] = useState("");
  const [junkdata, setJunkdata] = useState<JunkData[]>([]);

  useEffect(() => {
    if (data && !isLoading && !isError) {
      setJunkdata(data ?? []);
    }
  }, [data]);

  const handleWeight = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWeight(Number(event.target.value));
    setEstimatedPrice(
      Number(event.target.value) *
        (junkdata.find((item) => item.junkType === junkType)?.unitPrice ??
          0)
    );
  };
  const handleSelect = (data: string) => {
    setJunkType(data);
  };
  const handleSubmit = () => {
    if (junkType && weight && Estimatedprice) {
      setJunkDetails &&
        setJunkDetails({
          junkType: junkType,
          JunkWeight: Number(weight),
          EstimatedPrice: Estimatedprice,
        });
    } else {
      toast.error("Please fill all the details");
    }
  };
  const [Estimatedprice, setEstimatedPrice] = useState(0);
  const deleteCard = () => {
    if (selectedJunkdata && deleteJunkOrder) {
      deleteJunkOrder(selectedJunkdata.junkType);
    } else if (junkorderdetails?.length != 0 && handleClose) {
      handleClose();
    } else {
      toast.warning("No items to delete");
    }
  };
  return (
    <div className="w-[90%] md:w-full grid gap-5 rounded-2xl shadow-lg p-10">
      <div className="w-full flex justify-between ">
        <h3> ITEM:</h3>
        <button onClick={deleteCard} className="cursor-pointer">
          <Trash2 color="red" />
        </button>
      </div>
      <div className="w-full ">
        {!selectedJunkdata ? (
          <Select onValueChange={handleSelect} defaultValue="">
            <SelectTrigger>
              <SelectValue placeholder="Please select a Junk Category" />
            </SelectTrigger>
            <SelectContent>
              {isLoading && <div>Loading</div>}
              {isError && (
                <div>unable to load data</div>
              )}
              {junkdata
                .filter(
                  (item) =>
                    !junkorderdetails?.some(
                      (order) => order["junkType"] === item.junkType
                    )
                )
                .map((item) => {
                  return (
                    <SelectItem value={item.junkType} key={item.junkType}>
                      {item.junkType}
                    </SelectItem>
                  );
                })}
            </SelectContent>
          </Select>
        ) : (
          <div className="w-[70%] md:w-[100%] p-2 rounded-md border-1 border-black">
            {selectedJunkdata.junkType}
          </div>
        )}
      </div>
      <div className="w-full grid lg:flex gap-5 lg:justify-between ">
        <div className="w-full lg:w-[50%] items-center flex max-lg:justify-between lg:space-x-5">
          {!selectedJunkdata ? (
            <input
              className="w-[70%] md:w-[50%] p-2 rounded-md border-1 border-black"
              placeholder="Enter Weight in kg"
              type="number"
              min={0}
              onChange={handleWeight}
            />
          ) : (
            <div className="w-[70%] md:w-[50%] p-2 rounded-md border-1 border-black">
              {selectedJunkdata.JunkWeight}
            </div>
          )}
          <p className="font-bold align-bottom">KG</p>
        </div>
        <div className="grid md:flex gap-5 items-center">
          <p className="underline text-gray-800 align-bottom">
            {" "}
            Estimated Reward
          </p>
          <p className="underline text-green-800 align-sub">
            ₹
            {selectedJunkdata
              ? selectedJunkdata.EstimatedPrice
              : Estimatedprice}
            /-
          </p>
        </div>
      </div>
      <div className="flex sm:justify-end">
        {!selectedJunkdata && (
          <Button
            className="p-5 bg-secondary-green hover:bg-primary-green"
            onClick={handleSubmit}
          >
            Done
          </Button>
        )}
      </div>
    </div>
  );
};

export default ItemCard;
