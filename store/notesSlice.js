// store/notesSlice.js
import { createSlice } from "@reduxjs/toolkit";

const LOCAL_KEY = "myapp_notes_v1";

const loadFromLocal = () => {
  try {
    const raw = localStorage.getItem(LOCAL_KEY);
    return raw ? JSON.parse(raw) : { sessions: [] };
  } catch {
    return { sessions: [] };
  }
};

const initialState = loadFromLocal();

const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    addSession(state, action) {
      // action.payload = { id, topics, level, format, notes, createdAt }
      state.sessions.unshift(action.payload);
      // keep only recent N if you want, e.g. state.sessions = state.sessions.slice(0, 50)
      localStorage.setItem(LOCAL_KEY, JSON.stringify(state));
    },
    removeSession(state, action) {
      const id = action.payload;
      state.sessions = state.sessions.filter((s) => s.id !== id);
      localStorage.setItem(LOCAL_KEY, JSON.stringify(state));
    },
    clearAll(state) {
      state.sessions = [];
      localStorage.removeItem(LOCAL_KEY);
    },
  },
});

export const { addSession, removeSession, clearAll } = notesSlice.actions;
export default notesSlice.reducer;
