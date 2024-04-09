import { GET_NEWS_AND_RESEARCH_INSIDER, INSIGHTS_SLUG_LIST } from '@/Apis/EndPoints';
import NewsAndResearchInsider from '@/Pages/NewsAndResearchIndsider/NewsAndResearchIndsider'
import React from 'react'

export default function page() {
  return (
    <><NewsAndResearchInsider/></>
  )
}


// export async function generateStaticParams({ params }) {
//   const data3 = await fetch(INSIGHTS_SLUG_LIST);
//   const data4 = await data3.json();
//   return data4;
// }

export async function generateMetadata({ params }) {
  const data = await fetch(`${GET_NEWS_AND_RESEARCH_INSIDER}${params?.slug}`);
  const data1 = await data.json();
 
  return {
    title: `${data1?.meta_title}`,
    description: `${data1?.meta_description}`,
    keywords: `${data1?.meta_keywords}`,
  };
}