import { useReactToPrint } from "react-to-print";
import { RefObject } from "react";

export function usePdfExport(ref: RefObject<HTMLDivElement | null>, title: string) {
  const handlePrint = useReactToPrint({
    contentRef: ref,
    documentTitle: title || "resume",
    pageStyle: `
      @page { size: A4 portrait; margin: 0; }
      @media print {
        html, body { margin: 0; padding: 0; }
        .no-print { display: none !important; }
        .resume-page {
          width: 210mm !important;
          min-height: 297mm !important;
          margin: 0 !important;
          padding: 0 !important;
          box-shadow: none !important;
          border: none !important;
        }
      }
    `,
  });

  // react-to-print v3: useReactToPrint returns the print function directly
  return handlePrint;
}
