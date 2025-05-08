import { Button } from "@/components/ui/button";
import searchImage from "@/assets/icons/search2.svg";
import searchImage2 from "@/assets/icons/search3.svg";
import { useEffect, useState } from "react";
export default function DynamicSearchBar() {
  const [placeholder, setPlaceholder] = useState("Enter any Junk Type to search price");

  useEffect(() => {
    const updatePlaceholder = () => {
      setPlaceholder(window.innerWidth < 640 ? "Enter any Junk Type" : "Enter any Junk Type to search price");
    };

    updatePlaceholder();
    window.addEventListener("resize", updatePlaceholder);

    return () => window.removeEventListener("resize", updatePlaceholder);
  }, []);
  return (
    <div className=" flex  mt-10  md:mb-4 items-center w-[97%] h-[50px]">
      <div className="flex box-border border border-[#888888] w-[100%]   h-[100%] rounded-xl shadow p-2 items-center">
        <img src={searchImage} alt="search icon"/>
        <input type="text" placeholder={placeholder} className="text-[16px] md:text-[18px] w-full outline-none" />
      </div>
      <Button className="mx-2 bg-secondary-green md:p-6 flex hover:bg-primary-green h-[100%] rounded-2xl"><img src={searchImage2} alt="search icon"></img><p className="md:text-[18px]  font-bold uppercase">Search</p></Button>
    </div>
  );
}
/* txt */


