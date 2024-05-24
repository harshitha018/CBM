import React, { useEffect, useState, useRef } from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import Error from "../error/Error";
import InputAdornment from "@mui/material/InputAdornment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
// import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
// import EventIcon from '@mui/icons-material/Event';

export default function ShadowIconDatePicker({
  showError,
  apiError,
  errors,
  data,
  icon,
  label,
  width = "100%",
  value,
  onChange,
  required,
  name,
  disabled,
  minDate,
  maxDate,
  endDate,
}) {
  const date = data?.[name] || value || "";
  //const [startDate, setStartDate] = useState(null);
  const [selectedDate, setSelectedDate] = useState(value);
  const currentDate = new Date();
  const [isOpen, setIsOpen] = useState(false);

  const handleDateChange = (date) => {
    if (date) {
      setSelectedDate(date);
      onChange(date);
      handleDatePickerClose();
    }
  };
  useEffect(() => {
    setSelectedDate(value);
  }, [value]);

  const validateStartDate = (date) => {
    // Allow dates starting from today
    return date >= currentDate;
  };

  const handleTextFieldClick = () => {
    setIsOpen(true);
  };

  const handleDatePickerClose = () => {
    setIsOpen(false);
  };

  console.log(value, "value----------");
  console.log("datevalue----", selectedDate);
  console.log(endDate);
  return (
    <div
      className="text-start flex-1"
      style={{ fontSize: "12px", width: "100%" }}>
      <TextField
        fullWidth={true}
        size="small"
        type={"text"}
        disabled={disabled ? disabled : false}
        sx={{
          fontSize: "12px", // Set font size for input text
          display: "flex",
          background: "white",
          alignItems: "center",
          "& .MuiInputBase-input": {
            fontSize: "12px",
            fontWeight: "500",
            paddingTop: "10px",
            paddingBottom: "10px",
          },
          "& .MuiInputBase-input::placeholder": {
            // Apply styles to placeholder
            fontSize: "12px", // Adjust placeholder font size here
            fontWeight: "500",
          },
        }}
        placeholder={label}
        value={selectedDate ? selectedDate.toDateString() : ""}
        onClick={handleTextFieldClick}
        InputProps={{
          readOnly: true,
          startAdornment: (
            <InputAdornment
              position="start"
              sx={{ width: "17px", height: "17px" }}>
              {icon}
            </InputAdornment>
          ),
          endAdornment: (
            <React.Fragment>
              <Divider sx={{ height: 20, m: 0.5 }} orientation="vertical" />
              <span style={{ color: "red" }}>{required ? "*" : ""}</span>
            </React.Fragment>
          ),
        }}
      />
      {isOpen && (
        <div style={{ position: "absolute", zIndex: 1 }}>
          <DatePicker
            id="startDate"
            selected={selectedDate}
            onChange={handleDateChange} //only when value has changed
            minDate={minDate ? minDate : currentDate}
            maxDate={maxDate ? maxDate : null}
            dateFormat="yyyy/MM/dd"
            inline
            endDate={endDate}
            isClearable
            onClickOutside={handleDatePickerClose}
          />
        </div>
      )}

      <Error>{showError && apiError}</Error>
    </div>
  );
}
