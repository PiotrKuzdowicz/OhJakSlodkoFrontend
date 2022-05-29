import Navbar from 'components/navbar'
import Footer from 'components/footer'
import React, { useState } from 'react'
import { getMainBlogs, getTopPage } from 'lib/api';
import { motion, animate } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Menu from 'components/menu'
import RightMenu from 'components/rightMenu'
import PostLoop from 'components/postsLoop'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMugHot } from "@fortawesome/free-solid-svg-icons";
import TopPage from 'components/topPage';
import Head from 'next/head';
export default function Home({ mainImage, menuPosts, menu }) {


  const [ref, inView] = useInView({
    threshold: 0
  });
  const stagger = {
    animate: {
      transition: {
        staggerChildren: 0.6,
      },
    },
  };
  const fadeIn = {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
      transition: {
        duration: 1,
      },
    },
  };
  return (
    <>
      <Head>
        <script src="https://unpkg.com/@themesberg/flowbite@latest/dist/flowbite.bundle.js"></script>
        <script src="../../node_modules/flowbite/src/flowbite.js"></script>
        <link rel="stylesheet" href="https://unpkg.com/flowbite@1.4.5/dist/flowbite.min.css" />
        <title>Oh jak słodko</title>
      </Head>
      <Navbar />
      <div className="relative  pt-16 pb-20 px-4 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8 flex  flex-col">
        <TopPage menu={menu} />
        <div className='flex space-between container center mx-auto px-5 mt-10 md:w-5/6 lg:w-5/6 xl:w-4/6 2xl:w-4/6'>
          <motion.div initial="initial" animate="animate" exit={{ opacity: 0 }} variants={stagger} className="mt-12 gird gap-5 mx-auto w-screen md:w-3/4 grow">
            <h1>O mnie</h1>
          </motion.div>

          <RightMenu menuBlogs={menuPosts} />
        </div>
      </div>
      <Footer />
    </>
  )
}
export const getStaticProps = async () => {
  const topPageData = await getTopPage()
  const menu = topPageData.get('menu')
  const mainImage = topPageData.get('mainImage')
  const menuBlogsData = topPageData.get('menuBlogsData')
  const menuPosts = menuBlogsData.data.length > 0 ? menuBlogsData.data : null
  return {
    props: {
      mainImage,
      menuPosts,
      menu,
      revalidate: 1


    }
  }

}
