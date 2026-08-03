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
