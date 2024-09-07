"use client";

import ImageCarousel from "@/components/imageCarousel";

export default function TestPage() {
  return (
    <div className="flex justify-center items-center h-screen">
      <ImageCarousel images={[
        "https://www.wowlavie.com/files/article/a2/22144/atl_m_220022144_377.jpg",
        "https://cdn.unwire.hk/wp-content/uploads/2013/11/unwire0012.jpg",
        "https://i.imgur.com/juClUSL.jpg",
      ]}/>
    </div>
  )
}
