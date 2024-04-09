import { GET_PRESS_RELEASE, PRESS_RELEASE_SLUG_LIST } from '@/Apis/EndPoints';
import PressRelease from '@/Pages/PressRelease/PressRelease';
import React from 'react'

export default function page() {
  return (
    <><PressRelease/></>
  )
}


// export async function generateStaticParams({ params }) {
//     const data3 = await fetch(PRESS_RELEASE_SLUG_LIST);
//     const data4 = await data3.json();
//     return data4;
//   }

export async function generateMetadata({ params }) {
  const data = await fetch(`${GET_PRESS_RELEASE}${params?.slug}`);
  const data1 = await data.json();
 
  return {
    title: `${data1?.meta_title}`,
    description: `${data1?.meta_description}`,
    keywords: `${data1?.meta_keywords}`,
  };
}