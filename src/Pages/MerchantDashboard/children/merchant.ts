import cart from "@/assets/icons/cart.svg";
import money from "@/assets/icons/money3.svg";
import clock from "@/assets/icons/clock3.svg";
export const MerchantDashBoardCardDetails = [

    {
        "id":"1",
        "title":"AvailableOrders",
        "description":"View and manage available pickup orders seamlessly",
        "logo":cart,
        "path":"/merchant/available-orders",
        "button":"View Orders"
    },
    {
        "id":"2",
        "title":"check Current Rates",
        "description":"Quickly view the latest estimated rates for your junk .",
        "logo":money,
        "path":"/merchant/check-current-rates",
        "button":"Check Rates"
    },
    {
        "id":"3",
        "title":"Order History",
        "description":"Access a detailed record of your past pickups, including dates, categories, weights, and earnings, all in one place.",
        "logo":clock,
        "path":"/merchant/order-history",
        "button":"View History"
    },
    {
        "id":"4",
        "title":"Applied Orders",
        "description":"View and manage orders that you have applied for.",
        "logo":cart,
        "path":"/merchant/applied-orders",
        "button":"View Orders"
    }

]