import Title from "@/components/Title"
import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import { statistics } from "@/Pages/Dashboard/statistics";
import { MerchantDashBoardCardDetails } from "./merchant";
import { useNavigate } from "react-router-dom";
import { useGetMerchantExpenses, useGetMerchantStatistics } from "@/utils/api/MerchantController/merchant";
import { useEffect } from "react";


export const MerchantMainDashBoard = () => {
  const {data:merchantStatistics} = useGetMerchantStatistics();
  const{data:merchantExpenses}=useGetMerchantExpenses();
  
  const navigate = useNavigate();
  
  useEffect(()=>{
    console.log(merchantStatistics);
  },[merchantStatistics])
  return (
    <div className="w-[100%]">
        <Title title="Dashboard"/>

        {/* statistics panel */}
        <Card
              className="w-[90%] ml-6 mt-4  p-6 shadow items-center rounded-2xl mb-4 md:mb-0 flex justify-between"
            > 
                  <CardTitle className="text-gray-600 font-medium text-[18px]">
                    {" Total Amount Spend"}
                  </CardTitle>
                  <CardTitle className="text-secondary-green font-semibold text-[18px]">
                    {merchantExpenses??0}{"/-"}
                  </CardTitle>
            </Card>
        <div className="md:flex  mt-4 p-6 w-[95%]">
        { merchantStatistics?.map((stat, index) => {
          return (
            <Card
              key={index}
              className="w-[100%] md:mr-8 p-6 shadow items-center rounded-2xl mb-4 md:mb-0"
            >
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="text-gray-600 font-medium text-[18px]">
                    {" "}
                    {stat.label} {"ORDERS"}
                  </CardTitle>
                  <h1 className="text-[24px] font-primary-bold mt-4  md:text-[28px] ">
                    {stat.count}
                  </h1>
                </div>
                <img src={statistics[index%statistics.length].logo} alt="icon related to title"  className=""/>
              </div>
              <div className="flex justify-center items-center mt-4">
                <Button className="bg-white border-2 border-secondary-green text-secondary-green hover:bg-gray-100 cursor-pointer w-[30%] h-[20%]">View Orders</Button>
              </div>
            </Card>
          );
        })}
        </div>
        <Title title="Junk Mangement" />
        <div className="md: p-6 md:grid md:grid-cols-3 md:gap-y-8 md:gap-x-8 md:mt-8 w-[93%] md: mb-20">
            {MerchantDashBoardCardDetails.map((junk, index) => {
                return (
                <Card
                    key={index}
                    className=" p-4 shadow items-center rounded-2xl mb-4 w-[100%] md:mb-0"
                >
                    <div className="flex justify-between items-center">
                    <div>
                        <CardTitle className="text-text-grey font-semibold text-[16px]">
                        {" "}
                        {junk.title}
                        </CardTitle>
                        <h1 className="text-[12px] font-primary text-text-grey mt-4">
                          {junk.description}
                        </h1>
                    </div>
                    <img
                        className="px-1 "
                        src={junk.logo}
                        alt="icon related to title"
                    />
                    </div>
                    <div className="flex justify-center mt-4 w-[100%] ">
                    <Button className="bg-secondary-green text-white w-[45%] hover:bg-primary-green hover:cursor-pointer" onClick={()=>{navigate(`${junk.path}`)}}>{junk.button}</Button>
                    </div>
                </Card>
                );
            })}
            
        </div>
    </div>
  )
}
