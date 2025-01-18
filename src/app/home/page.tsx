import FeaturedProductComponent from '@/src/components/FeaturedProductComponent'
import ChairGallery from '@/src/components/GalleryComponent'
import LastHome from '@/src/components/LastHomeComponent'
import Logos from '@/src/components/logos'
import FurnitureCollection from '@/src/components/section1'
import TopCategories from '@/src/components/TopCategoryComponent'
import React from 'react'

export default function Home() {
  return (
    <div className='px-4 md:pl-56 md:pr-36 flex-col flex  overflow-x-hidden'>
      <FurnitureCollection />
      <Logos/>
      <div>
        <h1 className='text-4xl font-semibold'>Featured Products</h1>
      </div>
      <FeaturedProductComponent/>
      <TopCategories/>
    < ChairGallery/>
      <div className='mt-12'>
        <h1 className='text-4xl w-full text-center font-semibold'>Our  Products</h1>
      </div>
    
    <LastHome/>
    </div>
  )
}
