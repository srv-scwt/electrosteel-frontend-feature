export async function submitBusinessEnquiry(payload) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL;
    const res = await fetch(`${baseUrl}/enquiry/business`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const json = await res.json();

    if (!res.ok || json?.status === false) {
      return { data: null, error: json?.message || "Failed to submit enquiry" };
    }

    return { data: json?.data ?? json, error: null };
  } catch (error) {
    return { data: null, error: error.message || "Failed to submit enquiry" };
  }
}

export async function submitShareholderEnquiry(payload) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL;
    const res = await fetch(`${baseUrl}/enquiry/shareholder`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const json = await res.json();

    if (!res.ok || json?.status === false) {
      return { data: null, error: json?.message || "Failed to submit enquiry" };
    }

    return { data: json?.data ?? json, error: null };
  } catch (error) {
    return { data: null, error: error.message || "Failed to submit enquiry" };
  }
}

/**
 * The CMS returns a list of career-enquiry documents. Entries can carry either
 * an absolute URL or a bare filename, and some of the bare ones no longer
 * resolve, so callers should use `resolveCareerEnquiryDocument` to pick one.
 */
export async function getCareerEnquiryDocuments() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL;
    const res = await fetch(`${baseUrl}/enquiry/career-enquiry-document`, {
      cache: "no-store",
      headers: { Accept: "application/json" },
    });

    const json = await res.json();

    if (!res.ok || json?.status === false) {
      return { data: null, error: json?.message || "Failed to fetch the employment form" };
    }

    return { data: Array.isArray(json?.data) ? json.data : [], error: null };
  } catch (error) {
    return { data: null, error: error.message || "Failed to fetch the employment form" };
  }
}

/** First active entry that carries a usable absolute URL. */
export function resolveCareerEnquiryDocument(documents = []) {
  const isUsable = (value) => typeof value === "string" && /^https?:\/\//i.test(value.trim());

  const match = documents.find(
    (doc) => doc?.status !== 0 && (isUsable(doc?.file_name) || isUsable(doc?.file_path))
  );

  if (!match) return null;

  const url = (isUsable(match.file_name) ? match.file_name : match.file_path).trim();
  return { url, fileName: url.split("/").pop() || "employment-form.pdf" };
}

export async function submitCareerEnquiry(formData) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL;
    // No Content-Type header on purpose: the browser has to set the multipart
    // boundary itself, and setting it by hand breaks the upload.
    const res = await fetch(`${baseUrl}/enquiry/career`, {
      method: "POST",
      body: formData,
    });

    const json = await res.json().catch(() => null);

    if (!res.ok || json?.status === false) {
      return { data: null, error: json?.message || "Failed to submit enquiry" };
    }

    return { data: json?.data ?? json, error: null };
  } catch (error) {
    return { data: null, error: error.message || "Failed to submit enquiry" };
  }
}
