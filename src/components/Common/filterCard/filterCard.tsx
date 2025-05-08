import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import flag from "@/assets/icons/flag.svg";
import { ChangeEvent, FormEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetFilter, setFilter } from "@/slice/filterCardSclice";
import { RootState } from "@/store/store";
import { FilterParams } from "@/utils/types/types";
import { filterProps } from "@/utils/types/types";

const FilterCard = ({ closeCard, confirmFilter }: filterProps) => {
  const dispatch = useDispatch();

  const params = useSelector((state: RootState) => state.filterCard);
  const { minPrice, maxPrice, startDate, endDate, status } = params

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    const key =
      name === "Start price"
        ? "minPrice"
        : name === "End price"
        ? "maxPrice"
        : name === "Start date"
        ? "startDate"
        : name === "End date"
        ?"endDate":"status";

        dispatch(
            setFilter({
              ...{ minPrice, maxPrice, startDate, endDate, status },
              [key]: value,
            })
          );
            };

  const handleReset = () => {
    dispatch(resetFilter());
  };

  const handleCancel = () => {
    closeCard();
  };

  const handleSubmit = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
  
    const cleanedParams = Object.fromEntries(
      Object.entries({
        startDate,
        endDate,
        minPrice: Number(minPrice),
        maxPrice: Number(maxPrice),
        status
      }).filter(([_, value]) => value)
    ) as FilterParams;
    confirmFilter(cleanedParams);
    closeCard();
  };
  

  return (
    <form className="">
       <div className="fixed inset-0 w-screen h-screen">
        <div
          onClick={closeCard}
          className="fixed inset-0 bg-black opacity-60"
        />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-100  max-w-[600px] min-w-[300px] grid gap-5 shadow-xl rounded-2xl p-10">
      <div className="flex justify-between w-full">
        <img src={flag} />
        <Button
          className="border-red-500 border-2 text-red-500 bg-white"
          onClick={handleReset}
          type="button"
        >
          Reset
        </Button>
      </div>
      <div>
        <p className="font-bold">Add Filters</p>
        <p>Add filters to apply on your data</p>
      </div>
      <div className="grid gap-5">
        <div className="flex gap-3">
          <div>
            <p>Start price</p>
            <Input
              className="border-2 rounded-md p-2"
              name="Start price"
              type="number"
              placeholder="Enter Start price"
              onChange={handleInput}
              value={minPrice}
            />
          </div>
          <div>
            <p>End price</p>
            <Input
              className="border-2 rounded-md p-2"
              name="End price"
              type="number"
              placeholder="Enter End price"
              onChange={handleInput}
              value={maxPrice}
            />
          </div>
        </div>
        <div className="flex gap-3 w-[100%]">
          <div className="w-[50%]">
            <p>Start date</p>
            <Input
              className="border-2 rounded-md p-2 w-[100%]"
              name="Start date"
              type="date"
              placeholder="Enter Start date"
              onChange={handleInput}
              value={startDate}
            />
          </div>
          <div className="w-[50%]">
            <p>End date</p>
            <Input
              className="border-2 rounded-md p-2 w-full"
              name="End date"
              type="date"
              placeholder="Enter End date"
              onChange={handleInput}
              value={endDate}
            />
          </div>
        </div>
      </div>
      <div className="w-[100%]">
            <p>Status</p>
            <Input
              className="border-2 rounded-md p-2 w-full"
              name="status"
              placeholder="Enter Status"
              onChange={handleInput}
              value={status}
            />
          </div>
      <div className="flex justify-around">
        <Button
          className="bg-white text-black border-2 w-[45%] hover:bg-gray-50" 
          onClick={handleCancel}
        >
          Cancel
        </Button>
        <Button
          className="bg-secondary-green text-white w-[45%] hover:bg-primary-green"
          onClick={handleSubmit}
        >
          Confirm
        </Button>
      </div>
      </div>
      </div>
    </form>
  );
};

export default FilterCard;
