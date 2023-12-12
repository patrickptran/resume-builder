import React from "react";
import "../css/style.css";
import "../css/reset.css";
// Task 8: Add imports here

import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
  Autocomplete,
  Grid,
  InputLabel,
  TextField,
  Typography,
} from "@mui/material";
import { countriesList } from "../utilities/countriesList";
import InputField from "./InputField";
import { getIn } from "formik";

const ExperienceForm = ({ index, formik }) => {
  const countryValues = getIn(formik.values, `work[${index}].country`);
  const countryError = getIn(formik.errors, `work[${index}].country`);
  const countryTouch = getIn(formik.touched, `work[${index}].country`);
  const startDateValues = getIn(formik.values, `work[${index}].startDate`);
  const startDateError = getIn(formik.errors, `work[${index}].startDate`);
  const startDateTouch = getIn(formik.touched, `work[${index}].startDate`);
  const endDateError = getIn(formik.errors, `work[${index}].endDate`);
  const endDateTouch = getIn(formik.touched, `work[${index}].endDate`);
  const endDateValues = getIn(formik.values, `work[${index}].endDate`);
  const descriptionError = getIn(formik.errors, `work[${index}].description`);
  const descriptionTouch = getIn(formik.touched, `work[${index}].description`);
  const descriptionValue = getIn(formik.values, `work[${index}].description`);

  return (
    <>
      {/* Task 8: Add form solution here */}
      <Grid container spacing={4}>
        {/* job Title */}
        <Grid item xs={6} className="item">
          <InputField
            label="Title"
            type="text"
            placeholder="e.g. Graphic Designer"
            name={`work[${index}].title`}
            value
            id="title"
            index={index}
            formik={formik}
          ></InputField>
        </Grid>

        {/* Organization */}
        <Grid item xs={6} className="item">
          <InputField
            label="Organization"
            type="text"
            placeholder="e.g. Educative"
            name={`work[${index}].organization`}
            id="organization"
            index={index}
            formik={formik}
          ></InputField>
        </Grid>

        {/* City */}
        <Grid item xs={6} className="item">
          <InputField
            label="City"
            type="text"
            placeholder="e.g. Paris"
            name={`work[${index}].city`}
            id="city"
            index={index}
            formik={formik}
          ></InputField>
        </Grid>

        {/* country */}
        <Grid item xs={6} className="item">
          <InputLabel
            shrink
            htmlFor="input"
            className="text-input label-margin"
          >
            Country
          </InputLabel>
          {formik && (
            <Autocomplete
              className="countries-input"
              options={countriesList}
              autoHighlight
              name={`work[${index}].country`}
              value={countryValues}
              onChange={(e, value) =>
                formik.setFieldValue(`work[${index}].country`, value)
              }
              renderInput={(params) => (
                <TextField
                  onBlue={formik.handleBlur}
                  {...params}
                  placeholder="Choose a country"
                  inputProps={{ ...params.inputProps }}
                />
              )}
            />
          )}
          {countryError && countryTouch && (
            <p className="error-text">{countryError}</p>
          )}
        </Grid>

        {/* Start Date work */}
        <Grid item xs={6} className="date-item">
          <Typography style={{ display: "flex" }}>
            <InputLabel
              shrink
              htmlFor="input"
              className="text-input label-margin"
            >
              Start Date
            </InputLabel>
          </Typography>
          <div className="date-picker">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DesktopDatePicker
                className="destopPicker"
                inputFormat="DD/MM/YYYY"
                value={startDateValues}
                name={`work[${index}].startDate`}
                id="date"
                onChange={(value) => {
                  formik.setFieldValue(`${`work[${index}].startDate`}`, value);
                }}
                onBlur={formik.handleBlur}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    formik={formik}
                    onBlur={formik.handleBlur}
                    name={`work[${index}].startDate`}
                  />
                )}
              />
            </LocalizationProvider>
          </div>
          {startDateError && startDateTouch && (
            <p className="error-text">{startDateError}</p>
          )}
        </Grid>

        {/* End Date work */}
        <Grid item xs={6} className="date-item">
          <Typography style={{ display: "flex" }}>
            <InputLabel
              shrink
              htmlFor="input"
              className="text-input label-margin"
            >
              End Date
            </InputLabel>
          </Typography>
          <div className="date-picker">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DesktopDatePicker
                className="destopPicker"
                inputFormat="DD/MM/YYYY"
                value={endDateValues}
                name={`work[${index}].endDate`}
                id="date"
                onChange={(value) => {
                  formik.setFieldValue(`${`work[${index}].endDate`}`, value);
                }}
                onBlur={formik.handleBlur}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    formik={formik}
                    onBlur={formik.handleBlur}
                    name={`work[${index}].endDate`}
                  />
                )}
              />
            </LocalizationProvider>
          </div>
          {endDateError && endDateTouch && (
            <p className="error-text">{endDateError}</p>
          )}
        </Grid>

        {/* Job description */}
        <Grid item xs={12} className="item">
          <InputLabel
            shrink
            htmlFor={`work[${index}].description`}
            className="text-input"
            sx={{ marginLeft: "1.5rem" }}
          >
            Description
          </InputLabel>

          <TextField
            placeholder="Write Your Job Description Here"
            name={`work[${index}].description`}
            id={`work[${index}].description`}
            className=""
            type="text"
            multiline
            rows={3}
            fullWidth
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={descriptionValue}
          />
          {descriptionError && descriptionTouch && (
            <p className="error-text">{descriptionError}</p>
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default ExperienceForm;
