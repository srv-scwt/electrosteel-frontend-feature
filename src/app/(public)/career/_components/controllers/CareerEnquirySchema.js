import * as yup from "yup";

const mobileRegExp = /^[0-9]{10}$/;

export const CareerEnquirySchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  mobile: yup
    .string()
    .matches(mobileRegExp, "Mobile number is not valid")
    .required("Mobile number is required"),
  query: yup.string().notRequired(),
});
