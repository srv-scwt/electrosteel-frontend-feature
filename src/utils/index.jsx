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

const HTML_ENTITY_MAP = {
  "&nbsp;": " ",
  "&amp;": "&",
  "&lt;": "<",
  "&gt;": ">",
  "&quot;": '"',
  "&#39;": "'",
};

const decodeHtmlEntities = (value = "") => {
  return String(value).replace(
    /&nbsp;|&amp;|&lt;|&gt;|&quot;|&#39;|&#\d+;|&#x[\da-f]+;/gi,
    (entity) => {
      const mappedEntity = HTML_ENTITY_MAP[entity.toLowerCase()];

      if (mappedEntity) {
        return mappedEntity;
      }

      try {
        if (/^&#\d+;$/i.test(entity)) {
          return String.fromCodePoint(Number(entity.slice(2, -1)));
        }

        if (/^&#x[\da-f]+;$/i.test(entity)) {
          return String.fromCodePoint(parseInt(entity.slice(3, -1), 16));
        }
      } catch {
        return " ";
      }

      return " ";
    }
  );
};

export const sanitizeTextContent = (text) => {
  if (text === null || text === undefined) return "";

  return decodeHtmlEntities(String(text))
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
};

export const stripHtmlTags = (html) => {
  return sanitizeTextContent(html);
};

export const truncateText = (text, minWords = 10) => {
  const normalizedText = sanitizeTextContent(text);

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


export const groupByTitle = (arr) => {
  // sort by id ascending
  const sortedData = [...arr].sort((a, b) => a.id - b.id);

  const map = {};

  sortedData.forEach((item) => {
    if (!map[item.title]) {
      map[item.title] = {
        sectionName: item.title,
        data: [],
      };
    }

    map[item.title].data.push(item);
  });

  return Object.values(map);
};
