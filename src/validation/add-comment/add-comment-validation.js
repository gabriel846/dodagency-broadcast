// Packages
import * as yup from "yup";

// Theme
import { isRequired } from "../../environment/theme/Methods";

export const addCommentValidationSchema = yup.object({
  message: yup.string().required(isRequired("Message")),
});
