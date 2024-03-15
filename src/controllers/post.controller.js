import { Post } from "../models/blogs.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const uploadPost = async (req, res) => {
  const { title, description, adminKey } = req.body;

  if (process.env.ADMIN_KEY !== adminKey) {
    return res.status(401).json({ msg: "Unauthorized" });
  }

  const imageFile = req.file?.path;

  if (!(title && description))
    return res
      .status(400)
      .json({ msg: "Missing fields for post title or description" });

  if (!imageFile) return res.status(400).json({ msg: "Missing image file" });

  const imageUrl = await uploadOnCloudinary(imageFile);

  const post = await Post.create({
    title,
    description,
    image: imageUrl.url,
  });

  if (!post)
    return res
      .status(404)
      .json({ msg: " Could not create post with title or description" });

  return res.status(201).json({ post });
};



const getAllPosts = async (req, res) => {
  try {
    const { page = 1, pageSize = 10 } = req.query;
    // console.log("Received request for fetching posts:", { page, pageSize });

    const posts = await Post.find()
      .sort({ createdAt: -1})
      .skip((page - 1) * pageSize)
      .limit(parseInt(pageSize))
      .lean();

      // console.log("totoal documents of posts:", posts.length)


      // const transformedPosts = posts.map(post => {
      //   const transformedImageUrl = post.image.replace(/\/upload\/v\d+\//, '/upload/c_thumb,h_800,w_800/co_rgb:FFFFFFA3,l_text:helvetica_60_bold_normal_left:webgeniuscraft/fl_layer_apply,g_center/');
      //   return { ...post, image: transformedImageUrl };
      // });
      // res.status(200).json({ message: "Posts fetched successfully :)", posts: transformedPosts });

      res.status(200).json({ message: "Posts fetched successfully :)", posts });
 

  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export { uploadPost, getAllPosts };
