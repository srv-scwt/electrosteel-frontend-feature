// app/ai-chat/page.tsx
"use client";

import Script from "next/script";
import React from "react";

const AIChatPage = () => {
  return (
    <>
      <div
        id="xr-frame-wrap"
        data-xpid="electrosteel"
        data-xsn="electrosteel"
        data-xlng="en"
        data-xcls="x-no-lang"
        data-xchost="electrosteel.x0pa.ai"
        style={{
          width: "100%",
          minHeight: "100vh",
        }}
      />
      <Script
        type="module"
        src="https://xcdn.x0pa.ai/xfe/pjs/electro-embed.js"
        strategy="afterInteractive"
      />
    </>
  );
};

export default AIChatPage;