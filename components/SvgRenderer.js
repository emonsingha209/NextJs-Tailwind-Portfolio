"use client";

import { useEffect, useRef } from "react";

const SvgRenderer = ({ svgContent }) => {
  const svgRef = useRef(null);

  useEffect(() => {
    if (svgRef.current) {
      const modifiedSvgContent = svgContent
        .replace(/<style[^>]*>(.*?)<\/style>/gis, (match, styleContent) => {
          // Remove styles related to div elements
          const modifiedStyleContent = styleContent
            .replace(/\.container\s*{[^}]*}/g, "")
            .replace(/div\s*{[^}]*}/g, "");
          return `<style>${modifiedStyleContent}</style>`;
        })
        .replace(/class="container"/g, 'class="flex items-center p-2.5 rounded-lg bg-[#1E0342] "');

      svgRef.current.innerHTML = modifiedSvgContent;
    }
  }, [svgContent]);

  return <div ref={svgRef} />;
};

export default SvgRenderer;
