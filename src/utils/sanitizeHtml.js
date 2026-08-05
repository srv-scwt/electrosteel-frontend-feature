import DOMPurify from "isomorphic-dompurify";

/**
 * Sanitize CMS-authored HTML before it is injected via dangerouslySetInnerHTML.
 *
 * Kept in its own module (rather than in `@/utils`) so that pulling DOMPurify in
 * doesn't leak into every client bundle that imports the shared helpers. Safe in
 * both server and client components — isomorphic-dompurify handles both.
 */
export function sanitizeHtml(html) {
  if (html === null || html === undefined) {
    return "";
  }

  return DOMPurify.sanitize(String(html));
}

export default sanitizeHtml;
