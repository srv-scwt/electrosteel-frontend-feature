"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import InputFieldComponent from "@/components/form/InputFieldComponent";
import TextAreaFieldComponent from "@/components/form/TextAreaFieldComponent";
import { ShareholderFormSchema } from "../controllers/ShareHolderFormSchema";
import style from "@/app/common.module.css";
import { submitShareholderEnquiry } from "@/services/enquiry.api";

const ShareHolderEnquiryForm = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState({ type: "", message: "" });

    const {
        control,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        resolver: yupResolver(ShareholderFormSchema),
        defaultValues: {
            name: "",
            folio: "",
            shareholding: "",
            email: "",
            mobile: "",
            query: "",
        },
    });

    const onSubmit = async (data) => {
        setIsSubmitting(true);
        setSubmitStatus({ type: "", message: "" });

        const payload = {
            name: data.name,
            folio_number: data.folio,
            shareholding: data.shareholding,
            email_id: data.email,
            phone_number: data.mobile,
            query: data.query,
        };

        const result = await submitShareholderEnquiry(payload);

        if (result.error) {
            setSubmitStatus({ type: "error", message: result.error });
        } else {
            setSubmitStatus({ type: "success", message: "Enquiry submitted successfully! We will get back to you soon." });
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
        <div className={style.containerLg}>
        <div  className={style.sectionContent}>
            <div className="text-end">
            <p><strong>Fields marked with <span className="text-red-600">*</span> are mandatory</strong></p>
            </div>
        </div>
    
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full"
        >
            {/* Name */}
            <InputFieldComponent
                name="name"
                control={control}
                label="Name of the Shareholder"
                error={errors.name}
                isRequired
            />

            {/* Folio */}
            <InputFieldComponent
                name="folio"
                control={control}
                label="Folio No. / DP ID / Client ID"
                error={errors.folio}
                isRequired
            />

            {/* Shareholding */}
            <InputFieldComponent
                name="shareholding"
                control={control}
                label="Shareholding (No. of Shares)"
                type="number"
                error={errors.shareholding}
                isRequired
            />

            {/* Email */}
            <InputFieldComponent
                name="email"
                control={control}
                label="Email"
                type="email"
                error={errors.email}
                isRequired
            />

            {/* Mobile */}
            <InputFieldComponent
                name="mobile"
                control={control}
                label="Mobile"
                error={errors.mobile}
            />

            {/* Query */}
            <TextAreaFieldComponent
                name="query"
                control={control}
                label="Query"
                rows={5}
                error={errors.query}
                isRequired
            />

            {/* Buttons */}
            <div className="md:col-span-2 flex gap-4">
                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`px-6 py-2 rounded-[12px] text-white transition-all duration-200 
                        ${isSubmitting
                            ? "bg-gray-400 cursor-not-allowed animate-pulse"
                            : "bg-[#003366] hover:bg-[#002952]"
                        }`}
                >
                    {isSubmitting ? "Submitting..." : "Submit"}
                </button>

                {/* Clear Button */}
                <button
                    type="button"
                    onClick={handleClear}
                    className="px-6 py-2 rounded-[12px] bg-yellow-500 text-black hover:bg-yellow-600 transition-all duration-200"
                >
                    Clear
                </button>
            </div>

            {/* Status Message */}
            {submitStatus.message && (
                <div className={`md:col-span-2 p-4 rounded-md text-sm font-medium ${submitStatus.type === "success" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}>
                    {submitStatus.message}
                </div>
            )}
        </form>
            </div>
        </section>
    );
};

export default ShareHolderEnquiryForm;
