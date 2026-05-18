export const createVideoSourceURL = (path , fallback = "") => {
    return `${process.env.NEXT_PUBLIC_IMAGE_URL}/${path}` ?? fallback
}
export const createImageSourceURL = (path , fallback = "") => {
    return `${process.env.NEXT_PUBLIC_IMAGE_URL}/${path}` ?? fallback
}

export function parseCapacity(input) {
  const match = String(input).match(/^(\d+)([%+])?$/);

  return {
    count: match ? Number(match[1]) : 0,
    unit: match ? (match[2] || "") : ""
  };
}


export const formatSliderData = (images = []) => {
  try {
    if (!Array.isArray(images)) {
      return {
        imageSrc: [],
        imageTitle: [],
      };
    }

    return {
      imageSrc: images.map((item) => item?.src || ""),
      imageTitle: images.map((item) => item?.label || ""),
    };
  } catch (error) {
    return {
      imageSrc: [],
      imageTitle: [],
    };
  }
};


export const formatDate = (date) => {
  if (!date) return "";

  return new Date(date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
};


export  const truncateText = (text, minWords = 10) => {
    const words = text.split(" ");
    if (words.length <= minWords) return text;
    return words.slice(0, minWords).join(" ") + "...";
  };