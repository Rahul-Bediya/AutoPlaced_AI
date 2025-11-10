// "use server" 
export function parseNotes(text = "") {
  if (typeof text !== "string") return {
    summary: "",
    keyPoints: [],
    definitions: [],
    flashcards: [],
    quiz: []
  };

  // Summary
  const summaryMatch = text.match(/Summary:\s*([\s\S]*?)Key Points:/i);
  const summary = summaryMatch ? summaryMatch[1].trim() : "";

  // Key Points
  const pointsMatch = text.match(/Key Points:\s*([\s\S]*?)Definitions:/i);
  const keyPoints = pointsMatch
    ? pointsMatch[1]
        .trim()
        .split("\n")
        .map((p) => p.replace(/^-/, "").trim())
        .filter(Boolean)
    : [];

  // Definitions
  const defMatch = text.match(/Definitions:\s*([\s\S]*?)Flashcards:/i);
  const definitions = defMatch
    ? defMatch[1]
        .trim()
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean)
    : [];

  // Flashcards
  const flashMatch = text.match(/Flashcards:\s*([\s\S]*?)Quiz:/i);
  const flashcards = flashMatch
    ? flashMatch[1]
        .trim()
        .split("\n\n")
        .map((block) => {
          const q = block.match(/Q:\s*(.*)/)?.[1];
          const a = block.match(/A:\s*(.*)/)?.[1];
          return { front: q, back: a };
        })
        .filter((card) => card.front && card.back)
    : [];

  // Quiz
  const quizMatch = text.match(/Quiz:\s*([\s\S]*)/i);
  const quiz = quizMatch
    ? quizMatch[1]
        .trim()
        .split("\n\n")
        .map((block) => {
          const question = block.match(/Q:\s*(.*)/)?.[1];
          const opts = block
            .match(/Options:\s*([\s\S]*?)Answer:/i)?.[1]
            ?.split("\n")
            .map((l) => l.replace(/^-/, "").trim())
            .filter(Boolean);

          const answer = block.match(/Answer:\s*(.*)/)?.[1];

          return question && opts
            ? { question, options: opts, answer }
            : null;
        })
        .filter(Boolean)
    : [];

  return {
    summary,
    keyPoints,
    definitions,
    flashcards,
    quiz
  };
}
