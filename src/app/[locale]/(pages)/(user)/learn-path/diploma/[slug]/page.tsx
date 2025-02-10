import RelatedDiploma from "@/app/components/relatedDiploma/RelatedDiploma";
import React from "react";

export default async function page({ params }: any) {
    return <RelatedDiploma slug={params.slug} />;
}
