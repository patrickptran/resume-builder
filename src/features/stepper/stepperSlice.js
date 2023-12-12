import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  steps: ["Profile", "Work", "Education", "Skills", "Interests", "Preview"],
  activeStep: 0,
  prevStep: [],
  header: [
    {
      title: "What’s the best way for the employers to contact you?",
      subTitle: "We suggest including an email and a phone number.",
    },
    {
      title: "Tell us about your work experience",
      subTitle:
        "State your work experience in chronological order starting with the most recent one.",
    },
    {
      title: "Tell us about your education ",
      subTitle:
        "Give details about your education so far, even if you are a current student or did not graduate.",
    },
    {
      title: "Tell us about your skills",
      subTitle: "Enter your soft skills, hard skills, technical skills, etc.",
    },
    {
      title: "Tell us about your interests",
      subTitle: "Mention the things that you are interested in.",
    },
    {
      title: "",
      subTitle: "",
    },
  ],
};

const stepperSlice = createSlice({
  name: "stepper",
  initialState,
  reducers: {
    nextStep: (state) => {
      if (state.activeStep > state.steps.length - 1) {
        state.prevStep = [...state.prevStep, state.activeStep];
        state.activeStep += 1;
      }
    },
    prevStep: (state) => {
      if (
        state.activeStep > 0 &&
        state.prevStep.includes(state.activeStep - 1)
      ) {
        state.activeStep -= 1;
      }
    },
    jumpToStep: (state, { payload }) => {
      if (state.prevStep.includes(payload)) {
        state.activeStep = payload;
      }
    },
  },
});

export const { nextStep, jumpToStep, prevStep } = stepperSlice.actions;

export default stepperSlice.reducer;
