import { z } from "zod";
import { addressSchema, passwordSchema, personalDetailSchema } from "../ProfileValidations";

interface HeroSectionProps {
  scrollToGetStarted: () => void;
  scrollToLandingDetails: () => void;
}
type Junkroutedata = {
  title: string;
  link: string;
  icon: string;
  description: string;
  buttonLabel?: string;
}
type Statistics = {
  label: string,
  count: number
}
type Address = {
  addressId: number;
  houseNumber: string;
  locality: string;
  street: string;
  city: string;
  state: string;
  pinCode: string;
  country: string;
};

type UserData = {
  firstName: string;
  lastName: string;
  email: string;
  address: Address[];
  phoneNumber: string;
};
type passwordDetails = z.infer<typeof passwordSchema>;
type PersonalDetails = z.infer<typeof personalDetailSchema>;
type AddressDetails = z.infer<typeof addressSchema>;

type ItemDetailType = {
  junkType: string,
  JunkWeight: number,
  EstimatedPrice: number,
}
type ItemType = {
  deleteCard?: () => void,
  setJunkDetails?: (data: ItemDetailType) => void,
  junkorderdetails?: ItemDetailType[]
  selectedJunkdata?: ItemDetailType
  deleteJunkOrder?: (junkTypeToDelete: string) => void,
  handleClose?: () => void
}

type OrderDetails = {
  junkdetails: ItemDetailType[],
  addressId: string
}
type JunkData = {
  junkType: string,
  unitPrice: number,
}
type RegisterGeneralFormState = {
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  password: string;
  userType: string;
}

type RegisterAddressFormState = {
  houseNumber?: string;
  street?: string;
  locality?: string;
  pinCode?: string;
  city?: string;
  selectState?: string;
  selectCountry?: string;
}
type RegisterFormData = {
  generalForm: RegisterGeneralFormState;
  addressForm: RegisterAddressFormState;
};
type LoginFormData = {
  email: string;
  password: string;
};
type FilterParams = {
  page?: number;
  size?: number;
  sort?: string[];
  startDate?: string;
  endDate?: string;
  minPrice?: number;
  maxPrice?: number;
  status?: string;
}
type FilteredData = {
  viewDetails: string;
  orderDate: string;
  orderId: string;
  status: string;
  totalPrice: string;
}
type FilterResonse = {
  content: FilteredData[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
}
type User = {
  email: string,
  firstName: string,
  lastName: string,
  role: string,
}
type UsersResponse = {
  content: User[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
}

type MerchantStatistics = {
  label: String,
  count: number
}
type AvailableOrderContent = {

  orderId: String,
  orderDate: Date,
  totalPrice: number,
  address: String

}
type ClientDetails = {
  firstName: String,
  lastName: String,
  email: String,
  address: Address[],
  phoneNumber: number
}
type UserProfileData = {
  firstName: string;
  lastName: string;
  email: string;
  address: Address;
  phoneNumber: string;
}

type Admin = {
  email: string,
  firstName: string,
  lastName: string,
  phoneNumber: string,
}
type AdminsResponse = {
  content: Admin[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
}
type Rewards = {
  totalRewards: number,
}
type AdminStatisics = {
  completedOrders: number,
  pendingOrders: number,
  cancelledOrders: number,
  ongoingOrders: number,
}
type AdminJunkData = {
  junkType: string,
  unitPrice: string,
}
type JunkItemDetails = {
  junkType: string,
  junkCategory: string,
  unitPrice: number,
}
type HomePageStatistics = {
  label: string;
  count: number;
}
type SpecificOrderDetails = {
  orderId: string;
  status: 'PENDING' | 'COMPLETED' | 'CANCELLED';
  orderDate: string;
  totalPrice: number;
  address?: {
    addressId: number;
    houseNumber: string;
    locality: string;
    street: string;
    city: string;
    state: string;
    pinCode: string;
    country: string;
  };
  junkItems: {
    junkType: string;
    weight: number;
    unitPrice: number;
    estimatedPrice: number;
  }[];
  userDetails?: {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
  };
  merchantDetails?: {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
  };
}
type AdminRouteData = {
  title: string;
  link: string;
  icon: string;
  description: string;
  buttonLabel?: string;
};
type AdminMenuItem = {
  icon: string,
  label: string,
  onClick?: () => void,
  isactive?: boolean,
  activeicon: string,
  link?: string
}
type filterProps = {
  closeCard: () => void;
  confirmFilter: (params: FilterParams) => void;
}
type UserDetailsType = {
  profilePic: string,
  name?: string,
  email?: string,
  phoneNumber?: number
}
export type { HeroSectionProps, Junkroutedata, Statistics, UserData, Address, PersonalDetails, AddressDetails, passwordDetails, ItemDetailType, ItemType, OrderDetails, JunkData, RegisterGeneralFormState, RegisterAddressFormState, RegisterFormData, LoginFormData, FilterParams, User, UsersResponse, UserProfileData, Admin, AdminsResponse, Rewards, AdminStatisics, FilterResonse, FilteredData, AdminJunkData, JunkItemDetails, HomePageStatistics, SpecificOrderDetails, AdminRouteData, AdminMenuItem, filterProps, UserDetailsType,AvailableOrderContent,ClientDetails,MerchantStatistics };
