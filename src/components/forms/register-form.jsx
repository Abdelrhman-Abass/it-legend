"use client";
import React from "react";
import { useFormik } from "formik";
import { registerSchema } from "../../utils/validation-schema";
import ErrorMsg from "./error-msg";
import { Link } from "@/navigation";
import { useState } from "react";
import { authHandler } from "@/app/[local]/auth/authHandler";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useTranslations } from "next-intl";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";

const RegisterForm = () => {
  const t = useTranslations("auth");
  const router = useRouter();
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [dialCode, setDialCode] = useState(20);
  const {
    handleChange,
    handleSubmit,
    handleBlur,
    errors,
    values,
    touched,
    setFieldValue,
  } = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      phonenumber: "",
      email: "",
      password: "",
      terms: false,
    },
    validationSchema: registerSchema,
    onSubmit: async (values) => {
      delete values.terms;
      setLoading(true);
      setError(null);
      try {
        const data = {}
        // const res = await authHandler("/api/account/register", {
        //   ...values,
        //   countrycode: dialCode,
        // });

        // if (res.data.data.id) {
        //   router.push("/");
        // } else {
        //   setError(res.data.message.title);
        //   toast.error(res.data.message.title);
        // }
      } catch (err) {
        setError("Register Error");
      } finally {
        setLoading(false);
      }
    },
  });
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="reg-firstname">{t("firstName")}</label>
        <input
          value={values.firstname}
          onChange={handleChange}
          onBlur={handleBlur}
          type="text"
          name="firstname"
          id="reg-firstname"
          placeholder={t("firstName")}
          style={{
            borderColor: touched.firstname && errors.firstname && "red",
          }}
        />
        {touched.firstname && errors.firstname && (
          <ErrorMsg error={t(errors.firstname)} />
        )}
      </div>
      <div className="form-group">
        <label htmlFor="reg-lastname">{t("lastName")}</label>
        <input
          value={values.lastname}
          onChange={handleChange}
          onBlur={handleBlur}
          type="text"
          name="lastname"
          id="reg-lastname"
          placeholder={t("lastName")}
          style={{ borderColor: touched.lastname && errors.lastname && "red" }}
        />
        {touched.lastname && errors.lastname && (
          <ErrorMsg error={t(errors.lastname)} />
        )}
      </div>
      <div className="form-group">
        <label htmlFor="log-email">{t("email")}</label>
        <input
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          type="email"
          name="email"
          id="log-email"
          placeholder={t("email")}
          style={{ borderColor: touched.email && errors.email && "red" }}
        />
        {touched.email && errors.email && <ErrorMsg error={t(errors.email)} />}
      </div>
      <div className="form-group">
        <label htmlFor="log-phonenumber">{t("phoneNumber")}</label>
        <PhoneInput
          name="phonenumber"
          defaultCountry="eg"
          value={values.phonenumber}
          onChange={(number, { country }) => {
            const dialCode = country.dialCode;
            const phoneNumber = number.replace("+", "");
            setFieldValue("phonenumber", phoneNumber);
            setDialCode(dialCode);
          }}
          onBlur={handleBlur}
          style={{ direction: "ltr" }}
          className={touched.phonenumber && errors.phonenumber && "error"}
        />
        {touched.phonenumber && errors.phonenumber && (
          <ErrorMsg error={t(errors.phonenumber)} />
        )}
      </div>
      <div className="form-group">
        <div style={{ position: "relative" }}>
          <label htmlFor="log-password">{t("password")}</label>
          <input
            autocomplete="current-password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            type={showPass ? "text" : "password"}
            name="password"
            id="log-password"
            placeholder={t("password")}
            style={{
              borderColor: touched.password && errors.password && "red",
            }}
          />
          <span
            onClick={() => setShowPass(!showPass)}
            className="password-show"
          >
            <i className="icon-76"></i>
          </span>
        </div>
        {touched.password && errors.password && (
          <ErrorMsg error={t(errors.password)} />
        )}
      </div>
      <div
        className="form-group chekbox-area"
        style={{ marginBottom: touched.terms && errors.terms && 1 }}
      >
        <div className="edu-form-check">
          <input
            value={values.terms}
            onChange={handleChange}
            onBlur={handleBlur}
            type="checkbox"
            name="terms"
            id="terms-condition"
          />
          <label htmlFor="terms-condition">
            {t("agree")} <Link href="/auth">{t("terms")}</Link>
          </label>
        </div>
      </div>
      {touched.terms && errors.terms && <ErrorMsg error={t(errors.terms)} />}
      <div className="form-group">
        <button
          type="submit"
          style={{ zIndex: 0 }}
          className="edu-btn btn-medium"
        >
          {loading ? (
            <div className="spinner-border text-light" role="status"></div>
          ) : (
            <i className="icon-4"></i>
          )}{" "}
          <span>{t("signUp")}</span>
        </button>
      </div>
    </form>
  );
};

export default RegisterForm;
