import { create } from "zustand";

export const useNotesStore = create((set) => ({
  summary: "",
  keyPoints: [],
  definitions: [],
  flashcards: [],
  quiz: [],
  setNotes: (data) => set(data),
  reset: () =>
    set({
      summary: "",
      keyPoints: [],
      definitions: [],
      flashcards: [],
      quiz: [],
    }),
}));
