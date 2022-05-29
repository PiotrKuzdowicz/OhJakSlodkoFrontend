import Navbar from 'components/navbar'
import Footer from 'components/footer'
import React, { useState, useEffect } from 'react'
import { getMainBlogs, getTopPage } from 'lib/api';
import { motion, animate } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Menu from 'components/menu'
import RightMenu from 'components/rightMenu'
import PostLoop from 'components/postsLoop'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMugHot } from "@fortawesome/free-solid-svg-icons";
import TopPage from 'components/topPage';
import Head from 'next/head'
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import Router, { withRouter } from 'next/router'

const Home = (props) => {
  const [isLoading, setLoading] = useState(false); //State for the loading indicator
  const startLoading = () => setLoading(true);
  const stopLoading = () => setLoading(false);
  console.log(props.pagepage);
  /*
    Posts fetching happens after page navigation, 
    so we need to switch Loading state on Router events.
  */
  useEffect(() => { //After the component is mounted set router event handlers
    Router.events.on('routeChangeStart', startLoading);
    Router.events.on('routeChangeComplete', stopLoading);

    return () => {
      Router.events.off('routeChangeStart', startLoading);
      Router.events.off('routeChangeComplete', stopLoading);
    }
  }, [])
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
  const pagginationHandler = (page) => {
    const currentPath = props.router.pathname;
    const currentQuery = props.router.query;
    currentQuery.page = page.selected + 1;

    props.router.push({
      pathname: currentPath,
      query: currentQuery,
    });

  };
  let content = null;
  if (isLoading)
    content = <div>Loading...</div>;
  else {
    
    content = <PostLoop siteBlogs={props.posts} fadeIn={fadeIn} />
    
  }
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
        <TopPage menu={props.menu} />
        <div className='flex space-between container center mx-auto px-5 mt-10 md:w-5/6 lg:w-5/6 xl:w-4/6 2xl:w-4/6'>
          <motion.div initial="initial" animate="animate" exit={{ opacity: 0 }} variants={stagger} className="mt-12 gird gap-5 mx-auto w-screen md:w-3/4 grow">
            {content}
            <ReactPaginate
              previousLabel={'<'}
              nextLabel={'>'}
              breakLabel={'...'}
              breakClassName={'break-me'}
              activeClassName={'active font-bold'}
              containerClassName={'pagination'}
              subContainerClassName={'pages pagination'}
              pageClassName={'p-3 border-solid border-2 border-grey-600 bg-gray-200 rounded-bt-lg text-lg hover:bg-gray-300'}
              previousClassName={'p-3 border-solid border-2 border-grey-600 bg-gray-200 rounded-l-lg text-lg hover:bg-gray-300'}
              nextClassName={'p-3 border-solid border-2 border-grey-600 bg-gray-200 rounded-r-lg text-lg hover:bg-gray-300'}
              initialPage={props.currentPage - 1}
              pageCount={props.pageCount}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={pagginationHandler}
              className="pagination flex flex-row mt-5"
            />
          </motion.div>

          <RightMenu menuBlogs={props.menuPosts} />
        </div>
      </div>
      <Footer />
    </>
  )
}

// Home.getInitialProps = async ({ query }) => {
//   const topPageData = await getTopPage()
//   const menu = topPageData.get('menu')
//   const mainImage = topPageData.get('mainImage')
//   const menuBlogsData = topPageData.get('menuBlogsData')
//   const page = query.page || 1;
//   const blogsData = await getMainBlogs(page)
//   const posts = blogsData.data.length > 0 ? blogsData.data : null
//   const menuPosts = menuBlogsData.data.length > 0 ? menuBlogsData.data : null
//   return {
//     props: {
//       posts,
//       mainImage,
//       menuPosts,
//       menu,
//       revalidate: 1,
//       totalCount: blogsData.meta.pagination.pageCount,
//       pageCount: 2,
//       currentPage: blogsData.meta.pagination.page,
//       perPage: 2,

//     }
//   }
// }
export const getServerSideProps = async ({query}) => {
  const topPageData = await getTopPage()
  const menu = topPageData.get('menu')
  const mainImage = topPageData.get('mainImage')
  const menuBlogsData = topPageData.get('menuBlogsData')
  const page = parseInt(query.page) || 1;
  const pageSize = 5
  const blogsData = await getMainBlogs(page,pageSize)
  const posts = blogsData.data.length > 0 ? blogsData.data : null
  const menuPosts = menuBlogsData.data.length > 0 ? menuBlogsData.data : null

  return {
    props: {
      posts,
      mainImage,
      menuPosts,
      menu,
      totalCount: blogsData.meta.pagination.pageCount,
      pageCount: blogsData.meta.pagination.pageCount,
      currentPage: blogsData.meta.pagination.page,
      perPage: pageSize,
      pagepage: page

    }
  }

}

export default withRouter(Home);