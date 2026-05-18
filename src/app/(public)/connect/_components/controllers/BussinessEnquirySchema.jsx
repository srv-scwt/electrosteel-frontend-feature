import * as Yup from "yup";

export const BussinessEnquirySchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    company_name: Yup.string().required("Company name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    mobile: Yup.string()
        .matches(/^[0-9]+$/, "Only numbers allowed")
        .min(10, "Must be at least 10 digits")
        .required("Mobile is required"),
    country: Yup.string().required("Country is required"),
    state: Yup.string().required("State is required"),
    city: Yup.string().required("City is required"),
    address: Yup.string().nullable(),
    query: Yup.string().required("Query is required"),
});
