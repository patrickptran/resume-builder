import React from "react";
import "../css/style.css";
import "../css/reset.css";
// Task 9: Add imports here
import { saveWork } from "../features/work/workSlice";
import { useSelector, useDispatch } from "react-redux";
import { useFormik, FormikProvider, FieldArray } from "formik";
import * as Yup from "yup";
import ExperienceForm from "./ExperienceForm";
import * as msg from "../utilities/validationMessages";
import { nextStep, prevStep } from "../features/stepper/stepperSlice";
import { Button, Box } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CloseIcon from "@mui/icons-material/Close";

const EmployeeExperience = () => {
  // Task 9: Add your variables, validations and submit code here
  const { work } = useSelector((store) => store);
  const dispatch = useDispatch();

  const experienceEmpty = {
    title: "",
    country: "",
    city: "",
    organization: "",
    startDate: "",
    endDate: "",
    description: "",
  };

  const formik = useFormik({
    initialValues: {
      work: work.experience,
    },
    validationSchema: Yup.object().shape({
      work: Yup.array().of(
        Yup.object().shape({
          title: Yup.string()
            .min(3, msg.minTitle)
            .max(50, msg.maxTitle)
            .required("Required!"),
          organization: Yup.string()
            .min(3, msg.minOrganization)
            .max(50, msg.maxOrganization)
            .required("Required!"),

          city: Yup.string()
            .min(3, msg.minCity)
            .max(50, msg.maxCity)
            .required("Required!"),

          country: Yup.object().nullable().required("Required!"),

          description: Yup.string()
            .min(50, msg.minDescription)
            .max(2550, msg.maxDescription)
            .required("Required!"),

          startDate: Yup.date()
            .nullable()
            .test("startDate", "Futures Dates are not allowed", (value) => {
              const today = new Date();
              return value?.setHours(0, 0, 0, 0) <= today.setHours(0, 0, 0, 0);
            })
            .transform((v) => (v instanceof Date && !isNaN(v) ? v : null))
            .required("Required!"),

          endDate: Yup.date()
            .nullable()
            .min(Yup.ref("startDate"), "End date can't be before Start Date")
            .test("endDate", "Futures Dates are not allowed", (value) => {
              const today = new Date();
              return value?.setHours(0, 0, 0, 0) <= today.setHours(0, 0, 0, 0);
            })
            .transform((v) => (v instanceof Date && !isNaN(v) ? v : null))
            .required("Required!"),
        })
      ),
    }),
    onSubmit: (values) => {
      if (formik.isValid) {
        dispatch(saveWork(values));
        dispatch(nextStep());
      }
    },
  });
  return (
    <React.Fragment>
      {/* Task 9: Add form here */}
      <FormikProvider value={formik}>
        <FieldArray
          name="work"
          render={(arrayHelpers) => (
            <AddCircleIcon
              sx={{
                float: "right",
                marginTop: "10px",
                fontSize: "30px",
                cursor: "pointer",
              }}
              onClick={() => {
                arrayHelpers.insert(formik.values.work.length, experienceEmpty);
              }}
            />
          )}
        ></FieldArray>

        <FieldArray
          name="work"
          render={(arrayHelpers) => (
            <div>
              {formik.values.work.map((experience, index) => {
                return (
                  <React.Fragment key={index}>
                    {index > 0 && (
                      <CloseIcon
                        sx={{
                          float: "right",
                          fontSize: "30px",
                          marginTop: "10px",
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          arrayHelpers.remove(index);
                        }}
                      />
                    )}
                    <form className="form-group">
                      <ExperienceForm
                        experience={experience}
                        index={index}
                        formik={formik}
                      ></ExperienceForm>
                    </form>
                  </React.Fragment>
                );
              })}
            </div>
          )}
        ></FieldArray>
      </FormikProvider>

      {/* button */}
      <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
        <Button
          color="inherit"
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
    </React.Fragment>
  );
};

export default EmployeeExperience;
