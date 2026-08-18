import {
  getCareerEnquiryDocuments,
  resolveCareerEnquiryDocument,
} from "@/services/enquiry.api";

// The employment form lives on a CMS host that sends no CORS headers, so the
// browser can't fetch it as a blob, and a cross-origin `download` attribute is
// ignored — the PDF would just open in the viewer. Proxying it here lets us
// send Content-Disposition: attachment so the button actually downloads.
export async function GET() {
  const { data, error } = await getCareerEnquiryDocuments();

  if (error) {
    return Response.json({ error }, { status: 502 });
  }

  const document = resolveCareerEnquiryDocument(data ?? []);

  if (!document) {
    return Response.json({ error: "Employment form is not available" }, { status: 404 });
  }

  const upstream = await fetch(document.url, { cache: "no-store" });

  if (!upstream.ok || !upstream.body) {
    return Response.json({ error: "Employment form could not be downloaded" }, { status: 502 });
  }

  return new Response(upstream.body, {
    headers: {
      "Content-Type": upstream.headers.get("content-type") || "application/pdf",
      "Content-Disposition": `attachment; filename="${document.fileName}"`,
      "Cache-Control": "no-store",
    },
  });
}
