function buildAssetUrl(path, fallback = "") {
  if (!path) {
    return fallback;
  }

  const normalizedPath = String(path).replaceAll("\\", "/");

  if (
    normalizedPath.startsWith("/") ||
    normalizedPath.startsWith("http://") ||
    normalizedPath.startsWith("https://") ||
    normalizedPath.startsWith("data:")
  ) {
    return normalizedPath;
  }

  const baseUrl = process.env.NEXT_PUBLIC_IMAGE_URL?.trim();

  if (!baseUrl) {
    return fallback;
  }

  return `${baseUrl.replace(/\/+$/, "")}/${normalizedPath.replace(/^\/+/, "")}`;
}

export const createVideoSourceURL = (path , fallback = "") => {
    return buildAssetUrl(path, fallback);
}
export const createImageSourceURL = (path , fallback = "") => {
    return buildAssetUrl(path, fallback);
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
