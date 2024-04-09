import { GET_INDICES, GET_TABS } from "@/Apis/EndPoints";
import TypesOfIndices from "@/Pages/TypesOfIndices/TypesOfIndices";
import React from "react";

export default async function page() {
  return <TypesOfIndices />;
}

// export async function generateStaticParams() {
//   const data = await fetch(GET_TABS);
//   const data1 = await data.json();
//   const data2 = data1.H.filter((item) => item.Name === "Indices");
//   const retunedValue = data2[0].sub_tabs;

//   const routes = retunedValue.filter((item) => item.Name !== "Overview");
//   const permittedValues = routes.map(function (value) {
//     return { slug: value?.slug };
//   });

//   return permittedValues;
// }

export async function generateMetadata({ params }) {
  const data = await fetch(`${GET_INDICES}${params?.slug}`);
  const data1 = await data.json();
 
  return {
    title: `${data1?.meta_title}`,
    description: `${data1?.meta_description}`,
    keywords: `${data1?.meta_keywords}`,
  };
}