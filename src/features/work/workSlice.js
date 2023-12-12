// // Task 7: Add your solution here

import { createSlice } from "@reduxjs/toolkit";

const experience = {
  title: "",
  organization: "",
  city: "",
  country: "",
  startDate: "",
  endDate: "",
  jobDescription: "",
};
const initialState = {
  experience: [experience],
};

const workSlice = createSlice({
  name: "work",
  initialState,
  reducers: {
    saveWork: (state, { payload }) => {
      state.experience = payload.work;
    },
  },
});

export const { saveWork } = workSlice.actions;

export default workSlice.reducer;
