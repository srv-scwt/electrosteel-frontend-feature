"use client";
import React from "react";
import { Controller} from "react-hook-form";

const InputFieldComponent = ({
    name,
    control,
    label,
    labelStyle,
    placeholder,
    isRequired = true,
    type = "text",
    error,
    inputMode,
    maxLength,
    autoComplete,
    // Optional filter applied to every keystroke and paste, so disallowed
    // characters never make it into the field in the first place.
    sanitize,
}) => {
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
                render={({ field }) => (
                    <input
                        {...field}
                        id={name}
                        type={type}
                        inputMode={inputMode}
                        maxLength={maxLength}
                        autoComplete={autoComplete}
                        onChange={(event) =>
                            field.onChange(
                                sanitize ? sanitize(event.target.value) : event.target.value
                            )
                        }
                        placeholder={placeholder}
                        className={`w-full bg-white rounded-[12px] border border-[#B1B1B1] !px-4 !py-2 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 ${error
                            ? "border-red-500 focus:ring-red-400"
                            : "border-gray-300 focus:ring-[#9BC9FF]"
                            }`}
                    />
                )}
            />
            {error && <p className="mt-1 !text-xs !text-red-500">{error.message}</p>}
        </div>
    );
};

export default InputFieldComponent;