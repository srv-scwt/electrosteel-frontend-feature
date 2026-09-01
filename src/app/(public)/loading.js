import PageSkeleton from "@/components/common/PageSkeleton";

// Renders instantly on navigation while the route's server render is in
// flight. Without this, Next keeps the reader on the previous page with no
// feedback until the new one is ready, which reads as a frozen click.
export default function Loading() {
  return <PageSkeleton />;
}
