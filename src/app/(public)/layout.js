import { headers } from "next/headers";

import { buildMetadataForPathname } from "@/utils/seo";

export async function generateMetadata() {
  const requestHeaders = await headers();
  const pathname = requestHeaders.get("x-pathname") || "/";

  return buildMetadataForPathname(pathname);
}

export default function PublicLayout({ children }) {
  return children;
}
