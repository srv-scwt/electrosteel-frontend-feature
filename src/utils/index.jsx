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


export const truncateText = (text, minWords = 10) => {
  if (text === null || text === undefined) return "";

  const normalizedText = String(text).trim().replace(/\s+/g, " ");

  if (!normalizedText) return "";

  const wordLimit = Number(minWords);
  const safeWordLimit = Number.isFinite(wordLimit)
    ? Math.max(0, Math.floor(wordLimit))
    : 10;

  if (safeWordLimit === 0) return "...";

  const words = normalizedText.split(/\s+/);

  if (words.length <= safeWordLimit) {
    return normalizedText;
  }

  return `${words.slice(0, safeWordLimit).join(" ")}...`;
};
