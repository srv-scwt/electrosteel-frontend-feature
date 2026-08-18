"use client";
import React, { useRef } from "react";
import { Controller } from "react-hook-form";
import { FiUploadCloud } from "react-icons/fi";

const FileFieldComponent = ({
    name,
    control,
    label,
    labelStyle,
    accept = "application/pdf",
    hint,
    isRequired = true,
    error,
}) => {
    const inputRef = useRef(null);

    return (
        <div className="flex flex-col w-full">
            <label
                htmlFor={name}
                className={`text-sm font-medium text-gray-800 !mb-1 ${labelStyle}`}
            >
                {label} {isRequired && <span className="text-red-500">*</span>}
            </label>
            <Controller
                name={name}
                control={control}
                render={({ field: { value, onChange, onBlur } }) => (
                    <>
                        <input
                            ref={inputRef}
                            id={name}
                            type="file"
                            accept={accept}
                            onBlur={onBlur}
                            onChange={(event) => onChange(event.target.files?.[0] ?? null)}
                            className="sr-only"
                        />
                        <button
                            type="button"
                            onClick={() => inputRef.current?.click()}
                            className={`flex w-full items-center gap-3 rounded-[12px] border bg-white !px-4 !py-2 text-left text-gray-800 transition focus:outline-none focus:ring-2 ${error
                                ? "border-red-500 focus:ring-red-400"
                                : "border-[#B1B1B1] focus:ring-[#9BC9FF]"
                                }`}
                        >
                            <FiUploadCloud size={18} className="shrink-0 text-[#004aa1]" />
                            <span className={value ? "truncate" : "truncate text-gray-400"}>
                                {value?.name || "Choose file"}
                            </span>
                        </button>
                    </>
                )}
            />
            {hint && !error && <p className="mt-1 !text-xs text-gray-500">{hint}</p>}
            {error && <p className="mt-1 !text-xs !text-red-500">{error.message}</p>}
        </div>
    );
};

export default FileFieldComponent;
