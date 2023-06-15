import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import "swiper/css/navigation";
import Link from 'next/link'
import SwiperCore, { Navigation } from "swiper";
SwiperCore.use([Navigation]);

const endpoints = [
    // Your endpoints
]

const Topbar = ({ isHome, isScrolled }) => {

    const router = useRouter()
    const [currentCategory, setCurrentCategory] = React.useState(router.query.id)

    const onCategoryClick = e => {
        setCurrentCategory(e.target.id)
        {
            e.target.id === 'All' ? router.push(`/men`, undefined, { shallow: true }) : router.push(`/men/${e.target.id}`, undefined, { shallow: true })

        }
    }
    const listItems = []

    const activeClass = 'border border-black'
    //memoized mapping for categories
    const categoryButtons = React.useMemo(
        () =>
            endpoints ? endpoints.map(({ name, slug, i }) => (

                <div
                    id={slug}
                    key={name}
                    onClick={onCategoryClick}

                    className={`bebas !font-[400] hover:border w-auto md:w-[35%] my-[0.1rem] overflow-hidden text-clip whitespace-nowrap hover:border-black flex justify-center text-gray-700 ${slug === currentCategory ? activeClass : ''}`}
                >
                    {name}
                </div>

            )) : null

            [currentCategory, listItems, endpoints]
    )

    categoryButtons.map((item, i) => {
        listItems.push(
            <SwiperSlide className={`max-w-[24%] mx-[0.5rem]`} key={`slide-${i}`}>
                {item}
            </SwiperSlide>
        )
    })

    const isVisible = isHome && !isScrolled;

    return (
        <>
            <div className={`transition-opacity duration-300 ${isVisible ? 'opacity-0 invisible' : 'opacity-100 visible'} pl-[1.1rem]   md:pl-[8rem] text-base z-[50] bg-white  !h-[3rem] w-full py-[0.7rem] items-center border-b border-gray-300`}>
                <Swiper
                    slidesPerView={'auto'}
                    grabCursor={true}
                >
                    {listItems}
                </Swiper>
            </div>
        </>
    )
}

export default Topbar