import { SearchIcon } from '@heroicons/react/solid'
import urlBuilder from 'lib/imageUrl'
import Link from 'next/link'
import React, { useState } from 'react'
import { motion, animate } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Image from 'next/image'
import Menu from './menu'
import PostLoop from './postsLoop'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUtensils, faMugHot } from "@fortawesome/free-solid-svg-icons";
import src from '@tailwindcss/typography'


export default function LastPosts(props) {
  const menuBlogs = props.menuBlogs
  return (
    menuBlogs.map((post) => (
      
   
      <li key={post.attributes.title} className="relative -mb-px block border-b p-4 border-grey"><a href={`/blogs/`+post.attributes.slug} >{post.attributes.title}</a></li>
      
     
    ))  
    )
}