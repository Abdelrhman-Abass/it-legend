"use client";
import React, { useEffect } from "react";
import GeneralForm from "../common/generalForm/GeneralForm";
import WrapperInput from "../common/wrapperInput/WrapperInput";
import AuthFormFlip from "@/app/store/AuthFormFlip";
import Button from "../common/button/Button";
import Link from "next/link";
import { useTranslations } from "next-intl";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { postServerRequest } from "@/app/utils/generalServerRequest";
import GeneralToaster from "../common/generalToaster/GeneralToaster";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { setCookie } from "cookies-next";
export default function AuthSection() {
    const router = useRouter();
    const { locale } = useParams();
    const t = useTranslations();
    const { isLoginActive, toggleFlip } = AuthFormFlip();
    const loginMutaion = useMutation({
        mutationFn: (value) => postServerRequest("/Auth/email-login", value),
        onSuccess: (data) => {
            // console.log(data);

            const message = data?.data.success ? "Login Successfully" : "Email Or Password Incorrect";
            if (data?.data.success) {
                setCookie("userData", data?.data?.data.token, {
                    path: `/`,
                    maxAge: 1 * 60 * 60,
                    // httpOnly: true,
                });
                setCookie("userDataRefresh", data?.data?.data.refreshToken, {
                    path: `/`,
                    maxAge: 30 * 24 * 60 * 60,
                    // httpOnly: true,
                });
                setCookie("userDataEmail", data?.data?.data.email, {
                    path: `/`,
                    maxAge: 30 * 24 * 60 * 60,
                    // httpOnly: true,
                });
                router.push(`/${locale}/learn-path`);
            }
            return GeneralToaster(message, data?.data.success);
        },
    });
    const initialValues = {
        email: "",
        password: "",
    };
    const validationSchema = Yup.object().shape({
        email: Yup.string().email().required(),
        password: Yup.string().required(),
    });
    const onSubmit = (values: any) => {
        loginMutaion.mutate(values);
        // setCookie("userData", JSON.stringify("slakjslaks"), { path: "/", maxAge: 7 * 24 * 60 * 60 });
        // router.push(`/${locale}/learn-path`);
    };
    return (
        <section className="auth_section py p-lg f">
            <div className="auth_section_form_container">
                <div className={`auth_section_form_container_form ${isLoginActive ? "" : "register"}`}>
                    <div className="auth_section_form_container_form_header">
                        <h2>{t("auth.signIn")}</h2>
                        {/* <p className="p1">
                            {t("auth.account")} <span onClick={toggleFlip}>{t("auth.signUp")}</span>
                        </p> */}
                    </div>
                    <GeneralForm initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                        <WrapperInput name="email" label={t("auth.email")} placeholder={t("auth.email")} isDefault />
                        <WrapperInput name="password" label={t("auth.password")} type="password" placeholder={t("auth.password")} isPassword />
                        <Link href={"#"} className="forget">
                            {t("auth.forget")}
                        </Link>
                        <Button isLoading={loginMutaion.isPending} title={t("auth.signIn")} />
                    </GeneralForm>
                </div>
                {/* <div className={`auth_section_form_container_form ${isLoginActive ? "register" : ""}`}>
                    <div className="auth_section_form_container_form_header">
                        <h2>{t("auth.signUp")}</h2>
                        <p className="p1">
                            {t("auth.haveAccount")} <span onClick={toggleFlip}>{t("auth.signIn")}</span>
                        </p>
                    </div>
                    <GeneralForm initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                        <WrapperInput name="first_name" label={t("auth.first_name")} placeholder={t("auth.first_name")} isDefault />
                        <WrapperInput name="last_name" label={t("auth.last_name")} placeholder={t("auth.last_name")} isDefault />
                        <WrapperInput name="email" label={t("auth.email")} placeholder={t("auth.email")} isDefault />
                        <WrapperInput name="phone" label={t("auth.phone")} placeholder={t("auth.phone")} isDefault />
                        <WrapperInput name="password" label={t("auth.password")} placeholder={t("auth.password")} isDefault />
                        <WrapperInput name="accept_terms" label={t("auth.terms")} subLabel={t("auth.terms_conditions")} isCheckBox />
                        <Button title="Sign Up" />
                    </GeneralForm>
                </div> */}
            </div>
            <div className="auth_section_form_container_text">
                <h2>{t("auth.title")}</h2>
                <div className="auth_section_form_container_text_desc f f-column">
                    <div className="desc">
                        <h3>{t("auth.ready")}</h3>
                        <p className="p1">{t("auth.readyText")}</p>
                    </div>
                    <div className="desc">
                        <h3>{t("auth.time")}</h3>
                        <p className="p1">{t("auth.timeText")}</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
