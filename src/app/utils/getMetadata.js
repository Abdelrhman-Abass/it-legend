import { getServerRequest } from "./generalServerRequest";

export default async function getMetadata(route, pageRoute, locale = "en", customPageIcon) {
    const placeholderData = {
        title: "It Legend",
        description: "Welcome to It Legend - Your ultimate source for tech solutions and services.",
        icons: {
            icon: customPageIcon,
        },
        openGraph: {
            title: "It Legend",
            description: "Explore It Legend - Discover insights, tech solutions, and innovation.",
            images: [customPageIcon],
        },
        alternates: {
            canonical: `${locale}/${pageRoute}`,
        },
    };
    try {
        const data = await getServerRequest(route);

        return data?.data
            ? {
                  title: `${locale === "en" ? data.data.data.siteNameEn : data.data.data.siteNameAr}`,
                  description: data.data.data.metaDescription || "Discover the world of It Legend with tech solutions tailored for you.",
                  icons: {
                      icon: customPageIcon,
                  },
                  openGraph: {
                      title: `${locale === "en" ? data.data.data.siteNameEn : data.data.data.siteNameAr}`,
                      description: data.data.data.metaDescription || "Explore It Legend - Discover insights, tech solutions, and innovation.",
                      images: customPageIcon,
                  },
                  alternates: {
                      canonical: pageRoute || `${process.env.NEXT_PUBLIC_BASE_URL_DEC}/${locale}/${pageRoute}`,
                  },
                  keywords: data.data.data.metaTags || ["technology", "solutions", "It Legend"],
              }
            : placeholderData;
    } catch (error) {
        return placeholderData;
    }
}
