import { Address } from "./types/types";

const today = new Date();
const formattedDate = today.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

const formatedAddress=(address:Address|undefined):string=>{
  if(address){
    const filteredaddress = Object.entries(address)
    .filter(([key,value]) => key !== "addressId"&& value) 
    .map(([_, value]) => value) 
    .join(",");
    if(!filteredaddress){
      return "No address Found";
    }
    return filteredaddress;
  }
  else{
    return "No address Found"
  }
}
export{ formattedDate, formatedAddress} ;  

const getFormattedDate = (date: Date) => {
  const getdate = new Date(date);
  return getdate.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}
export {getFormattedDate};
