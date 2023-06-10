import React from 'react'
import Layout from '../common/Layout/lay-out'
import Head from 'next/head'
import Hero2 from '../components/Hero/Hero2'
import SlideGallery from '../components/SlideGallery'
import { readCache } from 'lib/cache'
import Link from 'next/link'

export default function Home({ cache }) {

  return (
    <>
      <Head>        <title>RLVX | HOME</title>
      </Head>
      <Hero2 />
      <SlideGallery products={cache} />
      <div className='w-full flex justify-center align-center md:py-[3rem] py-[1rem]'>
        <div className='w-1/2'>
        <Link  href='/men'>
        <div className='text-white cursor-pointer bg-gray-900 border-gray-900 hover:bg-white hover:text-gray-900 disabled:hover:bg-gray-900 disabled:hover:text-white w-full uppercase flex items-center justify-center min-h-[50px] px-5 py-[10px] text-small-regular border transition-colors duration-200 disabled:opacity-50'>See All Products</div>

      </Link> 
        </div>

      </div>


    </>
  )
}

Home.getLayout = (page) => {
  return <Layout>{page}</Layout>
}



export async function getStaticProps() {
  const cache = await readCache()

  return {
    props: {
      cache,
    }
  }
}
