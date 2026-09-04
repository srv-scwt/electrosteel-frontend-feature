import { revalidatePath, revalidateTag } from "next/cache";

/**
 * On-demand cache invalidation, called by the API/admin after a save.
 *
 * POST /api/revalidate
 *   { "secret": "...", "path": "/about/company-profile" }   one route
 *   { "secret": "...", "tag": "about" }                      every About request
 *   { "secret": "...", "tag": ["about", "home"] }            several at once
 *   { "secret": "...", "path": "/", "tag": "home" }          both
 *   { "secret": "..." }                                      whole site
 *
 * The secret may also be sent as an `x-revalidate-secret` header, which keeps
 * it out of access logs and request bodies that get logged.
 */

// This route must never be cached or statically evaluated.
export const dynamic = "force-dynamic";

function asArray(value) {
  if (!value) return [];
  return Array.isArray(value) ? value.filter(Boolean) : [value];
}

export async function POST(request) {
  const secret = process.env.REVALIDATE_SECRET;

  // Without a configured secret this endpoint would let anyone flush the cache.
  if (!secret) {
    return Response.json(
      { revalidated: false, error: "REVALIDATE_SECRET is not configured" },
      { status: 500 }
    );
  }

  let body = {};

  try {
    body = await request.json();
  } catch {
    // A body is optional — a bare authenticated POST revalidates everything.
    body = {};
  }

  const { searchParams } = new URL(request.url);
  const provided =
    request.headers.get("x-revalidate-secret") ||
    body?.secret ||
    searchParams.get("secret");

  if (provided !== secret) {
    return Response.json(
      { revalidated: false, error: "Invalid secret" },
      { status: 401 }
    );
  }

  const paths = [...asArray(body?.path), ...searchParams.getAll("path")];
  const tags = [...asArray(body?.tag), ...searchParams.getAll("tag")];

  try {
    if (!paths.length && !tags.length) {
      // Nothing specified: clear cached data and every rendered route.
      revalidateTag("all");
      revalidatePath("/", "layout");

      return Response.json({
        revalidated: true,
        scope: "all",
        now: new Date().toISOString(),
      });
    }

    tags.forEach((tag) => revalidateTag(tag));
    paths.forEach((path) => revalidatePath(path));

    return Response.json({
      revalidated: true,
      paths,
      tags,
      now: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Revalidate failed:", error);

    return Response.json(
      { revalidated: false, error: "Revalidation failed" },
      { status: 500 }
    );
  }
}

// GET is handy for a quick manual check from a browser; same secret required.
export async function GET(request) {
  return POST(request);
}
