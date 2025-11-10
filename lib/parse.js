
// "use server";

// import PDFParser from "pdf2json";
// import docxParser from "docx-parser";

// export async function extractTextFromFile(file, filename) {
//   const buf = Buffer.from(await file.arrayBuffer());
//   const name = filename.toLowerCase();

//   // --- PDF ---
//   if (name.endsWith(".pdf")) {
//     return new Promise((resolve, reject) => {
//       const pdfParser = new PDFParser(null, 1);

//       pdfParser.on("pdfParser_dataError", (err) => {
//         reject(err.parserError);
//       });

//       pdfParser.on("pdfParser_dataReady", () => {
//         const text = pdfParser.getRawTextContent();
//         resolve((text || "").trim());
//       });

//       pdfParser.parseBuffer(buf);
//     });
//   }

//   // --- DOCX ---
//   if (name.endsWith(".docx")) {
//     return new Promise((resolve, reject) => {
//       docxParser.parseBuffer(buf, (data, err) => {
//         if (err) reject(err);
//         resolve((data || "").trim());
//       });
//     });
//   }

//   // --- TXT (fallback) ---
//   return buf.toString("utf-8");
// }

"use server";

import PDFParser from "pdf2json";
import docxParser from "docx-parser";

export async function extractTextFromFile(file, filename) {
  const buf = Buffer.from(await file.arrayBuffer());
  const name = filename.toLowerCase();

  // ---- PDF ----
  // --- PDF ---
if (name.endsWith(".pdf")) {
  return new Promise((resolve, reject) => {
    const pdfParser = new PDFParser();

    pdfParser.on("pdfParser_dataError", (err) => reject(err.parserError));

    pdfParser.on("pdfParser_dataReady", () => {
      const pages = pdfParser.data.Pages;
      let text = "";

      function safeDecode(t) {
        try {
          return decodeURIComponent(t);
        } catch {
          return t; // leave as-is
        }
      }

      pages.forEach((p) => {
        p.Texts?.forEach((t) => {
          t.R?.forEach((r) => {
            text += safeDecode(r.T) + " ";
          });
        });
        text += "\n\n";
      });

      if (!text.trim()) {
        return reject("Could not extract readable content from PDF.");
      }

      resolve(text.trim());
    });

    pdfParser.parseBuffer(buf);
  });
}


  // ---- DOCX ----
  if (name.endsWith(".docx")) {
    return new Promise((resolve, reject) => {
      docxParser.parseBuffer(buf, (data, err) => {
        if (err) reject(err);
        resolve((data || "").trim());
      });
    });
  }

  // ---- TXT fallback ----
  return buf.toString("utf8");
}
