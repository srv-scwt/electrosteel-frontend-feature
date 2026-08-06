import * as Yup from "yup";
import { noHtmlTags } from "./noHtmlTags";

export const BussinessEnquirySchema = Yup.object().shape({
    name: Yup.string().required("Name is required").test(noHtmlTags),
    company_name: Yup.string().required("Company name is required").test(noHtmlTags),
    email: Yup.string().email("Invalid email").required("Email is required"),
    mobile: Yup.string()
        .matches(/^[0-9]+$/, "Only numbers allowed")
        .min(10, "Must be at least 10 digits")
        .required("Mobile is required"),
    country: Yup.string().required("Country is required").test(noHtmlTags),
    state: Yup.string().required("State is required").test(noHtmlTags),
    city: Yup.string().required("City is required").test(noHtmlTags),
    address: Yup.string().nullable().test(noHtmlTags),
    query: Yup.string().required("Query is required").test(noHtmlTags),
});
