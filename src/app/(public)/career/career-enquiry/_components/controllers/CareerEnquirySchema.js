import * as Yup from "yup";
import { noHtmlTags } from "@/app/(public)/connect/_components/controllers/noHtmlTags";

export const MAX_PDF_BYTES = 5 * 1024 * 1024;

export const CareerEnquirySchema = Yup.object().shape({
    name: Yup.string().trim().required("Name is required").test(noHtmlTags),
    email: Yup.string()
        .trim()
        .email("Invalid email")
        .required("Email is required"),
    phone: Yup.string()
        .trim()
        .required("Phone is required")
        .matches(/^[0-9]+$/, { message: "Only numbers allowed", excludeEmptyString: true })
        .min(10, "Must be at least 10 digits")
        .max(15, "Must be at most 15 digits"),
    dob: Yup.string()
        .required("Date of birth is required")
        .test(
            "not-in-future",
            "Date of birth cannot be in the future",
            (value) => !value || new Date(value) <= new Date()
        ),
    post_applied_for: Yup.string()
        .trim()
        .required("Position applied for is required")
        .test(noHtmlTags),
    education_qualification: Yup.string()
        .trim()
        .required("Educational qualification is required")
        .test(noHtmlTags),
    years_exp: Yup.string()
        .trim()
        .required("Years of experience is required")
        .matches(/^\d{1,2}(\.\d{1,2})?$/, {
            message: "Enter a number, for example 3.5",
            excludeEmptyString: true,
        }),
    pdf: Yup.mixed()
        .nullable()
        .test("required", "Employment form is required", (value) => Boolean(value))
        .test(
            "is-pdf",
            "Only PDF files are allowed",
            (value) => !value || value.type === "application/pdf"
        )
        .test(
            "max-size",
            "File must be 5MB or smaller",
            (value) => !value || value.size <= MAX_PDF_BYTES
        ),
});
