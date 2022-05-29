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
import { getMainMenu, getMenuBlogs, getTopPage } from 'lib/api'
import Footer from 'components/footer'
import TopPage from 'components/topPage'
import Head from 'next/head'


const BlogPage = ({ posts, previewMode, menuPosts, category, menu, mainImage, categoryName }) => {
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
        {/* <h1 className='text-center mx-auto mt-10 md:w-5/6 lg:w-5/6 xl:w-4/6 2xl:w-4/6 text-5xl'>Kategoria <b>{categoryName[0].attributes.name}</b></h1> */}
        <div className='flex center mx-auto mt-10 md:w-5/6 lg:w-5/6 xl:w-4/6 2xl:w-4/6'>
          <motion.div initial="initial" animate="animate" exit={{ opacity: 0 }} variants={stagger} className="mx-auto w-screen md:w-3/4 ">
            <PostLoop siteBlogs={posts} fadeIn={fadeIn} />
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
  const previewMode = context.preview == false || context.preview == null ? "live" : "preview"
  const category = context.params.categories
  const slug = category
  const SLUG_QUERY = gql`
  query getCategoryBySlug ($slug: String){
    categories(filters:{slug:{eq:$slug}}){
      data{
        attributes{
          name
          slug
        }
      }
    }
  }
    `
  const { data: categorySlug } = await apolloClient.query({
    query: SLUG_QUERY,
    variables: {
      slug
    },
    preview: context.preview,
  })

  const BLOG_QUERY = gql`
  query getPostByCategpry($category: String){
    blogs(filters: {category:{slug:{containsi:$category}}}){
     data{
          attributes{
            tags
            instagramUrl
            facebookUrl
            tiktokUrl
            pinterestUrl
            title
            subtitle
            description
            published
            slug
            image{
              data{
                attributes{
                  url
                }
              }
            }
            author{
              data{
                attributes{
                  name
                  photo{
                    data{
                      attributes{
                        url
                      }
                    }
                  }
                }
              }
            }
            content
            category{
              data{
                attributes{
                  slug
                  name
                }
              }
            }
          }
        }
      }
  }
    `
  const { data: blogData } = await apolloClient.query({
    query: BLOG_QUERY,
    variables: {
      category,
      previewMode

    },
    preview: context.preview,
  })
  const categoryName = categorySlug.categories.data.length > 0 ? categorySlug.categories.data : null
  return {
    props: {
      posts: blogData.blogs.data,
      previewMode: previewMode,
      menuPosts: menuPosts,
      category: category,
      categoryName: categoryName,
      menu: menu,
      mainImage: mainImage
    },
  }

}
export async function getStaticPaths() {
  // Blogs Data
  // GQL queries
  const BLOGS_SLUGS_QUERY = gql`
  query getSlugCategory{
    categories{
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
  blogSlugsData.categories.data.map((categories) => (
    blogsParams.push({ params: { categories: categories.attributes.slug } }))
  )

  return {
    paths: blogsParams,
    fallback: false
  };
}


