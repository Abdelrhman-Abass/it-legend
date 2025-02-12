"use client";

import { Link } from "@/i18n/routing";
import Image from "next/image";
import React from "react";

export default function AdsSection() {
    return (
        <section className="py pb_remover">
            <Link href={"#"} className="ads_section">
            <Image src={"https://img.freepik.com/free-photo/cheerful-mood-group-people-business-conference-modern-classroom-daytime_146671-16287.jpg?t=st=1738161125~exp=1738164725~hmac=1d7f764467b40bbf01dc608b366b28d5ba440ab2b971b090f788f288c522a798&w=996"} alt="ads" fill />
            </Link>
        </section>
    );
}
