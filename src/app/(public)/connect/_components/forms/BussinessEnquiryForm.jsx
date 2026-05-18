"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import InputFieldComponent from "@/components/form/InputFieldComponent";
import TextAreaFieldComponent from "@/components/form/TextAreaFieldComponent";
import style from "@/app/common.module.css";
import { BussinessEnquirySchema } from "../controllers/BussinessEnquirySchema";

const BussinessEnquiryForm = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);

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

        console.log("Form Submitted:", data);

        await new Promise((res) => setTimeout(res, 1500));

        reset();
        setIsSubmitting(false);
    };

    const handleClear = () => reset();

    return (
           <section>
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
                label="Name"
                placeholder="Enter name"
                error={errors.name}
                isRequired
            />

            {/* Company Name */}
            <InputFieldComponent
                name="company_name"
                control={control}
                label="Company Name"
                placeholder="Enter company name"
                error={errors.company_name}
                isRequired
            />

            {/* Email */}
            <InputFieldComponent
                name="email"
                control={control}
                label="Email"
                placeholder="Enter email"
                type="email"
                error={errors.email}
                isRequired
            />

            {/* Mobile */}
            <InputFieldComponent
                name="mobile"
                control={control}
                label="Mobile"
                placeholder="Enter mobile"
                error={errors.mobile}
                isRequired
            />

            {/* Country / State / City — 3 Column Row */}
            <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-6">
                <InputFieldComponent
                    name="country"
                    control={control}
                    label="Country"
                    placeholder="Enter country"
                    error={errors.country}
                    isRequired
                />

                <InputFieldComponent
                    name="state"
                    control={control}
                    label="State"
                    placeholder="Enter state"
                    error={errors.state}
                    isRequired
                />

                <InputFieldComponent
                    name="city"
                    control={control}
                    label="City / Town"
                    placeholder="Enter city or town"
                    error={errors.city}
                    isRequired
                />
            </div>

            {/* Address */}
            <TextAreaFieldComponent
                name="address"
                control={control}
                label="Address"
                placeholder="Enter address"
                rows={5}
                error={errors.address}
            />

            {/* Query */}
            <TextAreaFieldComponent
                name="query"
                control={control}
                label="Query"
                placeholder="Enter your query"
                rows={5}
                error={errors.query}
                isRequired
            />

            {/* Buttons */}
            <div className="md:col-span-2 flex gap-4">
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

                <button
                    type="button"
                    onClick={handleClear}
                    className="px-6 py-2 rounded-[12px] bg-yellow-500 text-black hover:bg-yellow-600 transition-all duration-200"
                >
                    Clear
                </button>
            </div>
        </form>
        </div>
        </section>
    );
};

export default BussinessEnquiryForm;
