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

// Some CMS sections bundle a short all-caps label ("OUR APPROACH") and the main heading
// into one title string as two concatenated <h2> tags, in inconsistent order. Split them apart.
export function splitLabelAndTitle(html) {
  if (!html) return { label: "", title: "" };
  const parts = [...html.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/gi)].map((m) => m[1].trim());
  if (parts.length < 2) return { label: "", title: html };

  const isLabel = (part) => {
    const text = part.replace(/<[^>]+>/g, "");
    return /[A-Z]/.test(text) && text === text.toUpperCase();
  };

  const label = parts.find(isLabel) ?? parts[0];
  const title = parts.find((part) => part !== label) ?? parts[1];
  return { label, title };
}

// Some sections bundle the <h2> wrapper the target component already adds around its own
// title prop. Strip an outer <h2>...</h2> so the result doesn't double up when re-wrapped.
export function stripH2(html) {
  if (typeof html !== "string") return html;
  return html.replace(/^\s*<h2[^>]*>/i, "").replace(/<\/h2>\s*$/i, "");
}

// Variant of splitLabelAndTitle for sections that bundle three headings: an all-caps label
// and main title as <h2>s, plus a smaller intro heading as an <h3>.
export function splitLabelTitleAndIntro(html) {
  if (!html) return { label: "", title: "", intro: "" };
  const h2s = [...html.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/gi)].map((m) => m[1].trim());
  const intro = html.match(/<h3[^>]*>([\s\S]*?)<\/h3>/i)?.[1]?.trim() ?? "";

  const isLabel = (part) => {
    const text = part.replace(/<[^>]+>/g, "");
    return /[A-Z]/.test(text) && text === text.toUpperCase();
  };

  const label = h2s.find(isLabel) ?? h2s[0] ?? "";
  const title = h2s.find((part) => part !== label) ?? h2s[1] ?? "";
  return { label, title, intro };
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


export const groupByTitle = (arr = []) => {
  const groupedMap = {};

  const sortedData = [...arr].sort((a, b) => {
    const getNumber = (title) => {
      const match = title?.match(/\d+/);
      return match ? parseInt(match[0], 10) : 0;
    };

    return getNumber(a.title) - getNumber(b.title);
  });

  sortedData.forEach((item) => {
    const title = item?.title?.trim() || "Untitled";

    if (!groupedMap[title]) {
      groupedMap[title] = {
        sectionName: title,
        data: [],
      };
    }

    groupedMap[title].data.push(item);
  });

  return Object.values(groupedMap);
};