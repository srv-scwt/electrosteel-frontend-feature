import { createVideoSourceURL } from "@/utils";

const DEFAULT_IFRAME_ALLOW =
  "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";

const extractAttribute = (markup = "", attribute) => {
  const match = String(markup).match(
    new RegExp(`${attribute}=["']([^"']+)["']`, "i")
  );

  return match?.[1] ?? "";
};

const parseYouTubeStart = (value = "") => {
  if (!value) return "";

  if (/^\d+$/.test(value)) {
    return value;
  }

  const match = value.match(
    /^(?:(\d+)h)?(?:(\d+)m)?(?:(\d+)s)?$/i
  );

  if (!match) return "";

  const hours = Number(match[1] || 0);
  const minutes = Number(match[2] || 0);
  const seconds = Number(match[3] || 0);
  const totalSeconds = hours * 3600 + minutes * 60 + seconds;

  return totalSeconds > 0 ? String(totalSeconds) : "";
};

const normalizeYouTubeUrl = (urlString = "") => {
  if (!urlString) return "";

  try {
    const url = new URL(urlString);
    const host = url.hostname.replace(/^www\./, "");
    const pathSegments = url.pathname.split("/").filter(Boolean);

    let videoId = "";

    if (
      host === "youtube.com" ||
      host === "m.youtube.com" ||
      host === "music.youtube.com" ||
      host === "youtube-nocookie.com"
    ) {
      videoId =
        url.searchParams.get("v") ||
        (["embed", "shorts", "live"].includes(pathSegments[0])
          ? pathSegments[1]
          : "");
    } else if (host === "youtu.be") {
      videoId = pathSegments[0] || "";
    } else {
      return urlString;
    }

    if (!videoId) return urlString;

    const params = new URLSearchParams(url.search);
    const startTime = parseYouTubeStart(params.get("t") || "");

    params.delete("v");
    params.delete("t");

    if (startTime && !params.get("start")) {
      params.set("start", startTime);
    }

    const query = params.toString();

    return `https://www.youtube.com/embed/${videoId}${query ? `?${query}` : ""}`;
  } catch {
    return urlString;
  }
};

export const getIframeEmbedProps = (
  videoLink,
  fallbackTitle = "Video",
  fallbackAllow = DEFAULT_IFRAME_ALLOW,
  fallbackReferrerPolicy = "strict-origin-when-cross-origin"
) => {
  if (!videoLink) return null;

  const trimmedVideoLink = String(videoLink).trim();

  if (!trimmedVideoLink) return null;

  const isIframeMarkup = /<iframe\b/i.test(trimmedVideoLink);
  const rawSource = isIframeMarkup
    ? extractAttribute(trimmedVideoLink, "src")
    : trimmedVideoLink;

  if (!rawSource) return null;

  const normalizedSource = normalizeYouTubeUrl(
    createVideoSourceURL(rawSource.replaceAll("&amp;", "&"))
  );

  return {
    src: normalizedSource,
    title: isIframeMarkup
      ? extractAttribute(trimmedVideoLink, "title") || fallbackTitle
      : fallbackTitle,
    allow: isIframeMarkup
      ? extractAttribute(trimmedVideoLink, "allow") || fallbackAllow
      : fallbackAllow,
    referrerPolicy: isIframeMarkup
      ? extractAttribute(trimmedVideoLink, "referrerpolicy") ||
        fallbackReferrerPolicy
      : fallbackReferrerPolicy,
    allowFullScreen: true,
  };
};

const IframeEmbed = ({
  videoLink,
  title = "Video",
  className = "",
  allow = DEFAULT_IFRAME_ALLOW,
  referrerPolicy = "strict-origin-when-cross-origin",
  loading = "lazy",
}) => {
  const iframeProps = getIframeEmbedProps(
    videoLink,
    title,
    allow,
    referrerPolicy
  );

  if (!iframeProps?.src) return null;

  return (
    <iframe
      src={iframeProps.src}
      title={iframeProps.title}
      allow={iframeProps.allow}
      referrerPolicy={iframeProps.referrerPolicy}
      allowFullScreen={iframeProps.allowFullScreen}
      className={className}
      loading={loading}
      style={{ border: 0 }}
    />
  );
};

export default IframeEmbed;
