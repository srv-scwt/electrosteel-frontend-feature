"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import InputFieldComponent from "@/components/form/InputFieldComponent";
import TextAreaFieldComponent from "@/components/form/TextAreaFieldComponent";
import { CareerEnquirySchema } from "../controllers/CareerEnquirySchema";
import style from "@/app/common.module.css";
import { Button, OutlineButton } from "@/components/ui/Button";

const CareerEnquiryForm = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const {
        control,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        resolver: yupResolver(CareerEnquirySchema),
        defaultValues: {
            name: "",
            email: "",
            mobile: "",
            query: "",
        },
    });

    const onSubmit = async (data) => {
        setIsSubmitting(true);
        setIsSubmitted(false);

        console.log("Form Submitted:", data);

        // Simulate API call
        await new Promise((res) => setTimeout(res, 1500));

        reset();
        setIsSubmitting(false);
        setIsSubmitted(true);
        setTimeout(() => setIsSubmitted(false), 5000);
    };

    return (
        <div className="w-full">
            <div className="text-end mb-4">
                <p className="text-sm"><strong>Fields marked with <span className="text-red-600">*</span> are mandatory</strong></p>
            </div>
        
            {isSubmitted && (
                <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
                    Thank you for your enquiry. Our HR team will get back to you within 5–7 working days.
                </div>
            )}

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full"
            >
                <div className="md:col-span-2">
                    <InputFieldComponent
                        name="name"
                        control={control}
                        label="Full Name"
                        placeholder="Enter your full name"
                        error={errors.name}
                        isRequired
                    />
                </div>

                <InputFieldComponent
                    name="email"
                    control={control}
                    label="Email"
                    placeholder="Enter email address"
                    type="email"
                    error={errors.email}
                    isRequired
                />

                <InputFieldComponent
                    name="mobile"
                    control={control}
                    label="Mobile Number"
                    placeholder="Enter mobile number"
                    error={errors.mobile}
                    isRequired
                />

                <div className="md:col-span-2">
                    <TextAreaFieldComponent
                        name="query"
                        control={control}
                        label="Message / Area of Interest"
                        placeholder="Tell us about the role you are looking for..."
                        error={errors.query}
                        rows={4}
                    />
                </div>
                <div className="md:col-span-2 flex justify-start items-center gap-4 mt-4">
                    <Button
                        type="submit"
                        disabled={isSubmitting}
                        title={isSubmitting ? "Submitting..." : "Submit"}
                        iconActive={false}
                        className={`px-6 py-2 rounded-[12px] text-white transition-all duration-200 flex items-center justify-center min-w-[120px] ${
                            isSubmitting
                                ? "bg-gray-400 cursor-not-allowed animate-pulse"
                                : "bg-[#003366] hover:bg-[#002952]"
                        }`}
                    />
                    <OutlineButton
                        type="button"
                        action={() => reset()}
                        disabled={isSubmitting}
                        title="Clear"
                        className={`${style.borderBtn} disabled:opacity-50 min-w-[120px]`}
                    />
                </div>
            </form>
        </div>
    );
};

export default CareerEnquiryForm;
