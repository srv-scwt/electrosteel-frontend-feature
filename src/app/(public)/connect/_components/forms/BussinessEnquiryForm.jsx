"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { markEnquirySubmitted } from "@/utils/enquirySubmission";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import InputFieldComponent from "@/components/form/InputFieldComponent";
import TextAreaFieldComponent from "@/components/form/TextAreaFieldComponent";
import style from "@/app/common.module.css";
import { BussinessEnquirySchema } from "../controllers/BussinessEnquirySchema";
import { submitBusinessEnquiry } from "@/services/enquiry.api";

const BussinessEnquiryForm = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState({ type: "", message: "" });
    const router = useRouter();

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(BussinessEnquirySchema),
        defaultValues: {
            name: "",
            company_name: "",
            email: "",
            mobile: "",
            country: "",
            state: "",
            city: "",
            address: "",
            query: "",
        },
    });

    const onSubmit = async (data) => {
        setIsSubmitting(true);
        setSubmitStatus({ type: "", message: "" });

        const payload = {
            name: data.name,
            description: data.query, // Mapped from query
            company_name: data.company_name,
            email_id: data.email,
            phone_number: data.mobile,
            address: data.address,
            country: data.country,
            state: data.state,
            city: data.city,
            query: data.query,
        };

        const result = await submitBusinessEnquiry(payload);

        if (result.error) {
            setSubmitStatus({ type: "error", message: result.error });
            setIsSubmitting(false);
            return;
        }

        reset();
        // Unlocks the thank-you route, which 404s without it.
        markEnquirySubmitted("business");
        // Stay disabled through the navigation, so a slow route change can't be
        // submitted a second time.
        router.push("/business-enquiry-thank-you");
    };

    const handleClear = () => {
        reset();
        setSubmitStatus({ type: "", message: "" });
    };

    return (
        <section style={{ fontFamily: "var(--font-montserrat)" }}>
            <div className={style.containerLg}>
                <div className={style.sectionContent}>
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
                        label="Name"
                        error={errors.name}
                        isRequired
                    />

                    {/* Company Name */}
                    <InputFieldComponent
                        name="company_name"
                        control={control}
                        label="Company Name"
                        error={errors.company_name}
                        isRequired
                    />

                    {/* Email */}
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

                    {/* Mobile */}
                    <InputFieldComponent
                        name="mobile"
                        control={control}
                        label="Mobile"
                        type="tel"
                        inputMode="numeric"
                        autoComplete="tel"
                        maxLength={15}
                        // Strips anything non-numeric as it is typed or pasted, so the
                        // field can never hold text in the first place.
                        sanitize={(value) => value.replace(/\D/g, "")}
                        error={errors.mobile}
                        isRequired
                    />

                    {/* Country / State / City — 3 Column Row */}
                    <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-6">
                        <InputFieldComponent
                            name="country"
                            control={control}
                            label="Country"
                            error={errors.country}
                            isRequired
                        />

                        <InputFieldComponent
                            name="state"
                            control={control}
                            label="State"
                            error={errors.state}
                            isRequired
                        />

                        <InputFieldComponent
                            name="city"
                            control={control}
                            label="City / Town"
                            error={errors.city}
                            isRequired
                        />
                    </div>

                    {/* Address */}
                    <TextAreaFieldComponent
                        name="address"
                        control={control}
                        label="Address"
                        rows={5}
                        error={errors.address}
                        isRequired
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
                        <button
                            type="button"
                            onClick={handleClear}
                            className="px-10 py-3 rounded-[12px] bg-transparent border border-yellow-500 text-yellow-600 hover:bg-yellow-500 hover:text-black transition-all duration-200"
                        >
                            Clear
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`px-10 py-3 rounded-[12px] text-white transition-all duration-200 
                        ${isSubmitting
                                    ? "bg-gray-400 cursor-not-allowed animate-pulse"
                                    : "bg-[#003366] hover:bg-[#002952]"
                                }`}
                        >
                            {isSubmitting ? "Submitting..." : "Submit"}
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

export default BussinessEnquiryForm;
