// Packages
import * as yup from "yup";

// Theme
import {
  isNotValid,
  isRequired,
  shouldHaveAtLeastCharacters,
} from "../../environment/theme/Methods";

export const loginValidationSchema = yup.object({
  email: yup.string().required(isRequired("Email")).email(isNotValid("Email")),
  password: yup
    .string()
    .required(isRequired("Password"))
    .min(8, (chars) =>
      shouldHaveAtLeastCharacters({
        string: "Password",
        characters: chars,
      })
    ),
});
