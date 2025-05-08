import {Card, CardTitle, CardDescription } from "@/components/ui/card"

type UserAdressType={
    addressHeading?:string,
    label?:string,
    address?:string,
}
const UserAddressCard:React.FC<UserAdressType> = ({addressHeading="Address",label,address}) => {
    return (
        <Card className="md:mx-10 mt-6 min-h-36 shadow rounded-2xl ">
            <CardTitle className=" text-[18px] flex justify-between font-medium  md:text-[22px] pt-4 px-6 pr-6">
              <p className="text-secondary-green"> {addressHeading}</p>
              <p >
                {label}
              </p>
            </CardTitle>
            <CardDescription className="text-[16px] md:text-[20px] px-6 py-2 max-w-[60%] md:max-w-[30%]">
              {address??"No Address Found"}
            </CardDescription>
        </Card>  )
}

export default UserAddressCard;