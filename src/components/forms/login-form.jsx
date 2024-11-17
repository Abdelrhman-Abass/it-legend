"use client";
import React, { useState } from "react";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { loginSchema } from "../../utils/validation-schema";
import ErrorMsg from "./error-msg";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { loginUser } from "@/store/features/auth-slice";

const LoginForm = ({ setAuthError }) => {
  const t = useTranslations("auth");
  const router = useRouter();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const { handleChange, handleSubmit, handleBlur, errors, values, touched } =
    useFormik({
      initialValues: { email: "", password: "" },
      validationSchema: loginSchema,
      onSubmit: async (values) => {
        setLoading(true);
        setAuthError(null);
        console.log("values", values);
        try {
          const resultAction = await dispatch(loginUser(values)).unwrap();
          if (resultAction) {
            // Navigate to the desired page after successful login
            router.push("/learning-path");
          }
        } catch (err) {
          setAuthError("من فضلك تأكد من ادخال اسم مستخدم وكلمة مرور صحيحين");
          console.log("err", err);
        } finally {
          setLoading(false);
        }
      },
    });

  const handleResetPass = (email) => {
    // Implement password reset logic
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="current-log-email">{t("email")}</label>
        <input
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          type="email"
          name="email"
          placeholder={t("email")}
          style={{ borderColor: touched.email && errors.email && "red" }}
        />
        {touched.email && errors.email && <ErrorMsg error={t(errors.email)} />}
      </div>
      <div className="form-group">
        <div style={{ position: "relative" }}>
          <label htmlFor="current-log-password">{t("password")}</label>
          <input
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            type={showPass ? "text" : "password"}
            name="password"
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
      <div className="form-group chekbox-area">
        <a
          href="#"
          onClick={() => handleResetPass(values.email)}
          className="password-reset" style={{color:"red"}}
        >
          {t("lost")}
        </a>
      </div>
      <div className="form-group">
        <button type="submit" className="edu-btn btn-medium">
          {loading ? (
            <div className="spinner-border text-light" role="status"></div>
          ) : (
            <i className="icon-4"></i>
          )}
          <span> {t("signIn")}</span>
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
