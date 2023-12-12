import React from "react";
import "../css/style.css";
// Task 13: Add imports here

import { Button, Box, InputLabel } from "@mui/material";
import { useFormik } from "formik";
import { nextStep, prevStep } from "../features/stepper/stepperSlice";
import { useSelector, useDispatch } from "react-redux";
import * as Yup from "yup";
import { saveSkills } from "../features/skills/skillsSlice";
import { TagsInput } from "react-tag-input-component";

export const EmployeeSkills = () => {
  // Task 13: Add your variables, validations and submit code here
  const { skills } = useSelector((store) => store);
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      skills: skills.skills,
    },
    validationSchema: Yup.object({
      skills: Yup.array().of(Yup.string()).min(3).max(7).required("Required!"),
    }),
    onSubmit: (values) => {
      if (formik.isValid) {
        dispatch(saveSkills(values));
        dispatch(nextStep());
      }
    },
  });

  return (
    <div className="skills">
      {/* Task 13: Add form here */}
      <InputLabel className="text-input">Skills</InputLabel>
      <TagsInput
        rows={3}
        placeHolder="e.g. Proficient in C++"
        onChange={(value) => {
          formik.setFieldValue("skills", value);
        }}
        formik={formik}
        onBlur={formik.handleBlur}
        value={formik.values.skills}
        name="skills"
        id="skills"
      />

      {formik.touched.skills && formik.errors.skills && (
        <p className="error-text">{formik.errors.skills}</p>
      )}

      {/* buttons to move to next and previous section */}
      <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
        <Button
          color="inherit"
          // previous step here
          onClick={() => dispatch(prevStep())}
          sx={{ mr: 1 }}
        >
          Back
        </Button>
        <Box sx={{ flex: "1 1 auto" }} />

        <Button
          onClick={() => formik.handleSubmit()}
          variant="contained"
          sx={{ background: "#4951F5" }}
        >
          Next
        </Button>
      </Box>
    </div>
  );
};

export default EmployeeSkills;
