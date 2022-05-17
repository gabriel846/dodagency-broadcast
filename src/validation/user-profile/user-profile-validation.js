// Packages
import * as yup from "yup";

// Theme
import {
  isNotValid,
  isRequired,
  shouldHaveAtLeastCharacters,
} from "../../environment/theme/Methods";

export const userProfileDeleteAccountValidationSchema = yup.object({
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

export const userProfileEmailWithGoogleValidationSchema = yup.object({
  email: yup.string().required(isRequired("Email")).email(isNotValid("Email")),
});

export const userProfileEmailWithPasswordValidationSchema = yup.object({
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

export const userProfileNameValidationSchema = yup.object({
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

export const userProfilePasswordValidationSchema = yup.object({
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
