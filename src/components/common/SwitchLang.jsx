"use clint";
import { useLocale } from "next-intl";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import React, { useTransition } from "react";

const SwitchLang = ({theme}) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const local = useLocale();
  const pathname = usePathname();

  const onChangeLang = () => {
    startTransition(() => {
      const localtion = pathname.slice(3);
      const changed = local == "ar" ? "en" : "ar";
      router.replace(`/${changed}/${localtion}`);
    });
  };



  return (
    <div className="col-auto">
      <button
        onClick={onChangeLang}
        className="d-flex align-items-center gap-2 lang-btn"
      >
        {/* <div className="lang-global text-black">
          <Image src="/lang.png" width={20} height={20} alt="lang" />
        </div> */}
        <span className={`text-uppercase ${theme ==="light" ? "text-black" : "text-white"}`}>{local == "ar" ? "ENGLISH" : "العربية"}</span>
      </button>
    </div>
  );
};

export default SwitchLang;
