import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper";
import Thumbnail from 'components/Thumbnail/thumb-nail'
import { useRouter } from 'next/dist/client/router'

export const MobileGallery = ({product}) => {
    const nextTwo = [product[0].node.originalSrc];
    const router = useRouter()
    const listItems = []
    nextTwo.map((item, i) => {
        listItems.push(
            <SwiperSlide className='swiperProduct' key={`slide-${i}`}>
               <Thumbnail size='full' productPage={true} thumbnail={item} primaryImage={item} className='px-4'/>
            </SwiperSlide>
        )
    })


    return (
        <div >
            <Swiper pagination={true} modules={[Pagination]} id='mobileswiper' className="mySwiper">
            <div className='back-button absolute top-[1rem] left-[1.3rem] z-50' onClick={() => router.back()}>
                                Back
                            </div>
                    {listItems}
            </Swiper>
        </div>
    )
}