import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_CLOUD_API_KEY,
  api_secret: process.env.CLOUDINARY_CLOUD_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  if (!localFilePath) {
    return null;
  }

  try {
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });

    // console.log("File uploaded successfully:", response.url);
    fs.unlinkSync(localFilePath);

    return response;
  } catch (error) {
    console.error(error);
    fs.unlinkSync(localFilePath);
    throw error;
  }
};

export { uploadOnCloudinary };

// https://res.cloudinary.com/dvzqldbjr/image/upload/   v1710154892  /zn3awomusyne6bswrigy.jpg
// https://res.cloudinary.com/dvzqldbjr/image/upload/c_thumb,h_800,w_800/co_rgb:FFFFFFA3,l_text:helvetica_60_bold_normal_left:webgeniuscraft/fl_layer_apply,g_center/zn3awomusyne6bswrigy.jpg
// https://res.cloudinary.com/amanjanagal/image/upload/c_thumb,h_800,w_800/co_rgb:FFFFFFA3,l_text:helvetica_60_bold_normal_left:webgeniuscraft/fl_layer_apply,g_center/mqtofui5wiffs8iws0lf.jpg