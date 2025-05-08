import { Button } from "@/components/ui/button";
import searchImage from "@/assets/icons/search2.svg";
import searchImage2 from "@/assets/icons/search3.svg";
import { FormEvent, useState } from "react";

type SearchBarData<T extends Record<string, unknown>> = {
  placeholder: string;
  data?: T[];
  updateData: (data: T[]) => void;
};

const BetterSearchBar = <T extends Record<string, unknown>>({
  placeholder = "Search with EcoClean",
  data,
  updateData,
}: SearchBarData<T>) => {
  const [searchedValue, setSearchedValue] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchedValue(e.target.value);
    if (!e.target.value) {
      updateData(data ?? []);
    }
  };

  const handleFilter = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let updatedData = data?.filter((item) =>
      Object.values(item).some((value) =>{
        if (typeof value === "string"){ return value.toLowerCase().includes(searchedValue.toLowerCase())}
        else if (typeof value === "number"){return value === Number(searchedValue)}
        else return false;
      })
    );
    updateData(updatedData ?? []);
  };

  return (
    <form className="flex mt-10 md:mb-4 items-center w-[97%] h-[50px]" onSubmit={handleFilter}>
      <div className="flex box-border border border-[#888888] w-[100%] h-[100%] rounded-xl shadow p-2 items-center">
        <img src={searchImage} alt="search icon" />
        <input
          type="text"
          placeholder={placeholder}
          className="text-[16px] md:text-[18px] w-full outline-none"
          onChange={handleChange}
          value={searchedValue}
        />
      </div>
      <Button className="mx-2 bg-secondary-green md:p-6 flex hover:bg-primary-green h-[100%] rounded-2xl">
        <img src={searchImage2} alt="search icon" />
        <p className="md:text-[18px] font-bold uppercase">Search</p>
      </Button>
    </form>
  );
};

export default BetterSearchBar;
