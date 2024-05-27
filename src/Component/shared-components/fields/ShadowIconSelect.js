import React, { useEffect, useState, useRef, useMemo } from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Error from "../error/Error";
import Select from "react-select";
// import {Select}  from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";

export default function ShadowIconSelect({
  showError,
  apiError,
  errors,
  icon,
  data,
  name,
  width = "100%",
  options,
  label,
  required,
  value,
  defaultValue,
  iconFree,
  onChange,
  bgColour = "white",
  disable,
  ...rest
}) {
  // const currentValue = data?.[name] || [{ label: value, value: value }] || [];
  // const [selectedValue, setSelectedValue] = useState(value || defaultValue);
  const [selectedValue, setSelectedValue] = useState(value || defaultValue);
  //console.log(value, "Value-------------");

  const selectRef = useRef(null);

  const clearValue = () => {
    setSelectedValue(""); // Reset the selected value
  };

  // useEffect(() => {
  //   setSelectedValue(value);
  // }, [value?.value]);
  useEffect(() => {
    if (value && Object.keys(value).length) {
      setSelectedValue(value);
    } else {
      setSelectedValue([]);
    }
  }, [value]);

  const handleChange = (selectedOption) => {
    // clg(selectedOption, "selcetdOption");
    setSelectedValue(selectedOption);
    onChange(selectedOption);
  };
  //console.log(selectedValue);
  console.log(label)

  return (
    <div className="text-start flex-1 relative" style={{ fontSize: "12px" }}>
    <span
        className="text-sm absolute"
        style={{
          top: "-10px",
          left: "10px",
          background: `${bgColour}`,
          padding: "0 5px",
          zIndex: 1,
          fontSize: "11px",
        }}
      >
        <p>{label}</p>
        {required && <span style={{ color: "red" }}>*</span>}
      </span>
      <Select
        ref={selectRef}
        sx={{
          display: "flex",
          alignItems: "center",
          width: width,
        }}
        styles={{
          indicatorSeparator: () => {}, // removes the "stick"
          dropdownIndicator: (defaultStyles) => ({
            ...defaultStyles,
            "& svg": { display: "none" },
          }),
          control: (baseStyles, state) => ({
            ...baseStyles,
            // borderColor: state.isFocused ? "black" : "gray",
            "&:hover": {
              borderColor: "black",
            },
            backgroundColor: `${bgColour}`,
          }),
        }}
        placeholder={
          <React.Fragment>
            <IconButton
              sx={{ p: "2px", width: "20px", height: "20px" }}
              aria-label="menu">
              {" "}
              {icon}{" "}
            </IconButton>{" "}
            <span style={{ fontSize: "12px" }} className="text-nowrap">
              {" "}
              {label}
            </span>
            <span style={{ color: "red" }}>{required ? "*" : ""}</span>
          </React.Fragment>
        }
        options={options}
        value={selectedValue}
        onChange={handleChange}
        isClearable
        displayEmpty
        isSearchable
        isDisabled={disable}
        {...rest}
      />
      <Error>{showError && apiError}</Error>
    </div>
  );
}
