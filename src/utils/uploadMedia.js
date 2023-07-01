const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dqlasoiaw/auto/upload";
const CLOUDINARY_UPLOAD_PRESET = "techsocial";

export const uploadMedia = async (media) => {
  const formData = new FormData();

  formData.append("file", media);
  formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
  formData.append("folder", "socialMedia");

  try {
    const res = await fetch(CLOUDINARY_URL, {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    return data;
  } catch (e) {
    return console.error(e);
  }
};
