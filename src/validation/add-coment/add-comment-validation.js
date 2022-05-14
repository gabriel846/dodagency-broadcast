// Packages
import * as yup from "yup";

export const addCommentValidationSchema = yup.object({
  message: yup.string().required("Message is required"),
});
