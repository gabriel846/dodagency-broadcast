// Packages
import * as yup from "yup";

// Theme
import { isNotValid, isRequired } from "../../environment/theme/Methods";

export const forgotPasswordValidationSchema = yup.object({
  email: yup.string().required(isRequired("Email")).email(isNotValid("Email")),
});
