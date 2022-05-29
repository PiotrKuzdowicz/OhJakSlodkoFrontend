import { SearchIcon } from '@heroicons/react/solid'
import urlBuilder from 'lib/imageUrl'
import Link from 'next/link'
import React, { useState } from 'react'
import { motion, animate } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Image from 'next/image'
import Menu from './menu'
import RightMenu from './rightMenu'

export default function PostLoop(props) {
    const siteBlogs = props.siteBlogs
    const fadeIn = props.fadeIn
    return (
     
       
       siteBlogs.map((post) => (
                <Link href={`/blogs/${post.attributes.slug}`}>
                    <a>
                        <motion.div variants={fadeIn} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex flex-col rounded-lg shadow-lg overflow-hidden mt-10">
                            <div className="flex-shrink-0">
                                <Image width={1130} height={300} className="h-48 w-full object-cover" src={urlBuilder(post.attributes.image.data[0].attributes.url)} alt={post.attributes.title} />
                            </div>
                            <div className="flex-1 bg-white p-6 flex flex-col justify-between">
                                <div className="flex-1">
                                    <a href={post.attributes.href} className="block mt-2">
                                        <p className="text-xl font-semibold text-gray-900">{post.attributes.title}</p>
                                        <p className="mt-2 text-base text-gray-500">{post.attributes.description}</p>
                                    </a>
                                </div>
                                {/* <div className="mt-3 flex items-center">
                                    <div className="flex-shrink-0">
                                        <span className="sr-only">{post.attributes.author.name}</span>
                                        <Image width={50} height={50} className="h-10 w-10 rounded-full" src={urlBuilder(post.attributes.image.data[0].attributes.url)} alt={post.attributes.title} />
                                    </div>
                                    <div className="ml-3">
                                        <p className="text-sm font-medium text-gray-900">
                                            {post.attributes.author.name}
                                        </p>
                                        <div className="flex space-x-1 text-sm text-gray-500">
                                            <time dateTime={post.attributes.published}>{post.attributes.published}</time>
                                        </div>
                                    </div>
                                </div> */}
                            </div>
                        </motion.div>
                    </a>
                </Link>
            ))
    
    )
  }

