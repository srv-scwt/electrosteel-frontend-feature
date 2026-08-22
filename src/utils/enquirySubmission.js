/**
 * Gates the enquiry thank-you pages behind an actual form submission.
 *
 * A form drops a short-lived cookie the moment its POST succeeds; the matching
 * thank-you page reads that cookie on the server and calls notFound() when it is
 * absent, so typing the URL directly returns a real 404.
 *
 * This is a UX gate, not a security boundary - the cookie is readable and
 * writable from the browser. Nothing sensitive is rendered on those pages, so
 * that trade is fine; do not use this pattern to protect real data.
 */

// One cookie per form, so submitting one enquiry cannot unlock another's page.
export const ENQUIRY_COOKIES = {
  business: "enquiry_submitted_business",
  shareholder: "enquiry_submitted_shareholder",
  career: "enquiry_submitted_career",
};

// Long enough to survive a reload or a back-then-forward, short enough that the
// page stops being reachable soon after.
export const ENQUIRY_COOKIE_MAX_AGE = 60 * 10;

/**
 * Client-side only. Call right before navigating to the thank-you page.
 */
export function markEnquirySubmitted(formKey) {
  const cookieName = ENQUIRY_COOKIES[formKey];

  if (!cookieName || typeof document === "undefined") return;

  const secure = window.location.protocol === "https:" ? "; secure" : "";

  document.cookie = `${cookieName}=1; path=/; max-age=${ENQUIRY_COOKIE_MAX_AGE}; samesite=lax${secure}`;
}
