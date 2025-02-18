import RelatedDiploma from "@/app/components/relatedDiploma/RelatedDiploma";
import React from "react";

export default function Page({ params }: { params: { slug: string } }) {
  return <RelatedDiploma slug={params.slug} />;
}




