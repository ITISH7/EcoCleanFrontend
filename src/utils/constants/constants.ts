import gettingStartedImage from  '@/assets/images/gettingStarted.svg';
import plus from "@/assets/icons/plus.svg";
import stats from "@/assets/icons/stats3.svg";
import clock from "@/assets/icons/clock3.svg";
import money from "@/assets/icons/money3.svg";
import { Junkroutedata } from '../types/types';
import client from "@/assets/icons/user.svg"
const hero ={
    title:"Transforming Waste into Worth",
    subTitle:"Effortless Junk Management for a Cleaner, Greener Future",
    details:[
        "Say goodbye to clutter and hello to a sustainable tomorrow!",
        "Our smart junk management system makes it simple to recycle",
        "reduce, and repurpose waste. Whether it’s your home, office",
        "or community,we provide efficient solutions to ensure a cleaner",
        "environment while turning trash into treasure."
    ],
    loading:"Loading statistics...",
    getStartedNow:"Get started Now",
    learnHowItWorks:"Learn How it Works"
}


const landingDetails={
    heading:"Here’s how it",
    strong:"works",
    title:"EcoCLean",
    details:[
        "is a smart and eco-friendly platform that simplifies junk disposal while rewarding users for contributing to sustainability. With seamless junk categorization, convenient pickup scheduling, and real-time tracking,",
        " ensures efficient waste management, promoting a cleaner and greener environment."
    ]

}

const benifitSection={
    heading:"Benefits of",
    title:"Ecoclean",
    description:"Discover how EcoClean not only helps you manage your junk but also rewards you for contributing to a cleaner, greener environment."
}

const gettingStarted={
    heading:"Get Started with",
    title:"EcoClean",
    description:"Choose your EcoClean journey: Customer to manage junk or Driver Partner to help build a greener world.",
    image: gettingStartedImage
}
const dashboard={
    buttonLabel:"new junk pickup",
    plusIcon:plus,
    dashboard:"Dashboard",
    junkmanagement:"Junk Management",
    checkCurrentPrice:"Check Current Price:",
    pickupHistory:"Pick Up History:",
    orderDetails:"Order Details",
}

       

const junkmanagement: Junkroutedata[] = [
    {
        title:"Track Ongoing Pickup:",
        description:"Stay updated in real time. Monitor your driver’s location, receive timely status updates, and track the progress of your junk collection. tracknow..",
        link:"track",
        icon:stats,
        buttonLabel:"Track Now"
    },
    {
        title:"Schedule Pickup:",
        description:"plan your junk pickup with ease. Select the date, time, and category (paper, plastic, metal, etc.) and let us handle the rest for a seamless collection experience",
        link:"schedulepickup",
        icon:clock,
        buttonLabel:"Schedule Now",
    },
    {
        title:"Pickup History:",
        description:"ccess a detailed record of your past pickups, including dates, categories, weights, and earnings, all in one place.",
        link:"viewhistory",
        icon:clock,
        buttonLabel:"View History",
    },
    {
        title:"Check Current Prices:",
        description:"Quickly view the latest rates for your junk and maximize your earnings with informed decisions.",
        link:"checkprice",
        icon:money,
        buttonLabel:"view Prices",
    }
]

const checkCurrentPrice={
     header : ["Junk Type", "Category","Unit Price"],
     data:[
  { "Junk Type": "Paper", "Category":"recyclable","Unit Price": "₹2.5/kg" },
  { "Junk Type": "Plastic", "Category":"non recyclable","Unit Price": "₹2.0/kg" },
  { "Junk Type": "Metal", "Category":"recyclable","Unit Price": "₹5.0/kg" },
  { "Junk Type": "Glass", "Category":"recyclable","Unit Price": "₹1.5/kg" },
  { "Junk Type": "Electronics", "Category":" non recyclable","Unit Price": "₹10.0/kg" },
  { "Junk Type": "Clothes", "Category":"recyclable","Unit Price": "₹3.0/kg" },
]
}

const pickupHistoryAll ={
    header : ["Status","Order Date","Total price", "View"],
    data : []
}
const orderDetails={
    header : ["Junk Type", "Unit Price", "Weight", "Price"],
    data:[
      {
        "Junk Type": "Paper",
        "Unit Price": "₹2.5/kg",
        Weight: "10 KG",
        Price: "₹2.5/kg",
      },
      {
        "Junk Type": "Plastic",
        "Unit Price": "₹2.0/kg",
        Weight: "10 KG",
        Price: "₹2.5/kg",
      },
      {
        "Junk Type": "Metal",
        "Unit Price": "₹5.0/kg",
        Weight: "10 KG",
        Price: "₹2.5/kg",
      },
    ],
    totalAmountheading: "Total Amount:",
    TotalAmount: "75",
    pickUpAddressHeading: "Pick Up Address",
    pickUpAddress: "379, dwarkapuri,Indore Madhya Pradesh ,452009",
    status: "pending",
    date: "10 December 2024",
    pickupHistorylabel:"Home"
}
const profileDetails={
    personalInformationHeading:"Personal Information",
    primaryAddressHeading:"Primary Address Information",
    update:"update",
    cancel:"cancel",
    save:"save changes",
}

