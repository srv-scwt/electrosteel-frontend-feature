import * as Yup from "yup";

export const ShareholderFormSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    folio: Yup.string().required("Folio / DP ID / Client ID is required"),
    shareholding: Yup.string().nullable(),
    email: Yup.string().email("Invalid email format").required("Email is required"),
    mobile: Yup.string()
        .matches(/^[0-9]*$/, "Only numbers allowed")
        .min(10, "Mobile must be at least 10 digits")
        .nullable(),
    query: Yup.string().required("Query is required"),
});
