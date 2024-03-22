// pages/page.js
"use client";
import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

export default function Resume() {
  const [numPages, setNumPages] = useState(null);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return (
    <div className="grid pt-5 bg-background place-items-center">
      <Document file="/resume/resume.pdf" onLoadSuccess={onDocumentLoadSuccess}>
        {Array.from(new Array(numPages), (_, index) => (
          <>
            <Page key={index + 1} pageNumber={index + 1} />
            <p className="p-2 text-end">
              Page {index + 1} of {numPages}
            </p>
          </>
        ))}
      </Document>
    </div>
  );
}
