import {z} from 'zod';

export const personalDetailSchema = z.object({
    firstName: z.string().min(1, { message: "First name cannot be empty" }),
    lastName: z.string().min(1, { message: "Last name cannot be empty" }),
    phoneNumber: z.string().length(10, { message: "Phone number must be exactly 10 digits" }).regex(/^[6-9]\d{9}$/, { message: "Invalid phone number. Must be 10 digits and start with 6-9." }),
});

export const addressSchema = z
  .object({
    addressId: z.number().optional(), 
    houseNumber: z.string().min(1, { message: "House number is required." }),
    locality: z.string().optional(), 
    street: z.string().optional(), 
    city: z.string().min(1, { message: "City is required." }),
    state: z.string().min(1, { message: "State is required." }),
    pinCode: z
      .string()
      .length(6, { message: "Pin code must be exactly 6 digits." })
      .regex(/^\d{6}$/, { message: "Pin code must contain only numbers." }),
    country: z.string().min(1, { message: "Country is required." }),
  })
  .superRefine((data, ctx) => {
    if (!data.locality && !data.street) {
      ctx.addIssue({
        code: "custom",
        message: "Either 'Locality' or 'Street' must be provided.",
        path: ["locality"], 
      });
    }
  });
  export const passwordSchema = z
  .object({
    oldPassword: z.string().min(1,{ message:"Old password must not be empty"}),
    newPassword: z
      .string()
      .min(6, {message:"Password must contain at least one letter, one number, and one special character"})
      .regex(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+\[\]{};:'",<>\/?]).+$/, {message:"Password must contain at least one letter, one number, and one special character"}),
    confirmPassword: z.string().min(6, {message:"Confirm password must be same as new password"}).regex(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+\[\]{};:'",<>\/?]).+$/, {message:"Password must contain at least one letter, one number, and one special character"}),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const addressListSchema = z.array(addressSchema);
