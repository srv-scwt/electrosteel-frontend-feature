"use client";

import { useEffect } from "react";

// Replaces the root layout when it is the layout itself that throws, so this must
// render its own <html>/<body> and cannot rely on any app-level providers.
export default function GlobalError({ error, reset }) {
  useEffect(() => {
    console.error("GLOBAL_BOUNDARY_ERROR:", error);
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0c5894, #083b66)",
          fontFamily: "system-ui, sans-serif",
          color: "#ffffff",
          padding: "16px",
        }}
      >
        <div style={{ maxWidth: "480px", textAlign: "center" }}>
          <h1 style={{ fontSize: "24px", marginBottom: "12px" }}>
            Something went wrong
          </h1>
          <p style={{ opacity: 0.85, marginBottom: "24px" }}>
            We couldn’t load the site right now. Please try again.
          </p>
          <button
            onClick={reset}
            style={{
              background: "#ffffff",
              color: "#0c5894",
              border: "none",
              borderRadius: "12px",
              padding: "12px 24px",
              fontSize: "14px",
              fontWeight: 500,
              cursor: "pointer",
            }}
          >
            Try Again
          </button>
        </div>
      </body>
    </html>
  );
}
