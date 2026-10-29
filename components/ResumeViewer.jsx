"use client";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";
import { IoMdDownload } from "react-icons/io";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const ResumeViewer = ({ file, downloadName }) => {
  const wrapRef = useRef(null);
  const [numPages, setNumPages] = useState(null);
  const [width, setWidth] = useState(0);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  useEffect(() => {
    const measure = () => {
      const parent = wrapRef.current?.parentElement;
      if (!parent) return;
      const styles = getComputedStyle(parent);
      const pad =
        parseFloat(styles.paddingLeft) + parseFloat(styles.paddingRight);
      const viewport = document.documentElement.clientWidth;
      const next = Math.max(280, Math.floor(Math.min(viewport, 1400) - pad));
      setWidth((current) => (current === next ? current : next));
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(document.documentElement);
    window.addEventListener("resize", measure);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  return (
    <div ref={wrapRef} className="w-full min-w-0 max-w-full">
      <div className="mb-5 flex w-full justify-center font-oswald font-bold uppercase">
        <Button asChild>
          <a href={file} className="font-bold" download={downloadName}>
            Download Resume
            <IoMdDownload className="ml-2 h-4 w-4" />
          </a>
        </Button>
      </div>
      <Document file={file} onLoadSuccess={onDocumentLoadSuccess} className="flex flex-col items-center">
        {width > 0
          ? Array.from(new Array(numPages), (_, index) => (
              <div key={index} className="w-full">
                <Page pageNumber={index + 1} width={width} />
                <p className="p-2 text-end">
                  Page {index + 1} of {numPages}
                </p>
              </div>
            ))
          : null}
      </Document>
    </div>
  );
};
export default ResumeViewer;
