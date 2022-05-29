import { getPost ,getPostByTags} from 'lib/api'

export default async function handler(req, res) {
 if (req.query.secret !== (process.env.STRAPI_PREVIEW_SECRET)) {
   return res.status(401).json({ message: "Invalid token" });
 }

 const slug = req.query.slug
 const tagss = req.query.tags
 const blogData = await getPost(slug)
 const tags = await getPostByTags(tagss)


 if (!tags) {
   return res.status(401).json({ message: "Invalid tag" });
 }else{
  res.setPreviewData({});
  res.writeHead(307, { Location: `/tags/${tagss}` });
  res.end();
 }

};