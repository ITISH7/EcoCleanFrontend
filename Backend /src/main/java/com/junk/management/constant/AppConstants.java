package com.junk.management.constant;

public class AppConstants {

  public static final String FIRST_NAME_MANDATORY = "Firstname cannot be null,Please enter your name";

  public static final String PASSWORD_REGEX = "^(?=.*[a-zA-Z])(?=.*\\d)(?=.*[!@#$%^&*()\\-_=+\\[\\]{};:'\",<>\\/?]).+$";

  public static final String PASSWORD_MANDATORY = " a strong password should contain alphabets, numbers and special characters";

  public static final String PASSWORD_NOT_NULL = "Creating a password is necessary to login into your account";

  public static final String EMAIL_NOT_NULL = "Email field can not be null ";

  public static final String EMAIL_VALIDATION = "Please provide a valid email address";

  public static final String ADDRESS_MANDATORY = "Address cannot be empty";

  public static final String PIN_CODE_MANDATORY = "Pin Code cannot be empty";

  public static final String ROLE_MANDATORY = "Role cannot be empty";

  public static final String PHONE_NUMBER_MANDATORY = "Adding Phone number is Mandatory";

  public static final String PHONE_NUMBER_REGEX = "\\d{10}";

  public static final String PHONE_NUMBER_FORMAT = "The Phone Number should be valid 10 digit number";

  public static final String PIN_CODE_REGEX = "\\d{6}";

  public static final String PIN_CODE_VALIDATION = "Add valid 6 digit Pin Code";

  public static final String DUPLICATE_PHONE_NUMBER_ERROR_MESSAGE = "This phone number is already registered";

  public static final String DUPLICATE_EMAIL_ERROR_MESSAGE = "This email is already registered";

  public static final String USER_NOT_FOUND_BY_EMAIL = "No user found by this email";

  public static final String TOKEN_NOT_CREATED = "Exception occurred while createAuthenticationToken";

  public static final String INCORRECT_EMAIL_PASSWORD = "Entered email or password is incorrect";

  public static final String UNABLE_TO_GET_TOKEN = "Not able to get Jwt Token";

  public static final String INCORRECT_PASSWORD = "The password you used is wrong or changed, Please enter the correct password";

  public static final String USER_DATA_UPDATE_MESSAGE = "User's Details are updated";

  public static final String PASSWORD_CHANGED_MESSAGE = "Your password has been changed successfully";

  public static final String LOGOUT_MESSAGE = "You have been logged out successfully";

  public static final String ADDRESS_NULL_MESSAGE = "There are no such address that user have registered";

  public static final String ADDRESS_ADDED_MESSAGE = "The address is added to your account";

  public static final String ADDRESS_UPDATED_MESSAGE = "The changes you made in your address were successful";

  public static final String INVALID_ROLE_MESSAGE = "The role you choose is invalid :";

  public static final String ADDRESS_REMOVED_MESSAGE = "Address Removed Successfully";

  public static final String SESSION_EXPIRED_MESSAGE = "The current session is expired, please login again";

  public static final String COUNTRY_NAME_MANDATORY = "Country name cannot be null";

  public static final String STATE_NAME_MANDATORY = "State name cannot be null";

  public static final String CITY_NAME_MANDATORY = "City name cannot be null";

  public static final String EMAIL_UPDATE_DENIED = "You are not allowed to change the email for this account";

  public static final String ADDRESS_UPDATE_DENIED = "You can not change the address list from here";

  public static final String ADDRESS_LOCALITY_MANDATORY = "At least one of Street or Locality must be provided";

  public static final String HOUSE_NUMBER_MANDATORY = "House Number must be provided ";

  public static final String ORDER_CANNOT_BE_CANCELLED = "This order cannot cancelled";

  public static final String ORDER_IS_ALREADY_DELETED = "The order is already deleted";

  public static final String ORDER_NOT_FOUND = "No order found with this email";

  public static final String JUNK_NOT_FOUND = "No junk found with this type: ";

  public static final String ADDRESS_NOT_FOUND = "No address found with this id";

  public static final String JUNK_TYPE_NOT_NULL = "Junk type cannot be null";

  public static final String JUNK_CATEGORY_NOT_NULL = "Junk category can not be null";

  public static final String UNIT_PRICE_NOT_NULL = "Unit price cannot be null";

  public static final String JUNK_ITEM_NOT_NULL = "Junk item cannot be null";

