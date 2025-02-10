import type { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const locales = ["en", "ar"];

    const routesStrings = ["", "courses"];
    const routes = locales.flatMap((locale) =>
        routesStrings.map((route) => ({
            url: `${process.env.NEXT_PUBLIC_BASE_URL}/${locale}${route ? `/${route}` : ""}`,
            lastModified: new Date().toISOString(),
        })),
    );

    return [...routes];
}