const manageJunkItems={
    header : ["Junk Type","Unit Price","Actions"],
    data:[
 { "Junk Type": "Paper","Unit Price": "₹2.5/kg" , "Actions":"Modify","ID": "1"},
 { "Junk Type": "Plastic", "Unit Price": "₹2.0/kg","Actions":"Modify" ,"ID": "2"},
 { "Junk Type": "Metal", "Unit Price": "₹5.0/kg" , "Actions":"Modify","ID": "3"},
 { "Junk Type": "Glass", "Unit Price": "₹1.5/kg", "Actions":"Modify" ,"ID": "4"},
 { "Junk Type": "Electronics", "Unit Price": "₹10.0/kg", "Actions":"Modify" ,"ID": "5"},
 { "Junk Type": "Clothes", "Unit Price": "₹3.0/kg" , "Actions":"Modify","ID": "6"},
]
}
const manageOrders ={
    header : ["Date","Total price","View details"],
    data : [
      { "Date": "02 March 2024","Total price": "₹250" , "View details":"View","ID": "1"},
      { "Date": "02 Arpil 2023","Total price": "₹200", "View details":"View","ID": "2"},
      { "Date": "02 january 2025","Total price": "₹50" ,"View details":"View","ID": "3"},
      { "Date": "01 decemner 2011","Total price": "₹15","View details":"View","ID": "4"},
      { "Date": "31 june 2015","Total price":"₹10" ,"View details":"View","ID": "5"},
      { "Date": "05 july 2017","Total price": "₹30" ,"View details":"View","ID": "6"},
    ]
}
const completeOrderDetails={
    header : [ "estimatedPrice","junkType", "unitPrice","weight"],
    data:[
      {
        "Junk Type": "Paper",
        "Unit Price": "₹2.5/kg",
        Weight: "10 KG",
        Price: "₹2.5/kg",
      },
      {
        "Junk Type": "Plastic",
        "Unit Price": "₹2.0/kg",
        Weight: "10 KG",
        Price: "₹2.5/kg",
      },
      {
        "Junk Type": "Metal",
        "Unit Price": "₹5.0/kg",
        Weight: "10 KG",
        Price: "₹2.5/kg",
      },
    ],
    totalAmountheading: "Total Amount:",
    TotalAmount: "75",
    pickUpAddressHeading: "Pick Up Address",
    pickUpAddress: "Constant Pickup address",
    pickupHistorylabel:"Home",
    status: "pending",
    date: "10 December 2024",
    clientheading: "Client Details",
    clientprofilepic:client,
    clientname: "Client Name",
    clientemail:"client@gmail.com",
    clientphonenumber:8882229991,
    merchantheading: "Merchant Details",
    merchantprofilepic:client,
    merchantname: "Merchant Name",
    merchantemail:"merchant@gmail.com",
    merchantphonenumber:8282939304,
}
const adminFields = [
    { name: "firstName", displayName: "First Name" },
    { name: "lastName", displayName: "Last Name" },
    { name: "email", displayName: "Email Address" },
    { name: "phoneNumber", displayName: "Phone Number" },
    { name: "password", displayName: "Password" },
    { name: "confirmPassword", displayName: "Confirm Password" },
  ];
  const modalContent = {
    blockuser:{
      title:"Do you want to Block user ?",
      description:"This user will be Blocked after this Action. You can further update the user if you want.  ",
    },
    createadmin:{
      title:"Do you want to create new admin ?",
      description:"This admin will be created after this Action. You can further update the admin if you want.  ",
    },
    unblockuser:{
      title:"Do you want to Unblock user?",
      description:"This user will be unblocked after this Action. You can further update the user if you want.",
    },
    createjunkitem:{
      title:"Do you want to create junk item ?",
      description:"This junk item will be created after this Action. You can further update the junk item.",
    },
    deletejunkitem:{
      title:"Delete Junk item",
      description:"Are you sure you want to delete this Junk item? This action cannot be undone.",
    },
    updatejunkitem:{
      title:"Do you want to Update junk item ?",
      description:"This junk item will be Updated after this Action. You can further update the junk item.",
    },
  }
const baseUri = "http://localhost:8080/";
export {hero, landingDetails, benifitSection, gettingStarted, dashboard, junkmanagement ,checkCurrentPrice,pickupHistoryAll,orderDetails,baseUri,profileDetails, manageJunkItems, manageOrders, completeOrderDetails, adminFields,modalContent};