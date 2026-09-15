import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  complaint: null,
  completeness: null,
  risk: null,
  summary: "",
  root_cause: null,
  duplicate: null,
  capa: null,
  loading: false,
  error: null,
};

const complaintSlice = createSlice({
  name: "complaint",
  initialState,

  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },

    setAnalysis: (state, action) => {
      state.complaint = action.payload.complaint;
      state.completeness = action.payload.completeness;
      state.risk = action.payload.risk;
      state.summary = action.payload.summary;
      state.root_cause = action.payload.root_cause;
      state.duplicate = action.payload.duplicate;
      state.capa = action.payload.capa;
      state.error = null;
    },

    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  setLoading,
  setAnalysis,
  setError,
} = complaintSlice.actions;

export default complaintSlice.reducer;
