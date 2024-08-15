export const uploadImageToCloudinary = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', 'your_upload_preset'); // Replace with your actual Cloudinary upload preset

  const cloudinaryRes = await fetch(
    `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/upload`,
    {
      method: 'POST',
      body: formData,
    }
  );

  const cloudinaryData = await cloudinaryRes.json();

  if (!cloudinaryRes.ok) {
    throw new Error(cloudinaryData.error.message || 'Image upload failed');
  }

  return cloudinaryData.secure_url;
};