  public static final String ORDER_DELETED = "Order deleted successfully";

  public static final String ADDRESS_ID_NOT_BLANK = "Address id cannot be blank";

  public static final String WEIGHT_NOT_NULL = "Weight cannot be null";

  public static final String DUPLICATE_JUNK_TYPE = "Junk type already exists:";

  public static final String JUNK_ENTERED = "A new junk entered";

  public static final String JUNK_ERROR_MESSAGE = "Error occurred while creating Junk:";

  public static final String FAILED_TO_ENTER_JUNK = "Failed to enter the junk:";

  public static final String INVALID_PAGE_NUMBER = "Nothing found on this page. Please request a valid page number.";

  public static final String VALID_JUNK_CATEGORY = " Junk category should be either recyclable or non-recyclable";

  public static final String UNAUTHORIZED_ACCESS = "You are not authorized";

  public static final String ACCESS_DENIED_MESSAGE = "You are no longer registered on ECOCLEAN, please Register again with diff email";

  public static final String ADMIN_ACCESS_ONLY = "You are not authorized to access this page";

  public static final String USER_NO_LONGER_EXISTS = "This user is already removed from ECOCLEAN";

  public static final String USER_REMOVAL_SUCCESSFUL = "The user is removed from ECOCLEAN successfully";

  public static final String PRIMARY_ADDRESS_CHANGED = "The primary address is now changed";

  public static final String ADDRESS_ALREADY_PRIMARY = "The Address is already Primary";

  public static final String PERMANENT_ADDRESS_DELETION_DENIED = "You cannot delete permanent address";

  public static final String DATA_NOT_UPDATED = "There were no new data to update";

  public static final String JUNK_DETAILS_UPDATED = "Junk Details are updated successfully";

  public static final String JUNK_DETAILS_REMOVED = "The junk's details are removed successfully";

  public static final String INVALID_DATE_RANGE = "The date range is invalid, please provide valid range";

  public static final String INVALID_END_DATE = "End Date is not valid";

  public static final String INVALID_PRICE_RANGE = "Please Enter a valid Price Range";

  public static final String ADDRESS_UPDATED_DENIED_MESSAGE = "There was no particular change made in current address";

  public static final String PASSWORD_CHANGE_DENIED = "The new Password cannot be same as old Password";

  public static final String JUNK_ITEMS_NOT_FOUND = "No junk items found";

  public static final String PENDING_STATUS_NOT_ALLOWED = "Merchant can only see pickups which are assigned to him";

  public static final String ALREADY_APPLIED_FOR_PICKUP = "You have already applied for this pickup";

  public static final String MERCHANT_NOT_FOUND = "No merchant is assigned for this order";

  public static final String UNAUTHORIZED_STATUS_CHANGE = "Merchant can only change the status to pending,verified or completed";

  public static final String COMPLETED_ORDER_STATUS_CHANGE_DENIED = "You cant change the status of a already completed order";

  public static final String ORDER_UPDATED = "Order was updated successfully by merchant";

  public static final String STATUS_CHANGED = "Current Status is successfully changed";

  public static final String ADMIN_ROLE_DENIED = "You are not allowed to register as admin or Super admin";

  public static final String ORDER_CANCELLED = "Order cancelled successfully";

  public static final String ORDER_CANNOT_BE_DELETED = "Order cannot be deleted";

  public static final String INVALID_ADDRESS = "The provided address is not associated with the authenticated user.";

  public static final String UNAUTHORIZED_ACTION = "You are unauthorized to perform this action";

  public static final String YOU_CANNOT_VIEW_DELETED_ORDERS = "Orders with status deleted cannot be viewed";

  public static final String TOKEN_GOT_EXPIRED = "Token was expired.";

  public static final String MERCHANT_APPLIED_FOR_PICKUP = "Merchant has successfully applied for the selected order";

  public static final String USER_UNBLOCKED = "User unblocked successfully";

  public static final String PICKUP_REJECTED = "Merchant has rejected the pickup for this order";

  public static final String NEW_ADMIN_REGISTRATION = "New admin was registered by SUPER_ADMIN";

  public static final String NO_ORDER_FOUND = "No orders found with this status";

  public static final String ADMIN_BLOCKED = "Admin was removed successfully";

  public static final String EMAIL_SUBJECT = "Login Alert!!!";

  public static final String EMAIL_BODY = "You have successfully logged into ecoclean";

  public static final String USER_ALREADY_EXISTS = "This user already exist";
}
