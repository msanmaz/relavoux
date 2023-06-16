import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import "swiper/css/navigation";
import Link from 'next/link'
import SwiperCore, { Navigation } from "swiper";
SwiperCore.use([Navigation]);

const endpoints = [
    {
        name: 'Hoodies',
        slug: 'Hoodies',
    },
    {
        name: 'Sweatshirt',
        slug: 'Sweatshirt',

    },
    {
        name: 'Zippers',
        slug: 'Zippers',
    },
    {
        name: 'All',
        slug: 'All',
    },
]


const endpointsMen = [
    {
        name: '2023',
        slug: 'Hoodies',
    },
    {
        name: '20226',
        slug: 'Sweatshirt',

    },
    {
        name: '2028',
        slug: 'Zippers',
    },
    {
        name: '9001',
        slug: 'All',
    },
    {
        name: '2030',
        slug: 'All',
    },
    {
        name: '9002',
        slug: 'All',
    },
]


const Topbar = ({ isHome, isScrolled, isEndpointMen = false }) => {

    const router = useRouter()
    const [currentCategory, setCurrentCategory] = React.useState(router.query.id)

    const onCategoryClick = e => {
        setCurrentCategory(e.target.id)
        {
            e.target.id === 'All' ? router.push(`/men`, undefined, { shallow: false }) : router.push(`/men/${e.target.id}`, undefined, { shallow: false })

        }
    }
    const listItems = []
    const listItems2 = []

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

    const categoryButtons2 = React.useMemo(
        () =>
            endpoints ? endpointsMen.map(({ name, slug, i }) => (

                <div
                    id={slug}
                    key={name}
                    onClick={onCategoryClick}

                    className={`bebas !font-[400] hover:border w-auto md:w-[35%] my-[0.1rem] overflow-hidden text-clip whitespace-nowrap hover:border-black flex justify-center text-gray-700 ${slug === currentCategory ? activeClass : ''}`}
                >
                    {name}
                </div>

            )) : null
            [currentCategory, listItems2]
    )

    categoryButtons.map((item, i) => {
        listItems.push(
            <SwiperSlide className={`max-w-[24%] mx-[0.5rem]`} key={`slide-${i}`}>
                {item}
            </SwiperSlide>
        )
    })

    categoryButtons2.map((item, i) => {
        listItems2.push(
            <SwiperSlide className={`max-w-[24%] mx-[0.5rem]`} key={`slide-${i}`}>
                {item}
            </SwiperSlide>
        )
    })

    const isVisible = isHome && !isScrolled;

    return (
        <>
            <div className={`transition-all duration-300 ${isVisible ? 'opacity-0 invisible h-0 !pt-0' : 'opacity-100 visible !h-[3rem]'} pl-[1.1rem]   md:pl-[8rem] text-base z-[50] bg-white w-full pt-[0.7rem] items-center border-gray-300`}>
                <Swiper
                    slidesPerView={'auto'}
                    grabCursor={true}
                >
                    {isEndpointMen ? listItems2 : listItems}
                </Swiper>
            </div>
        </>
    )
}

export default Topbar