import * as Yup from "yup";
import { noHtmlTags } from "./noHtmlTags";

export const ShareholderFormSchema = Yup.object().shape({
    name: Yup.string().required("Name is required").test(noHtmlTags),
    folio: Yup.string().required("Folio / DP ID / Client ID is required").test(noHtmlTags),
    shareholding: Yup.string().required("Shareholding is required").test(noHtmlTags),
    email: Yup.string().email("Invalid email format").required("Email is required"),
    mobile: Yup.string()
        .matches(/^[0-9]*$/, "Only numbers allowed")
        .min(10, "Mobile must be at least 10 digits")
        .nullable(),
    query: Yup.string().required("Query is required").test(noHtmlTags),
});
