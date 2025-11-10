import PDFParser from "pdf2json";

function safeDecode(text) {
  try {
    return decodeURIComponent(text);
  } catch {
    return text;
  }
}

export async function extractTextFromFile(file, filename) {
  const buf = Buffer.from(await file.arrayBuffer());
  const name = filename.toLowerCase();

  if (name.endsWith(".pdf")) {
    return new Promise((resolve, reject) => {
      const pdfParser = new PDFParser();

      pdfParser.on("pdfParser_dataError", reject);

      pdfParser.on("pdfParser_dataReady", () => {
        let text = "";
        pdfParser.data.Pages.forEach((p) => {
          p.Texts.forEach((t) => {
            t.R.forEach((r) => {
              text += safeDecode(r.T) + " ";
            });
          });
        });

        if (!text.trim()) reject("No extractable text");
        resolve(text.trim());
      });

      pdfParser.parseBuffer(buf);
    });
  }

  return buf.toString("utf8");
}
