// Packages
import * as yup from "yup";

// Theme
import {
  isNotValid,
  isRequired,
  shouldHaveAtLeastCharacters,
} from "../../environment/theme/Methods";

export const registerValidationSchema = yup.object({
  email: yup.string().required(isRequired("Email")).email(isNotValid("Email")),
  name: yup
    .string()
    .required(isRequired("Name"))
    .matches(/^[a-z- \xC0-\xFF]+$/i, isNotValid("Name"))
    .min(2, (chars) =>
      shouldHaveAtLeastCharacters({ string: "Name", characters: chars })
    ),
  password: yup
    .string()
    .required(isRequired("Password"))
    .min(8, (chars) =>
      shouldHaveAtLeastCharacters({ string: "Password", characters: chars })
    ),
});
