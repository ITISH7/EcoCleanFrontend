import Title from "@/components/Title";
import { Card, CardTitle } from "@/components/ui/card";
import React, { useEffect, useState } from "react";
import { junkmanagement } from "../junkManagement";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { usegetUserRewards } from "@/utils/api/rewardsController/rewards";

import clock from "@/assets/icons/clock2.svg";
import profiticon from "@/assets/icons/profitlogo.svg";


const MyDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [Myrewards, setMyrewards] = useState({
    TotalRewards: 0,
  }); // State to store merchant details
    
  const {data:myrewards} =  usegetUserRewards();
  useEffect(() => {
          if (Myrewards) {
              setMyrewards(myrewards);
          }
      }, [myrewards]);
  return (
    <div className="w-[100%] lg:w-[75%] m-auto mx-4">
      <Title title="Dashboard" />
      <div className="md:flex  mt-4 p-6">
            <Card
              className="w-[100%] md:mr-2 p-6 shadow-2xl items-center rounded-2xl mb-4 md:mb-0"
            >
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="text-gray-600 font-medium text-[18px]">
                    {" "}
                    {"TotalRewards"}
                  </CardTitle>
                  <h1 className="text-[24px] font-primary-bold mt-4  md:text-[28px] ">
                  ₹{0}/-
                  </h1>
                </div>
                <img src={clock} alt="icon related to title"  className=""/>
              </div>
              <div className="flex items-center mt-4">
                <img src={profiticon} alt="arrow" />
                <p className="font-primary ">
                  <span className="text-seconday-green font-primary-bold px-1">
                    {0.0} %
                  </span>{" "}
                  {"from all time"}
                </p>
              </div>
            </Card>
      </div>
      <Title title="Junk Mangement" />
      <div className=" md: p-6 md:grid md:grid-cols-2 md:gap-y-8 md:gap-x-4 md:mt-8 w-[100%] md: mb-20">
        {junkmanagement.map((junk, index) => {
          return (
            <Card
              key={index}
              className=" mr-6 p-4 shadow-2xl items-center rounded-2xl mb-4 w-[100%] md:mb-0"
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
                  src={junk.icon}
                  alt="icon related to title"
                />
              </div>
              <div className="flex justify-center mt-4 w-[100%] ">
                <Button className="bg-secondary-green text-white w-[45%] hover:bg-primary-green hover:cursor-pointer" onClick={()=>{navigate(junk.link)}}>{junk.buttonLabel}</Button>
              </div>
            </Card>
          );
        })}
        
      </div>
    
    <div>
    
    </div>
    
    </div>
  );
};
export default MyDashboard;
