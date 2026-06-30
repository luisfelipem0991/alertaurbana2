"use client";

import dynamic from "next/dynamic";
import "swagger-ui-react/swagger-ui.css";

const SwaggerUI = dynamic(() => import("swagger-ui-react"), {
  ssr: false
});

export default function ApiDocsPage() {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || "";

  return (
    <main style={{ padding: "20px" }}>
      <SwaggerUI url={`${apiBaseUrl}/api/swagger`} />
    </main>
  );
}