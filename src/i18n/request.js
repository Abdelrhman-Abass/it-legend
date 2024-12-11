// import { getRequestConfig } from "next-intl/server";
// import { notFound } from "next/navigation";

// // Can be imported from a shared config
// const locales = ["en","ar"];

// // export default getRequestConfig(async ({ locale }) => {
// //   // Validate that the incoming `locale` parameter is valid
// //   if (!locales.includes(locale)) notFound();

// //   return {
// //     messages: (await import(`../../messages/${locale}.json`)).default,
// //   };
// // });
// export default getRequestConfig(async ({ locale }) => {
//   // Validate that the incoming `locale` parameter is valid
//   if (!locales.includes(locale)) notFound();

//   return {
//     messages: (await import(`../../messages/${locale}.json`)).default,
//   };
// });




import {getRequestConfig} from 'next-intl/server';
import {routing} from './routing';

export default getRequestConfig(async ({requestLocale}) => {
  // This typically corresponds to the `[locale]` segment
  let locale = await requestLocale;

  // Ensure that the incoming locale is valid
  if (!locale || !routing.locales.includes(locale )) {
    locale = routing.defaultLocale;
  }

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default
  };
});