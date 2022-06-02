import Navbar from 'components/navbar'
import Blog from 'components/blog'
import { SearchIcon } from '@heroicons/react/solid'
import urlBuilder from 'lib/imageUrl'
import Link from 'next/link'
import React, { useState } from 'react'
import { motion, animate } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Image from 'next/image'
import Menu from 'components/menu'
import RightMenu from 'components/rightMenu'
import PostLoop from 'components/postsLoop'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUtensils, faMugHot } from "@fortawesome/free-solid-svg-icons";
import gql from "graphql-tag";
import apolloClient from 'lib/apolloClient';
import { getDataForBlogPage, getMainMenu, getMenuBlogs, getRecentBlogsDataForBlogPage, getTopPage } from 'lib/api'
import Footer from 'components/footer'
import TopPage from 'components/topPage'
import Head from 'next/head'


const BlogPage = ({ post, previewMode, menuPosts, menu, mainImage,recentBlogsData }) => {
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
        <meta name="description" content="Add a shopping cart to your site in minutes. Works with any site builder, CMS, and framework. 20 000+ merchants trust our e-commerce solution for their website. Join them!"/>
        <meta property="og:title" content="Add a Shopping Cart to Any Website in Minutes - Snipcart"/>
        <meta property="og:description" content="Add a shopping cart to your site in minutes. Works with any site builder, CMS, and framework. 20 000+ merchants trust our e-commerce solution for their website. Join them!"/>
        <meta property="og:url" content="https://ohjakslodko.pl/"/>
        <meta property="og:type" content="website"/>
      </Head>
      <Navbar />

      <div className="relative  pt-16 pb-20 px-4 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8 flex  flex-col">
        <TopPage menu={menu} mainImage={mainImage} />
        <div className='flex center mx-auto mt-10 sd:w-4/6 md:w-5/6 lg:w-5/6 xl:w-4/6 2xl:w-4/6'>
          <motion.div initial="initial" animate="animate" exit={{ opacity: 0 }} variants={stagger} className="mx-auto w-screen md:w-3/4 ">
            <Blog post={post} recentBlogsData={recentBlogsData} />
          </motion.div>

          <RightMenu menuBlogs={menuPosts} />
        </div>
      </div>
      <Footer />
      <script src="https://unpkg.com/flowbite@1.4.5/dist/flowbite.js"></script>
    </>
  )
}
export default BlogPage;

export const getStaticProps = async (context) => {
  const topPageData = await getTopPage()
  const menu = topPageData.get('menu')
  const mainImage = topPageData.get('mainImage')
  const menuBlogsData = topPageData.get('menuBlogsData')
  const menuPosts = menuBlogsData.data.length > 0 ? menuBlogsData.data : null
  // Blogs Data
  // GQL queries
  const previewMode = context.preview == false || context.preview == null ? "live" : "preview"
  const slug = context.params.slug
  const blogData = await getDataForBlogPage(slug,previewMode,context)
  const category = blogData.blogs.data[0].attributes.category.data.attributes.name
  const recentBlogsData = await getRecentBlogsDataForBlogPage(slug,previewMode,context,category)
  return {
    props: {
      post: blogData.blogs.data[0].attributes,
      previewMode: previewMode,
      menuPosts: menuPosts,
      menu: menu,
      mainImage: mainImage,
      recentBlogsData: recentBlogsData,
     


    }, revalidate: 10, // In seconds
  }

}
export async function getStaticPaths() {
  // Blogs Data
  // GQL queries
  const BLOGS_SLUGS_QUERY = gql`
    query getSlug{
      blogs{
        data{
          attributes{
            slug
          }
        }
      }
    }
    `
  const { data: blogSlugsData } = await apolloClient.query({
    query: BLOGS_SLUGS_QUERY
  })
  let blogsParams = []
  blogSlugsData.blogs.data.map((data) => (blogsParams.push({ params: { slug: data.attributes.slug } })))


  return {
    paths: blogsParams,
    fallback: false
  };
}


