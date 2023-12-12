import React from "react";
import { getIn } from "formik";
import { InputLabel, Input } from "@mui/material";

const InputField = ({ label, type, placeholder, name, id, formik, index }) => {
  const error = getIn(formik.errors, name);
  const touch = getIn(formik.touched, name);
  const values = getIn(formik.values, name);
  return (
    <React.Fragment>
      {
        /* Input label component */ <InputLabel
          shrink
          hmltFor={name}
          className="text-input"
          sx={{ marginLeft: "1.5rem" }}
        >
          {label}
        </InputLabel>
      }

      {
        /* Input component */ <Input
          placeholder={placeholder}
          name={name}
          id={id}
          className=""
          type={type}
          fullWidth
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={values}
        ></Input>
      }

      {
        /* Error message  */ error && touch && (
          <p className="error-text">{error}</p>
        )
      }
    </React.Fragment>
  );
};

export default InputField;
