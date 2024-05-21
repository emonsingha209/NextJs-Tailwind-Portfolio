export const modifySvgContent = (svgContent) => {
  // Modify the SVG content as needed
  const modifiedSvgContent = svgContent.replace(
    /<style[^>]*>(.*?)<\/style>/gis,
    (match, styleContent) => {
      // Remove styles related to div elements
      const modifiedStyleContent = styleContent.replace(
        /\.container\s*{[^}]*}/g,
        ""
      );
      return `<style>${modifiedStyleContent}</style>`;
    }
  );

  // Change the class name from "container" to "svg-container"
  return modifiedSvgContent.replace(
    /class="container"/g,
    'class="svg-container"'
  );
};
