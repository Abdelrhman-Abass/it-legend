"use client";
import LoginForm from "@/components/forms/login-form";
import RegisterForm from "@/components/forms/register-form";
import { Link } from "@/navigation";
import { useTranslations } from "next-intl";
import React, { useState } from "react";
import ReactCardFlip from "react-card-flip";

const SignInCard = ({ setIsFlip }) => {
  const t = useTranslations("auth");
  const [authError, setAuthError] = useState(null);
  return (
    <div className="login-form-box">
      {authError && (
        <div className="alert alert-danger" role="alert">
          {authError}
        </div>
      )}
      <h3 className="title">{t("signIn")}</h3>
      <p>
        {t("dont")}{" "}
        <Link href="#" style={{color:"red"}}  onClick={() => setIsFlip((prev) => !prev)}>
          {t("signUp")}
        </Link>
      </p>
      <LoginForm setAuthError={setAuthError} />
    </div>
  );
};

const SignUpCard = ({ setIsFlip }) => {
  const t = useTranslations("auth");
  const [authError, setAuthError] = useState(null);

  return (
    <div className="login-form-box registration-form">
      {authError && (
        <div className="alert alert-danger" role="alert">
          {authError}
        </div>
      )}
      <h3 className="title">{t("signUp")}</h3>
      <p>
        {t("haveAccount")}{" "}
        <Link href="#" style={{color:"red"}} onClick={() => setIsFlip((prev) => !prev)}>
          {t("signIn")}
        </Link>
      </p>
      <RegisterForm setAuthError={setAuthError} />
    </div>
  );
};

const page = () => {
  const [isFlip, setIsFlip] = useState(false);
  return (
    <ReactCardFlip isFlipped={isFlip} flipDirection="vertical">
      <SignInCard setIsFlip={setIsFlip} />
      <SignUpCard setIsFlip={setIsFlip} />
    </ReactCardFlip>
  );
};

export default page;
