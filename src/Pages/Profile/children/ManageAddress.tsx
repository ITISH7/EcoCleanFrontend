import Title from "@/components/Title";
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { profileDetails } from "@/utils/constants/constants";
import Box from "@/components/Common/box/Box";
import updateIcon from "@/assets/icons/update.svg";
import plusIcon from "@/assets/icons/plus.svg";
import { Button } from "@/components/ui/button";
import { useDeleteAddress, usegetAllAddress, useUpdateAddress, useUpdatePrimaryAddress } from "@/utils/api/addressController/address";
import { addressSchema } from "@/utils/ProfileValidations";
import NewAddressForm from "@/components/Address/newAddressForm";
import { Address } from "@/utils/types/types";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedAddressDetails } from "@/slice/selectedAddressDetailSlice";
import { RootState } from "@/store/store";


type ManageAddress = {
  selectaddress?: boolean;
}
const ManageAddress: React.FC<ManageAddress> = ({selectaddress}) => {
  const selectedAddressDetails = useSelector((state:RootState) => state.Addressdetails.selectedAddressDetails);
  const dispatch =useDispatch()
  const [newAddress, setNewAddress] = useState(false);
  const { data: addresses, isLoading } = usegetAllAddress();
  const { mutateAsync: updateAddress } = useUpdateAddress();
  const {mutateAsync:deleteAddress}=useDeleteAddress();
  const {mutateAsync:primaryAddress}=useUpdatePrimaryAddress();
  const [editMode, setEditMode] = useState<{ [key: string]: boolean }>({});
  const [editedAddresses, setEditedAddresses] = useState<{
    [key: string]: any;
  }>({});
  const [validationErrors, setValidationErrors] = useState<{
    [key: string]: { [field: string]: string };
  }>({});

  const handleUpdate = (id: number, address: any) => {
    setEditMode((prev) => ({ ...prev, [id]: true }));
    setEditedAddresses((prev) => ({ ...prev, [id]: { ...address } }));
  };

  const handleChange = (id: number, key: string, value: string) => {
    setEditedAddresses((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [key]: value,
      },
    }));
  };
  const handleclose=()=>{
    setNewAddress(false);
  }
  const handleCancel = (id: number) => {
    setValidationErrors((prev) => ({ ...prev, [id]: {} }));
    setEditMode((prev) => ({ ...prev, [id]: false }));
  };
  const handlePrimaryAddress =(id:number)=>{
    primaryAddress(id);
    setEditMode((prev) => ({ ...prev, [id]: false }));
  }
  const handleSelectAddress=(data:Address)=>{
    dispatch(setSelectedAddressDetails(data));
  }
  const handleSave = async (id: number) => {
    const addressData = editedAddresses[id];
    const result = addressSchema.safeParse(addressData);
    if (!result.success) {
      const errors: { [field: string]: string } = {};
      result.error.errors.forEach((err) => {
        if (err.path.length > 0) {
          errors[err.path[0] as string] = err.message;
        }
      });

      setValidationErrors((prev) => ({ ...prev, [id]: errors }));
      return;
    }
    setValidationErrors((prev) => ({ ...prev, [id]: {} }));

    try {
      await updateAddress(editedAddresses[id]);
      setEditMode((prev) => ({ ...prev, [id]: false }));
    } catch (error) {
      console.error("API call failed:", error);
    }
  };
  return (
    <div className="w-full lg:w-[100%] mx-4 h-screen md:pb-15">
      <div className="w-[96%] md:flex justify-between items-center mt-4">
        <Title title="Manage Address" className="mx-2" />
        {!newAddress&&<Button className="flex bg-secondary-green items-center rounded-xl hover:bg-primary-green mt-4 justify-center cursor-pointer" onClick={() => setNewAddress(true)}>
          <img
            src={plusIcon}
            className="h-[20px] hidden md:block mt-2 mb-2"
            alt="Add Icon"
          />
          <span className="text-white text-[18px]">Add New Address</span>
        </Button>}
      </div>
      <Box className="overflow-y-auto w-[95%] justify-center items-center  mt-4 md:mt-0 md:w-[95%]">
        {newAddress && <NewAddressForm handleclose={handleclose}/>}
        {!newAddress &&!isLoading &&
          addresses?.map((address, index) => {
            const isEditing = editMode[address.addressId] || false;

            return (
              <Card
                key={address.addressId || index}
                className={`p-6 mx-4 mt-6 lg:w-[95%] mb-10  ${selectaddress&&selectedAddressDetails&&selectedAddressDetails.addressId==address.addressId?"border-2 border-primary-green":""}`}
              >
                <div className="md:flex justify-between items-center mb-6">
                  <p className="text-[18px] font-bold text-secondary-green">
                    {index==0?"Primary Address Information":"Secondary Address Information"}
                  </p>
                  {!selectaddress?
                  <div className="flex mt-2 -mx-2 md:mt-0 md:-mx-0 ">
                  {index!==0&&
                     <Button
                     className="flex  bg-white box-border border-2  oultine-none border-red-600 items-center rounded-xl hover:bg-gray-100 cursor-pointer"
                     onClick={() => deleteAddress(address.addressId)}
                   >
                     <span className="text-red-500 text-[18px]">
                       delete 
                     </span>
                   </Button>
                  }
                  {!isEditing? (
                    <Button
                      className="flex bg-secondary-green items-center rounded-xl hover:bg-primary-green mx-2 cursor-pointer"
                      onClick={() => handleUpdate(address.addressId, address)}
                    >
                      <img
                        src={updateIcon}
                        className="h-[20px] hidden md:block"
                        alt="Update Icon"
                      />
                      <span className="text-white text-[18px]">
                        {profileDetails.update}
                      </span>
                    </Button>
                  ) :
                  <>{index!==0&&
                    <Button
                  className="flex bg-secondary-green items-center rounded-xl hover:bg-primary-green mx-2 cursor-pointer"
                  onClick={() => handlePrimaryAddress(address.addressId)}
                >
                  <img
                    src={updateIcon}
                    className="h-[20px] hidden md:block"
                    alt="Update Icon"
                  />
                  <span className="text-white text-[18px]">
                    Mark As Primary
                  </span>
                </Button>}</> }
                  </div>:
                  <div className="flex mt-2 -mx-2 md:mt-0 md:-mx-0 ">
                  
                   {selectedAddressDetails?.addressId!==address.addressId&& 
                    <Button
                      className="flex bg-secondary-green items-center rounded-xl hover:bg-primary-green mx-2 cursor-pointer"
                      onClick={() => handleSelectAddress(address)}
                    >
                      <img
                        src={updateIcon}
                        className="h-[20px] hidden md:block"
                        alt="Update Icon"
                      />
                      <span className="text-white text-[18px]">
                        select this Address
                      </span>
                    </Button>}
                 
                  </div>
                  }
                  
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full mb-6">
                  {Object.entries(address)
                    .filter(([key]) => key !== "addressId")
                    .map(([key, value]) => (
                      <div key={key} className="w-full">
                        <p className="text-[18px] font-bold">{key}</p>
                        {isEditing ? (
                          <>
                            <input
                              type="text"
                              value={
                                editedAddresses[address.addressId]?.[key] || ""
                              }
                              onChange={(e) =>
                                handleChange(
                                  address.addressId,
                                  key,
                                  e.target.value
                                )
                              }
                              className={`w-full bg-gray-100 min-h-[40px] mt-4 rounded-xl font-bold text-gray-600 px-2 pt-2 border outline-none ${
                                validationErrors[address.addressId]?.[key]
                                  ? "border-red-500"
                                  : "border-green-500"
                              }`}
                            />
                            {validationErrors[address.addressId]?.[key] && (
                              <p className="text-red-500 text-sm mt-1">
                                {validationErrors[address.addressId][key]}
                              </p>
                            )}
                          </>
                        ) : (
                          <p className="w-full bg-gray-100 min-h-[40px] mt-4 rounded-xl font-bold text-left text-gray-600 px-2 pt-2">
                            {value}
                          </p>
                        )}
                      </div>
                    ))}
                  {isEditing && (
                    <div className="w-full flex justify-end mt-8 mx-8 md:mx-0">
                      <Button
                        className="flex bg-red-600 items-center rounded-xl hover:bg-red-400 cursor-pointer"
                        onClick={() => handleCancel(address.addressId)}
                      >
                        <img
                          src={updateIcon}
                          className="h-[20px] hidden md:block"
                          alt="Cancel Icon"
                        />
                        <span className="text-white text-[18px]">
                          {profileDetails.cancel}
                        </span>
                      </Button>
                      <Button
                        className="flex bg-secondary-green items-center rounded-xl hover:bg-primary-green mx-2 md:mx-6 mr-5 cursor-pointer"
                        onClick={() => handleSave(address.addressId)}
                      >
                        <img
                          src={updateIcon}
                          className="h-[20px] hidden md:block"
                          alt="Save Icon"
                        />
                        <span className="text-white text-[18px]">
                          {profileDetails.save}
                        </span>
                      </Button>
                    </div>
                  )}
                </div>
              </Card>
            );
          })}
      </Box>
    </div>
  );
};

export default ManageAddress;
