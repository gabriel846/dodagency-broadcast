// Packages
import * as yup from "yup";

// Theme
import {
  isNotValid,
  isRequired,
  shouldHaveAtLeastCharacters,
} from "../../environment/theme/Methods";

export const userProfileDeleteAccountWithPasswordValidationSchema = yup.object({
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

export const userProfileUpdateEmailWithGoogleValidationSchema = yup.object({
  email: yup.string().required(isRequired("Email")).email(isNotValid("Email")),
});

export const userProfileUpdateEmailWithPasswordValidationSchema = yup.object({
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

export const userProfileUpdateNameValidationSchema = yup.object({
  name: yup
    .string()
    .required(isRequired("Name"))
    .matches(/^[a-z- \xC0-\xFF]+$/i, isNotValid("Name"))
    .min(2, (chars) =>
      shouldHaveAtLeastCharacters({
        string: "Name",
        characters: chars,
      })
    ),
});

export const userProfileUpdatePasswordValidationSchema = yup.object({
  password: yup
    .string()
    .required(isRequired("Password"))
    .min(8, (chars) =>
      shouldHaveAtLeastCharacters({
        string: "Password",
        characters: chars,
      })
    ),
  newPassword: yup
    .string()
    .required(isRequired("New password"))
    .min(8, (chars) =>
      shouldHaveAtLeastCharacters({
        string: "New password",
        characters: chars,
      })
    ),
});
