import { ImageResponse } from "next/og";

export function brandIcon(size) {
  const fontSize = Math.round(size * 0.42);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#021257",
          color: "#f4f6fb",
          fontSize,
          fontWeight: 700,
          letterSpacing: "-0.04em",
        }}
      >
        ES
      </div>
    ),
    {
      width: size,
      height: size,
      headers: {
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    }
  );
}
