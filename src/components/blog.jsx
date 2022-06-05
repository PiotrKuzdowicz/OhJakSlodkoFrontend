import ImagePostCarousel from "./imagePostCarousel"
import React from 'react'
import { motion } from 'framer-motion'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faTiktok, faInstagram, faPinterestP } from "@fortawesome/free-brands-svg-icons";
import urlBuilder from "lib/imageUrl";
export default function Blog(props) {
  const { title, description, content, image, instagramUrl, facebookUrl, pinterestUrl, tiktokUrl, tags } = props.post
  const tagsMap = tags.split(' ')
  const recentBlogsData = props.recentBlogsData

  return (
    <motion.div className="flex flex-col overflow-hidden ">
      <ImagePostCarousel image={image} />
      <div className="relative px-4 sm:px-6 lg:px-8">
        <div className="text-lg max-w-prose mx-auto">
          <h1>
            <span className="mt-2 block text-5xl text-center leading-8 tracking-tight text-gray-900 sm:text-4xl">
              {title}
            </span>
          </h1>
        </div>
        <div className="mt-6 prose prose-indigo prose-lg text-gray-500 ">
          <p className="whitespace-pre-wrap">
            {content}
          </p>
        </div>
        <div className="mt-6 flex">
          {instagramUrl != null &&
            <a href={instagramUrl}><FontAwesomeIcon icon={faInstagram} className='text-3xl' color="#E1306C" /></a>
          }
          {facebookUrl != null &&
            <a href={facebookUrl}><FontAwesomeIcon icon={faFacebookF} className='text-3xl ml-5' color="#405DE6" /></a>
          }
          {pinterestUrl != null &&
            <a href={pinterestUrl}><FontAwesomeIcon icon={faPinterestP} className='text-3xl ml-5' color="#FD1D1D  " /></a>
          }
          {tiktokUrl != null &&
            <a href={tiktokUrl}><FontAwesomeIcon icon={faTiktok} className='text-3xl ml-5' color="#2c2c2c" /></a>
          }
        </div>
        <div className="mt-6 flex flex-wrap text-gray-500 w-full">
          {tagsMap.map((tag, index) => (

            <a  key={tag} href={`/tags/${tag.replace("#", "")}`} className="mx-2">{tag}</a>
          ))}
        </div>
      </div>

      {recentBlogsData.blogs.data.length >0 &&
        <>
          <h5 className="text-center text-3xl mt-10">Podobne przepisy</h5>
          <div class="mt-5 mx-auto flex flex-wrap w-full justify-center  px-1">

            {recentBlogsData.blogs.data.map((recentBlog) => (
              <div class="bg-white shadow-md border border-gray-200 rounded-lg max-w-sm dark:bg-gray-800 dark:border-gray-700 xl:mx-4 md:mx-0 mt-5 xl:w-1/4 md:w-1/3 sm:w-full">
                <a href={`/blogs/` + recentBlog.attributes.slug}>
                  <img class="rounded-t-lg" src={urlBuilder(recentBlog.attributes.image.data[0].attributes.url)} alt={recentBlog.attributes.title} />
                </a>
                <div class="p-5 w-full">
                  <a className="w-full" href={`/blogs/` + recentBlog.attributes.slug}>
                    <h5 class="text-gray-900 font-bold text-center tracking-tight mb-2 dark:text-white sm:text-sm">{recentBlog.attributes.title}</h5>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </>
      }


    </motion.div>
  )
}
