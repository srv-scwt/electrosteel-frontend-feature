import * as Yup from "yup";
import { noHtmlTags } from "./noHtmlTags";
import { EMAIL_MESSAGE, EMAIL_PATTERN } from "./emailPattern";

export const ShareholderFormSchema = Yup.object().shape({
    name: Yup.string().required("Name is required").test(noHtmlTags),
    folio: Yup.string().required("Folio / DP ID / Client ID is required").test(noHtmlTags),
    shareholding: Yup.string().required("Shareholding is required").test(noHtmlTags),
    email: Yup.string()
        .trim()
        .required("Email is required")
        .matches(EMAIL_PATTERN, {
            message: EMAIL_MESSAGE,
            excludeEmptyString: true,
        })
        .test(
            "no-consecutive-dots",
            EMAIL_MESSAGE,
            (value) => !value || !value.includes("..")
        )
        .max(254, "Email is too long"),
    mobile: Yup.string()
        .trim()
        .required("Mobile is required")
        .matches(/^[0-9]+$/, {
            message: "Only numbers allowed",
            excludeEmptyString: true,
        })
        .min(10, "Must be at least 10 digits")
        .max(15, "Must be at most 15 digits"),
    query: Yup.string().required("Query is required").test(noHtmlTags),
});
