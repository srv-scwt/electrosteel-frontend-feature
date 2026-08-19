"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FiDownload } from "react-icons/fi";
import InputFieldComponent from "@/components/form/InputFieldComponent";
import FileFieldComponent from "@/components/form/FileFieldComponent";
import style from "@/app/common.module.css";
import { CareerEnquirySchema } from "./controllers/CareerEnquirySchema";
import { submitCareerEnquiry } from "@/services/enquiry.api";

const STEPS = [
    { step: "Step 1", label: "Download Employment Form" },
    { step: "Step 2", label: "Fill in your details" },
    { step: "Step 3", label: "Upload Employment Form" },
];

// The API expects DD-MM-YYYY; <input type="date"> always gives YYYY-MM-DD.
const toApiDate = (value) => {
    const [year, month, day] = String(value || "").split("-");
    return year && month && day ? `${day}-${month}-${year}` : "";
};

const CareerEnquiryForm = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isDownloading, setIsDownloading] = useState(false);
    const [submitStatus, setSubmitStatus] = useState({ type: "", message: "" });

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(CareerEnquirySchema),
        defaultValues: {
            name: "",
            email: "",
            phone: "",
            dob: "",
            post_applied_for: "",
            education_qualification: "",
            years_exp: "",
            pdf: null,
        },
    });

    const handleDownload = async () => {
        setIsDownloading(true);
        setSubmitStatus({ type: "", message: "" });

        try {
            const res = await fetch("/api/career-enquiry-document", { cache: "no-store" });
            if (!res.ok) throw new Error("The employment form is not available right now.");

            const blob = await res.blob();
            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download =
                res.headers.get("content-disposition")?.match(/filename="([^"]+)"/)?.[1] ||
                "employment-form.pdf";
            document.body.appendChild(link);
            link.click();
            link.remove();
            URL.revokeObjectURL(url);
        } catch (error) {
            setSubmitStatus({
                type: "error",
                message: error.message || "Could not download the employment form.",
            });
        }

        setIsDownloading(false);
    };

    const onSubmit = async (data) => {
        setIsSubmitting(true);
        setSubmitStatus({ type: "", message: "" });

        const formData = new FormData();
        formData.append("name", data.name.trim());
        formData.append("dob", toApiDate(data.dob));
        formData.append("email_id", data.email.trim());
        formData.append("phone_number", data.phone.trim());
        formData.append("post_applied_for", data.post_applied_for.trim());
        formData.append("education_qualification", data.education_qualification.trim());
        formData.append("years_exp", data.years_exp.trim());
        formData.append("pdf", data.pdf);

        const result = await submitCareerEnquiry(formData);

        if (result.error) {
            setSubmitStatus({ type: "error", message: result.error });
        } else {
            setSubmitStatus({
                type: "success",
                message: "Enquiry submitted successfully! We will get back to you soon.",
            });
            reset();
        }

        setIsSubmitting(false);
    };

    const handleClear = () => {
        reset();
        setSubmitStatus({ type: "", message: "" });
    };

    return (
        <section style={{ fontFamily: "var(--font-montserrat)" }}>
            <div className={style.containerLg} style={{ paddingTop: 0 }}>
                {/* Steps */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    {STEPS.map(({ step, label }) => (
                        <div
                            key={step}
                            className="rounded-[12px] border border-[#d5deeb] bg-[#f7f9fc] px-5 py-4"
                        >
                            <p className="!text-xs font-bold uppercase tracking-[0.08em] !text-[#004aa1]">
                                {step}
                            </p>
                            <p className="!mt-1 !text-sm font-medium !text-gray-800">{label}</p>
                        </div>
                    ))}
                </div>

                {/* Step 1 action */}
                <div className="mt-6 flex flex-wrap items-center gap-4">
                    <button
                        type="button"
                        onClick={handleDownload}
                        disabled={isDownloading}
                        className={`flex items-center gap-2 rounded-[12px] px-6 py-2 font-medium text-black transition-all duration-200 ${isDownloading
                            ? "cursor-not-allowed bg-gray-300"
                            : "bg-[#fdd307] hover:bg-[#e8c206]"
                            }`}
                    >
                        <FiDownload size={18} />
                        {isDownloading ? "Preparing..." : "Download Employment Form"}
                    </button>
                </div>

                <div className={`${style.sectionContent} mt-8`}>
                    <div className="text-end">
                        <p>
                            <strong>
                                Fields marked with <span className="text-red-600">*</span> are
                                mandatory
                            </strong>
                        </p>
                    </div>
                </div>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="grid w-full grid-cols-1 gap-6 md:grid-cols-2"
                    noValidate
                >
                    <InputFieldComponent
                        name="name"
                        control={control}
                        label="Name"
                        error={errors.name}
                        isRequired
                    />

                    <InputFieldComponent
                        name="email"
                        control={control}
                        label="Email"
                        type="email"
                        inputMode="email"
                        autoComplete="email"
                        error={errors.email}
                        isRequired
                    />

                    <InputFieldComponent
                        name="phone"
                        control={control}
                        label="Phone"
                        type="tel"
                        inputMode="numeric"
                        autoComplete="tel"
                        maxLength={15}
                        // Strips anything non-numeric as it is typed or pasted, so
                        // the field can never hold text in the first place.
                        sanitize={(value) => value.replace(/\D/g, "")}
                        error={errors.phone}
                        isRequired
                    />

                    <InputFieldComponent
                        name="dob"
                        control={control}
                        label="Date of Birth"
                        type="date"
                        error={errors.dob}
                        isRequired
                    />

                    <InputFieldComponent
                        name="post_applied_for"
                        control={control}
                        label="Position Applied For"
                        error={errors.post_applied_for}
                        isRequired
                    />

                    <InputFieldComponent
                        name="education_qualification"
                        control={control}
                        label="Educational Qualification"
                        error={errors.education_qualification}
                        isRequired
                    />

                    <InputFieldComponent
                        name="years_exp"
                        control={control}
                        label="Years of Experience"
                        error={errors.years_exp}
                        isRequired
                    />

                    <FileFieldComponent
                        name="pdf"
                        control={control}
                        label="Upload Employment Form"
                        accept="application/pdf"
                        hint="PDF only, up to 5MB."
                        error={errors.pdf}
                        isRequired
                    />

                    <div className="flex gap-4 md:col-span-2">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`rounded-[12px] px-10 py-3 text-white transition-all duration-200 ${isSubmitting
                                ? "animate-pulse cursor-not-allowed bg-gray-400"
                                : "bg-[#003366] hover:bg-[#002952]"
                                }`}
                        >
                            {isSubmitting ? "Submitting..." : "Submit"}
                        </button>

                        <button
                            type="button"
                            onClick={handleClear}
                            className="rounded-[12px] bg-yellow-500 px-10 py-3 text-black transition-all duration-200 hover:bg-yellow-600"
                        >
                            Clear
                        </button>
                    </div>

                    {submitStatus.message && (
                        <div
                            className={`rounded-md p-4 text-sm font-medium md:col-span-2 ${submitStatus.type === "success"
                                ? "bg-green-50 text-green-700"
                                : "bg-red-50 text-red-700"
                                }`}
                        >
                            {submitStatus.message}
                        </div>
                    )}
                </form>
            </div>
        </section>
    );
};

export default CareerEnquiryForm;
