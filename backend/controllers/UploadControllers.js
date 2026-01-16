import cloudinary from '../config/CloudinaryConfig.js'

export const uploadImage =  async (req, res) => {
  try {
    const uploadResult = await cloudinary.uploader.upload(req.file.path);

    res.status(200).json({
      success: true,
      url: uploadResult.secure_url,
      message: "File uploaded successfully"
    })
  } catch (error) {
    console.error("File upload error: ", error);
    res.status(500).json({
      success: false,
      message: "Internal server errror during file upload",
    });
  }
}