import { GET_INDIVISUAL_INDEX, INDICES_SLUG_LIST, META_DATA_INDIVIDUAL_INDICES } from "@/Apis/EndPoints";
import IndivisualIndexName from "@/Pages/IndivisualIndexName/IndivisualIndexName";
import { postMethodApi } from "@/Utils/Methods";
import React from "react";

export default function page() {
  return (
    <>
      <IndivisualIndexName />
    </>
  );
}

// export async function generateStaticParams({ params }) {
//   const data3 = await fetch(INDICES_SLUG_LIST);
//   const data4 = await data3.json();
//   return data4;
// }

export async function generateMetadata({ params }) {
  const data = await fetch(`${META_DATA_INDIVIDUAL_INDICES}${params?.indxx[0]}`);
  const data1 = await data.json();
 
  return {
    title: `${data1?.meta_title}`,
    description: `${data1?.meta_description}`,
    keywords: `${data1?.meta_keywords}`,
  };
}