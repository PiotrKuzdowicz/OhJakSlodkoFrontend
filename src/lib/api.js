import { gql } from "graphql-tag";
import apolloClient from 'lib/apolloClient';


export const getPost = async (slug) => {
    const BLOG_QUERY = gql`
    query($slug: String){
      blogs(where: {slug: $slug}){
        id
        title
        subtitle
        description
        published
        slug
        image{
          url
        }
        author {
          name
          photo {
            url
          }
        }
        content
      }
    }
    `
    const { data:blogData } = await apolloClient.query({
      query: BLOG_QUERY,
      variables: {slug}
    })
    return blogData.blogs[0]
}

export const getPostByTags = async (tag) => {
  const BLOG_QUERY = gql`
  query getPostByTag($tag: String){
    blogs(filters: {tags:{containsi:$tag}}){
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
          }
        }
      }
  }
  `
  const { data:blogData } = await apolloClient.query({
    query: BLOG_QUERY,
    variables: {tag}
  })
  return blogData.blogs[0]
}

 
export async function getMainBlogs(page,pageSize){
  // GQL queries
 const MAIN_BLOG_QUERY = gql`
 query mojeQuery($page: Int, $pageSize: Int){
  blogs(pagination: { pageSize:$pageSize, page:$page }, sort: "published:desc") {
    __typename
    data {
      __typename
      attributes {
        __typename
        title
        description
        published
        slug
        image {
          data {
            attributes {
              url
            }
          }
        }
        author {
          data {
            attributes {
              name
            }
          }
        }
        content
      }
    }meta{
      pagination{
        page
        pageCount
      }
    }
  }
}



 `
 // Blogs Data
 const { data:blogsData } = await apolloClient.query({
   query: MAIN_BLOG_QUERY,
   variables:{page,pageSize}
 })
 blogsData.blogs.meta.pagination.page = page
  return blogsData.blogs
}


export async function getMenuBlogs(){
  // GQL queries
 const RIGHT_MENU_BLOGS = gql`

query getPostForMenu{
  blogs(pagination:{limit:5} sort: "published:asc") {
    data {
      attributes {
        title
        slug
      }
    }
  }
}


 `
 // Blogs Data
 const { data:menuBlogs } = await apolloClient.query({
   query: RIGHT_MENU_BLOGS
 })
  return menuBlogs.blogs
}


export async function getMainMenu(){
  // GQL queries
 const GET_MAIN_MENU = gql`

 query getMenu{
  mainCategories{
    data{
      attributes{
        name
        categories{
          data{
            attributes{
              name
              slug
            }
          }
        }
      }
    }
  }
}
 `
 // Blogs Data
 const { data:mainCategories } = await apolloClient.query({
   query: GET_MAIN_MENU
 })
  return mainCategories
}



export async function getMainImage(){
  const MAIN_IMAGE_QUERY = gql`
  query{
    homePage{
      data{
        attributes{
          image{
            data{
              attributes{
              	url
                name
              }
            }
          }
        }}
    }
  }
  `
  const { data:mainImages } = await apolloClient.query({
    query: MAIN_IMAGE_QUERY
  })
  return mainImages
}
 
 

export async function getTopPage(){
  const menuBlogsData = await getMenuBlogs()
  const menu = await getMainMenu()
  const mainImage = await getMainImage()
  const topPageData = new Map([
    ["menuBlogsData", menuBlogsData],
    ["menu", menu],
    ["mainImage", mainImage]
  ]);
  return topPageData
}


export async function getDataForBlogPage(slug,previewMode,context){
  const GET_DATA_FOR_BLOG_PAGE = gql`
  query getDataForBlogPage($slug: String){
    blogs(filters: {slug:{eq:$slug}}){
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
  query: GET_DATA_FOR_BLOG_PAGE,
  variables: {
    slug,
    previewMode

  },
  preview: context.preview,
})
return blogData
}

export async function getRecentBlogsDataForBlogPage(slug,previewMode,context,category){
  const GET_RECENT_BLOGS_DATA_FOR_BLOG_PAGE = gql`
  query getRecentBlogsDataForBlogPage($slug: String, $category: String) {
    blogs(
      pagination: { limit: 3 }
      filters: { slug: { ne: $slug }, category: { name: { eq: $category } } }
    ) {
      data {
        attributes {
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
          image {
            data {
              attributes {
                url
              }
            }
          }
          author {
            data {
              attributes {
                name
                photo {
                  data {
                    attributes {
                      url
                    }
                  }
                }
              }
            }
          }
          content
          category {
            data {
              attributes {
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
  query: GET_RECENT_BLOGS_DATA_FOR_BLOG_PAGE,
  variables: {
    slug,
    category,
    previewMode

  },
  preview: context.preview,
})
return blogData
}


export async function addComment(id,name,description){
  const ADD_COMMENT = gql`
  mutation($id: Int, $name: String, $descrpitpion: String){
    createComment(data:{name:$name,description:$description,blog:$id}){
      data{
        attributes{
          name
          description
          blog{
            data{
              attributes{
                slug
              }
            }
          }
        }
      }
    }
  }
  `
const { data: commentData } = await apolloClient.query({
  query: ADD_COMMENT,
  variables: {
    id,
    name,
    description

  }
})
return commentData
}
