import RelatedDiploma from "@/app/components/relatedDiploma/RelatedDiploma";
import React from "react";

export default function Page({ params }: any) {
  return <RelatedDiploma slug={params.slug} />;
}




