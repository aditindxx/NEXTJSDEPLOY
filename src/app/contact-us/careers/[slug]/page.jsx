import { CAREER_OPENINGS_SLUG_LIST, GET_CAREER_JOB_DESCRIPTION } from "@/Apis/EndPoints";
import CareerJobDescription from "@/Pages/CareerJobDescription/CareerJobDescription";
import React from "react";

export default function page() {
  return (
    <>
      <CareerJobDescription />
    </>
  );
}

// export async function generateStaticParams({ params }) {
//   const data3 = await fetch(CAREER_OPENINGS_SLUG_LIST);
//   const data4 = await data3.json();
//   return data4;
// }


export async function generateMetadata({ params }) {
  const data = await fetch(`${GET_CAREER_JOB_DESCRIPTION}${params?.slug}`);
  const data1 = await data.json();
 
  return {
    title: `${data1?.meta_title}`,
    description: `${data1?.meta_description}`,
    keywords: `${data1?.meta_keywords}`,
  };
}