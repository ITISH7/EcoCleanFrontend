import Title from "@/components/Title";
import { CardDescription, CardTitle } from "@/components/ui/card";
import { Card } from "@mui/material";
import stats from "@/assets/icons/stats2.svg";
import stats3 from "@/assets/icons/stats3.svg";
import clock from "@/assets/icons/clock2.svg";
import close from "@/assets/icons/close.svg";
import AdminPageHeader from "@/components/Common/pageHeaders/adminPageHeader";
import { Button } from "@/components/ui/button";
import { UserData } from "@/utils/types/types";
import { useEffect, useRef, useState } from "react";
import profilepic from "@/assets/icons/user.svg"
import UserAddressCard from "@/components/Common/userAddressCard/userAddressCard";
import { formatedAddress } from "@/utils/utils";
import { useNavigate, useParams } from "react-router-dom";
import CommonModalCard, { ModalRef } from "@/components/Common/ModalCards/commonModalCard";
import { modalContent } from "@/utils/constants/constants";
import { useGetUserDetailsByEmail, useUnBlockUsersByEmail } from "@/utils/api/adminController/users";
import { useGetRewardsByEmail } from "@/utils/api/rewardsController/rewards";
import { useGetAdminStatisticsByEmail } from "@/utils/api/statisticsController/statistics";


const BlockedUserProfile = () => {
      const modalref = useRef<ModalRef>(null);
      const navigate = useNavigate();
      const { email } = useParams<{ email: string }>();
      const { data:profileData, isLoading, error, isError ,isSuccess, refetch} = useGetUserDetailsByEmail(email??"abcd");
      const {mutate:unBlockUser}=useUnBlockUsersByEmail(email??"");
      const {data:rewards} = useGetRewardsByEmail(email??"");
      const {data:userStatistics} = useGetAdminStatisticsByEmail(email??"");
      useEffect(()=>{
          if(isSuccess){
          refetch();
          setUserData(profileData)}
        },[profileData])
      const confirmFilter=()=>{
        unBlockUser();
        modalref.current?.closeModal()
        navigate("/admindashboard/blockedusers");
      }
      const handleOpenCard=()=>{
          modalref.current?.openModal()
      }

      const [userData, setUserData] = useState<UserData>();


  return (
    <div className="w-full">
        <AdminPageHeader heading="" link="/admindashboard/blockedusers"/>
        <Title title="Blocked User Profile" />
        {isLoading&& <div className="md:mx-10 mt-6 min-h-36 sm:flex shadow rounded-2xl gap-10 p-5 justify-between text-[20px] w-full font-primary-bold  md:text-[24px]">Loading...</div>}
        {isError&& <div className="md:mx-10 mt-6 min-h-36 sm:flex shadow rounded-2xl gap-10 p-5 justify-between text-[20px] w-full font-primary-bold md:text-[24px]">Error:Could Not retrive data-{error?.message}</div>}
        {isSuccess && <div className="w-full">
          <Card className="md:mx-10 mt-6 min-h-36 text-[18px] sm:flex shadow rounded-2xl gap-10 p-5 justify-between">
            <div className="w-full flex gap-5">
              <img className="w-20"
                src={profilepic}
                alt="client profile pic"
              />
              <div>
                <CardTitle
                  className={`text-[20px] w-full font-primary-bold mt-4  md:text-[24px] `}
                >
                  {userData?.firstName} {userData?.lastName}
                </CardTitle>
                <CardDescription className="text-[16px] w-full font-primary-bold md:text-[18px] ">
                  <p>{userData?.email}</p>
                  <p>{userData?.phoneNumber}</p>
                </CardDescription>
              </div>
            </div>
            <div>
                <Button
                  className="hover:cursor-pointer hover:bg-secondary-green hover:text-white text-secondary-green border-2 border-secondary-green mt-4 p-1  px-4  md:text-[16px] font-primary-bold md:block bg-white " onClick= {handleOpenCard}
                >
                  Unblock User
                </Button>                
            </div>
        </Card>
        <UserAddressCard addressHeading="Primary Address" address={formatedAddress(userData?.address[0])}/>
        <div className="flex justify-between w-[95%]">
          <Title title="Statistics" />
          <Button className="hover:cursor-pointer border-secondary-green mt-10 p-1 px-4 md:text-[16px] font-primary-bold md:block hover:bg-secondary-green bg-white text-secondary-green hover:text-white border-2">
            View Orders
          </Button>
        </div>
        <div className="flex  mx-4 md:mx-0 justify-between w-[80%] md:w-[30%] mt-4 md:ml-8 border-b-2 border-gray-400">
              <p className="text-[20px] font-medium">Total Rewards Earned:</p>
              <p className="text-[20px] font-medium text-secondary-green">{`₹${rewards?.totalRewards}`}</p>
        </div>
        <div className="w-full md:grid grid-cols-3 gap-10 mt-4 p-6">
            <Card
              className="w-[100%] md:mr-8 p-6 shadow-2xl items-center rounded-4xl mb-10 md:mb-0 "
            >
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="text-gray-600 font-medium text-[18px]">
                    {"Completed Orders"}
                  </CardTitle>
                  <h1 className="text-[24px] font-primary-bold mt-4  md:text-[28px] ">
                    {userStatistics?.completedOrders}
                  </h1>
                </div>
                <img src={stats} alt="icon related to title" className="" />
              </div>
            </Card>
            <Card
              className="w-[100%] md:mr-8 p-6 shadow-2xl items-center rounded-4xl mb-10 md:mb-0 "
            >
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="text-gray-600 font-medium text-[18px]">
                    {"Pending Orders"}
                  </CardTitle>
                  <h1 className="text-[24px] font-primary-bold mt-4  md:text-[28px] ">
                    {userStatistics?.pendingOrders}
                  </h1>
                </div>
                <img src={stats3} alt="icon related to title" className="" />
              </div>
            </Card>
            <Card
              className="w-[100%] md:mr-8 p-6 shadow-2xl items-center rounded-4xl mb-10 md:mb-0 "
            >
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="text-gray-600 font-medium text-[18px]">
                    {"Ongoing Orders"}
                  </CardTitle>
                  <h1 className="text-[24px] font-primary-bold mt-4  md:text-[28px] ">
                    {userStatistics?.ongoingOrders}
                  </h1>
                </div>
                <img src={clock} alt="icon related to title" className="" />
              </div>
            </Card>
            <Card
              className="w-[100%] md:mr-8 p-6 shadow-2xl items-center rounded-4xl mb-10 md:mb-0 "
            >
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="text-gray-600 font-medium text-[18px]">
                    {"Cancelled Orders"}
                  </CardTitle>
                  <h1 className="text-[24px] font-primary-bold mt-4  md:text-[28px] ">
                    {userStatistics?.cancelledOrders}
                  </h1>
                </div>
                <img src={close} alt="icon related to title" className="" />
              </div>
            </Card>
        </div>
      </div>}
      <CommonModalCard ref={modalref} title={modalContent.unblockuser.title} description={modalContent.unblockuser.description}>
                <Button
                className="bg-secondary-green text-white w-[45%] hover:bg-primary-green"
                onClick={confirmFilter}
                >
                Confirm
                </Button>
        </CommonModalCard>
    </div>
  );
};

export default BlockedUserProfile;