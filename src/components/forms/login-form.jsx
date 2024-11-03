"use client";
import React from "react";
import { useFormik } from "formik";
import { loginSchema } from "../../utils/validation-schema";
import ErrorMsg from "./error-msg";
import { useState } from "react";
import { authHandler } from "@/app/[local]/auth/authHandler";
import { useTranslations } from "next-intl";
import { useRouter } from "@/navigation";

const LoginForm = ({ setAuthError }) => {
  const t = useTranslations("auth");
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const { handleChange, handleSubmit, handleBlur, errors, values, touched } =
    useFormik({
      initialValues: { email: "", password: "" },
      validationSchema: loginSchema,
      onSubmit: async (values) => {
        setLoading(true);
        setAuthError(null);
        try {
          const res = await authHandler("/api/account/login", values);
          if (res.data.data.id) {
            router.push("/learning-path");
          } else {
            setAuthError(res.data.message.title);
          }
        } catch (err) {
          setAuthError("من فضلك تأكد من ادخال اسم مستخدم وكلمة مرور صحيحين");
          console.log("err", err);
        } finally {
          setLoading(false);
        }
      },
    });

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
          className="password-reset"
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
          )}{" "}
          <span> {t("signIn")}</span>
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
