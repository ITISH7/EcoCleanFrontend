import { Card } from "@/components/ui/card";
import { useChangePassword } from "@/utils/api/authenticationController/authenticateUser";
import { passwordSchema } from "@/utils/ProfileValidations";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";

const UpdatePassword: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      oldPassword: "", 
      newPassword: "",   
      confirmPassword: ""}
  });
  
  const { mutateAsync: updatePassword } = useChangePassword();
  
  const onSubmit = (data: any) => {
    updatePassword(data);
  };
  
  const [visibility, setVisibility] = useState({
    oldPassword: false,
    newPassword: false,
    confirmPassword: false,
  });
  
  const toggleVisibility = (field: 'oldPassword' | 'newPassword' | 'confirmPassword') => {
    setVisibility((prev) => ({ ...prev, [field]: !prev[field] }));
  };
  
  return (
    <div className="w-full lg:w-[90%] mx-4 h-screen md:pb-15 ">
      <Card className="p-6 mt-6 lg:w-[75vw] mb-10 center">
        <div className="w-full flex justify-center items-center">
          <div className="w-full md:w-[50%] bg-white rounded-xl p-8">
            <p className="text-[24px] font-bold text-secondary-green">Update Password</p>
            <form onSubmit={handleSubmit(onSubmit)}>
              {(['oldPassword', 'newPassword', 'confirmPassword'] as const).map((field, index) => (
                <div key={index} className="w-full mt-6 relative">
                  <p className="text-[18px] font-bold">{field.replace(/([A-Z])/g, ' $1')}</p>
                  <div className="relative ">
                    <input
                      type={visibility[field] ? "text" : "password"}
                      {...register(field)}
                      className="w-full bg-gray-100 min-h-[40px] mt-4 rounded-xl font-bold text-left md:text-[16px] text-gray-600 px-2 pt-2 pr-10"
                    />
                    <span
                      className="absolute right-3 top-[65%] transform -translate-y-[50%] cursor-pointer"
                      onClick={() => toggleVisibility(field)}
                    >
                      {visibility[field] ? <EyeOff size={20} /> : <Eye size={20} />}
                    </span>
                  </div>
                  {errors[field] && <p className="text-red-500 text-sm">{errors[field].message}</p>}
                </div>
              ))}
              <div className="w-full mt-6 flex justify-between">
                <button
                  type="submit"
                  className="bg-secondary-green text-white w-[45%] rounded-xl min-h-[40px] font-bold text-lg hover:bg-primary-green"
                >
                  Update
                </button>
                <button
                  type="button"
                  className="bg-white border-2 border-secondary-green text-secondary-green w-[45%] rounded-xl min-h-[40px] font-bold text-lg hover:border-primary-green"
                  onClick={() => reset()}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default UpdatePassword;
