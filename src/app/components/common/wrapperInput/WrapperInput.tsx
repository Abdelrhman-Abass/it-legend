import { IWrapperInput } from "@/app/types/Types";
import { ErrorMessage, Field, FieldProps } from "formik";
import React, { Fragment, useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

export default function WrapperInput({ name, label, subLabel, placeholder, isCheckBox, isDefault, type,isPassword }: IWrapperInput) {
    const [showPassword, setShowPassword] = useState(false);
    return (
        <Fragment>
            {isCheckBox && (
                <div className={`wrapper_input ${isCheckBox ? "checkbox" : ""}`}>
                    <Field name={name}>{({ field }: FieldProps) => <input type="checkbox" {...field} />}</Field>
                    <label htmlFor={name}>
                        {label} <span>{subLabel}</span>
                    </label>
                    <ErrorMessage name={name} component={"span"} className="error_message" />
                </div>
            )}
            {isDefault && (
                <div className="wrapper_input">
                    <label htmlFor={name}>{label}</label>
                    <Field name={name} placeholder={placeholder} type={ "text"} />
                    <ErrorMessage name={name} component={"span"} className="error_message" />
                </div>
            )}
            {isPassword && (
                <div className="wrapper_input">
                    <label htmlFor={name}>{label}</label>
                    <Field name={name} placeholder={placeholder} type={showPassword ? "text" : type} />
                    {isPassword && !showPassword ? <FaRegEye onClick={() => setShowPassword(true)}  className="show_password_icon"/> : <FaRegEyeSlash onClick={() => setShowPassword(false)} className="show_password_icon"/>}
                    <ErrorMessage name={name} component={"span"} className="error_message" />
                </div>
            )}
        </Fragment>
    );
}
