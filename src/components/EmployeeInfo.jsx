import React from "react";
import "../css/style.css";
import "../css/reset.css";
// Task 6: Add your imports here
import { saveInfo } from "../features/info/infoSlice";
import { useSelector, useDispatch } from "react-redux";
import InputField from "./InputField";
import { getIn, useFormik } from "formik";
import * as Yup from "yup";
import * as msg from "../utilities/validationMessages";
import { countriesList } from "../utilities/countriesList";
import { nextStep, prevStep } from "../features/stepper/stepperSlice";
import {
  Autocomplete,
  Box,
  Button,
  Grid,
  InputLabel,
  TextField,
} from "@mui/material";

const phoneRegexExp = /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/;

const EmployeeInfo = () => {
  // Task 6: Add your variables, validations and submit code here
  const { info } = useSelector((store) => store);
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      firstName: info.firstName,
      lastName: info.lastName,
      phone: info.phone,
      email: info.email,
      city: info.city,
      country: info.country,
      summary: info.summary,
    },
    validationSchema: Yup.object({
      firstName: Yup.string()
        .min(3, msg.minFname)
        .max(16, msg.maxFname)
        .required("Required!"),

      lastName: Yup.string()
        .min(3, msg.minLname)
        .max(16, msg.maxLname)
        .required("Required!"),

      phone: Yup.string()
        .matches(phoneRegexExp, msg.phone)
        .required("Required!"),

      email: Yup.string().email(msg.email).required("Required!"),

      city: Yup.string()
        .min(3, msg.minCity)
        .max(16, msg.maxCity)
        .required("Required!"),

      country: Yup.object().nullable().required("Required!"),

      summary: Yup.string()
        .min(20, msg.minSummary)
        .max(255, msg.maxSummary)
        .required("Required!"),
    }),
    onSubmit: (values) => {
      if (formik.isValid) {
        dispatch(saveInfo(values));
        dispatch(nextStep());
      }
      //next step
    },
  });

  const countryValues = getIn(formik.values, "country");
  const countryError = getIn(formik.errors, "country");
  const countryTouch = getIn(formik.touched, "country");

  const summaryValues = getIn(formik.values, "summary");
  const summaryError = getIn(formik.errors, "summary");
  const summaryTouch = getIn(formik.touched, "summary");

  return (
    <>
      {/* Task 6: Add form here */}

      <form>
        <Grid container spacing={4}>
          <Grid item xs={6} className="item">
            <InputField
              label="First Name"
              type="text"
              placeholder="e.g Patrick"
              name="firstName"
              id="firstName"
              formik={formik}
            ></InputField>
          </Grid>
          <Grid item xs={6} className="item">
            <InputField
              label="Last Name"
              type="text"
              placeholder="e.g Patrick"
              name="lastName"
              id="lastName"
              formik={formik}
            ></InputField>
          </Grid>
          <Grid item xs={6} className="item">
            <InputField
              label="Phone"
              type="tel"
              placeholder="e.g 066523154"
              name="phone"
              id="phone"
              formik={formik}
            ></InputField>
          </Grid>
          <Grid item xs={6} className="item">
            <InputField
              label="Email"
              type="email"
              placeholder="e.g Patrick@gmail.com"
              name="email"
              id="email"
              formik={formik}
            ></InputField>
          </Grid>
          <Grid item xs={6} className="item">
            <InputField
              label="City"
              type="city"
              placeholder="e.g Paris"
              name="city"
              id="city"
              formik={formik}
            ></InputField>
          </Grid>

          <Grid item xs={6} className="item">
            <InputLabel
              shrink
              htmlFor="input"
              type="select"
              className="text-input lable-margin"
            >
              Country
            </InputLabel>

            {formik && (
              <Autocomplete
                className="countries-input"
                options={countriesList}
                autoHighlight
                name={"country"}
                id="country"
                onChange={(e, value) => formik.setFieldValue("country", value)}
                value={countryValues}
                renderInput={(params) => (
                  <TextField
                    onBlur={formik.handleBlur}
                    {...params}
                    placeholder="Choose a country"
                    inputProps={{
                      ...params.inputProps,
                    }}
                  />
                )}
              />
            )}
            {countryError && countryTouch && (
              <p className="error-text"> {countryError}</p>
            )}
          </Grid>

          <Grid item xs={12} className="item">
            <InputLabel
              htmlFor="summary"
              type="text"
              className="text-input"
              sxs={{ marginLeft: "1.5rem" }}
            >
              Summary
            </InputLabel>
            <TextField
              placeholder="Write Your Summary Here"
              name="summary"
              id="summary"
              className=""
              multiline
              rows={3}
              fullWidth
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={summaryValues}
            />
            {summaryError && summaryTouch && (
              <p className="error-text">{summaryError}</p>
            )}
          </Grid>
        </Grid>
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
            variant="contained"
            onClick={() => formik.handleSubmit()}
            sx={{ background: "#4951F5" }}
          >
            Next
          </Button>
        </Box>
      </form>
    </>
  );
};
export default EmployeeInfo;
