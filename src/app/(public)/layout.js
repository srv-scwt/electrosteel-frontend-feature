// Metadata is declared per route (each page.jsx exports its own
// generateMetadata) rather than derived here from headers(). headers() is a
// request-time API, and calling it in this shared layout opted every public
// page out of Next's Full Route Cache — forcing a full React re-render on
// every request.
export default function PublicLayout({ children }) {
  return children;
}
