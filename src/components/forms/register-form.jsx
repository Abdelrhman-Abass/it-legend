"use client";
import React, { useState } from "react";
import { useFormik } from "formik";
import { registerSchema } from "../../utils/validation-schema";
import ErrorMsg from "./error-msg";
import { Link } from "@/navigation";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useTranslations } from "next-intl";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import { useDispatch, useSelector } from "react-redux";
import { signupUser } from "@/store/features/auth-slice";

const RegisterForm = () => {
  const t = useTranslations("auth");
  const router = useRouter();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);
  
  const [showPass, setShowPass] = useState(false);
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
      const userData = {
        ...values,
        countrycode: dialCode,
      };
      delete userData.terms;

      try {
        console.log(userData)
        // const resultAction = await dispatch(signupUser(userData)).unwrap();
        // if (resultAction) {
        //   toast.success(t("registerSuccess"));
        //   router.push("/");
        // } else {
        //   toast.error(resultAction.payload || t("registerError"));
        // }
      } catch (err) {
        toast.error(t("registerError"));
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
            autoComplete="current-password"
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
            {t("agree")} <Link href="/auth" style={{color:"red"}}>{t("terms")}</Link>
          </label>
        </div>
      </div>
      {touched.terms && errors.terms && <ErrorMsg error={t(errors.terms)} />}
      {error && <ErrorMsg error={t(error)} />}
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
