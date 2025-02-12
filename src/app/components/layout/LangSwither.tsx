import UseToggleMenu from "@/app/store/ToggleMenu";
import { createSharedPathnamesNavigation } from "next-intl/navigation";
import { useParams } from "next/navigation";
import React, { useTransition } from "react";
type Locales = "ar" | "en";

export default function LangSwither({ custom_class, arText, enText }: { custom_class?: string;  arText?: any; enText?: any }) {
    const {usePathname, useRouter } = createSharedPathnamesNavigation({
        locales: ["en", "ar"],
        localePrefix: "as-needed",
    });
    const router = useRouter();
    const pathname = usePathname();
    const params = useParams();
    const [isPending, startTransition] = useTransition();
    const { closeMenu} =UseToggleMenu();
    const handleSwitchLang = (locale: Locales) => {
        startTransition(() => {
            router.push(`${pathname}`, { locale });
        });
    };
    return (
        <div
            className={`lang_swither ${custom_class}`}
            onClick={() => {
                closeMenu();
                setTimeout(() => {
                    handleSwitchLang(params.locale === "ar" ? "en" : "ar");
                }, 600);
            }}>
             {params.locale === "en" ? arText : enText}
        </div>
    );
}
