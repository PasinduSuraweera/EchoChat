import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadToCloudinary = async (file, userId) => {
  try {
    const result = await cloudinary.uploader.upload_stream(
      {
        folder: `profile-pics/${userId}`,
        public_id: `${Date.now()}-${file.originalname}`,
        resource_type: "image",
      },
      (error, result) => {
        if (error) throw error;
        return result;
      }
    ).end(file.buffer);
    return result.secure_url; // Returns the public URL
  } catch (error) {
    throw new Error(`Cloudinary upload failed: ${error.message}`);
  }
};