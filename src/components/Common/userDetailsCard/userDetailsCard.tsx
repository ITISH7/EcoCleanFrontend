import { Card, CardDescription, CardTitle } from "@/components/ui/card"
import { UserDetailsType } from "@/utils/types/types"

const UserDetailsCard:React.FC<UserDetailsType> = ({profilePic,name,email,phoneNumber}) => {
  return (
    <Card className="md:mx-10 mt-6 min-h-36 text-[18px] sm:flex shadow rounded-2xl gap-10 p-5 justify-between">
            <div className="w-full flex gap-5">
              <img className="w-20"
                src={profilePic}
                alt="client profile pic"
              />
              <div>
                <CardTitle
                  className={`text-[20px] w-full font-primary-bold mt-4  md:text-[24px] `}
                >
                  {name??"User Details Not Found"}
                </CardTitle>
                <CardDescription className="text-[16px] w-full font-primary-bold md:text-[18px] ">
                  <p>{email}</p>
                  <p>{phoneNumber}</p>
                </CardDescription>
              </div>
            </div>
          </Card>
  )
}

export default UserDetailsCard