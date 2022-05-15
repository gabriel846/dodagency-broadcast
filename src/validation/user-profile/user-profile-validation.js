// Packages
import * as yup from "yup";

export const userProfileEmailValidationSchema = yup.object({
  email: yup.string().required("Email is required").email("Email is not valid"),
  password: yup
    .string()
    .required("Password is required")
    .min(
      8,
      (chars) => `Password must be at least ${chars.min} characters long`
    ),
});

export const userProfileNameValidationSchema = yup.object({
  name: yup
    .string()
    .required("Name is required")
    .matches(/^[a-z- \xC0-\xFF]+$/i, "Name is not valid")
    .min(2, (chars) => `Name must be at least ${chars.min} characters long`),
});

export const userProfilePasswordValidationSchema = yup.object({
  password: yup
    .string()
    .required("Password is required")
    .min(
      8,
      (chars) => `Password must be at least ${chars.min} characters long`
    ),
  newPassword: yup
    .string()
    .required("New password is required")
    .min(
      8,
      (chars) => `New password must be at least ${chars.min} characters long`
    ),
});
