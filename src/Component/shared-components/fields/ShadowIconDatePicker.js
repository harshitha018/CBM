// import * as React from 'react';
// import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import Box from '@mui/material/Box';
// import TextField from '@mui/material/TextField';

// export default function BasicDatePicker() {
//   return (
//     <LocalizationProvider dateAdapter={AdapterDayjs}>
//       <DemoContainer components={['DatePicker']}>
//         <Box sx={{'& .MuiInputBase-input':{}, '& .MuiTextField-root': { width: '100% !important' }, '& .MuiStack-root': { paddingTop: '0px !important' } }}>
//           <DatePicker
//             label="Date"
//             renderInput={(params) => (
//               <TextField
//                 {...params}
//                 sx={{
//                   '& .MuiInputBase-root': { padding: '0px !important' }
//                 }}
//               />
//             )}
//           />
//         </Box>
//       </DemoContainer>
//     </LocalizationProvider>
//   );
// }





import React, { useEffect, useState, useRef } from 'react'
import Paper from '@mui/material/Paper'
import InputBase from '@mui/material/InputBase'
import Divider from '@mui/material/Divider'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
// import Error from '../error/error'
import InputAdornment from '@mui/material/InputAdornment'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import { useSelector } from 'react-redux'
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
  width = '100%',
  value,
  onChange,
  required,
  name,
  disabled,
  minDate,
}) {
  const date = data?.[name] || value || ''
  const DarkMode = useSelector(state=>state.data.darkMode)
  //const [startDate, setStartDate] = useState(null);
  const currentDate = new Date()
  const [selectedDate, setSelectedDate] = useState(value || currentDate)
  console.log(selectedDate, 'your date')
  const [isOpen, setIsOpen] = useState(false)

  const handleDateChange = (date) => {
    if (date) {
      setSelectedDate(date)
      onChange(date)
      handleDatePickerClose()
    }
  }

  const validateStartDate = (date) => {
    // Allow dates starting from today
    return date >= currentDate
  }

  const handleTextFieldClick = () => {
    setIsOpen(true)
  }

  const handleDatePickerClose = () => {
    setIsOpen(false)
  }
  useEffect(() => {
    setSelectedDate(value)
  }, [value])
  console.log('datevalue----', selectedDate)
  console.log(disabled)
  return (
    <div
      className="text-start flex-1 relative"
      style={{ fontSize: '12px' }}
    >
        <label 
  style={{
    color: "rgba(0, 0, 0, 0.38)",
    fontFamily: "Roboto, Helvetica, Arial, sans-serif",
    fontWeight: 400,
    // height: '10px',
    background: `linear-gradient(to bottom, ${DarkMode ? 'transparent' : 'white'} 56%, ${disabled ? '#F1F1F1' : 'white'} 50%)`,
    padding: 0,
    margin: 0,
    fontSize: "12px",
    lineHeight: "1.4375em",
    letterSpacing: "0.00938em",
    // padding: 0,
    position:'absolute',
    paddingLeft:"2px",
    paddingRight:"2px",
    top:"-9px",
    left:'13px',
    zIndex:999
  }} 
  className={`capitalize`}
>
  {label}
</label>
      {console.log(selectedDate)}
      <TextField
        fullWidth={true}
        size="small"
        type={'text'}
        disabled={disabled ? disabled : false}
        sx={{
          fontSize: '12px', // Set font size for input text
          display: 'flex',
          background: 'white',
          alignItems: 'center',
          '& .MuiOutlinedInput-root':{
            height:"32px"
          },
          '& .MuiInputBase-input': {
            fontSize: '12px',
            fontWeight: '500',
            paddingTop: '10px',
            paddingBottom: '10px',
          },
          '& .MuiInputBase-input::placeholder': {
            // Apply styles to placeholder
            fontSize: '12px', // Adjust placeholder font size here
            fontWeight: '500',
          },
          "& .MuiInputBase-root.Mui-disabled": {
          backgroundColor: "#F1F1F1", // (default alpha is 0.38)
          color:"#B0B0B0"
    }
        }}
        // placeholder={label}
        // value={selectedDate ? selectedDate?.toDateString() : ''}
        value={selectedDate ? selectedDate : ''}
        onClick={handleTextFieldClick}
        InputProps={{
          readOnly: true,
          startAdornment: (
            <InputAdornment position="start">{icon}</InputAdornment>
          ),
          endAdornment: (
            <React.Fragment>
              <Divider sx={{ height: 20, m: 0.5 }} orientation="vertical" />
              <span style={{ color: 'red' }}>{required ? '*' : ''}</span>
            </React.Fragment>
          ),
        }}
      />
      {isOpen && (
        <div style={{ position: 'absolute', zIndex: 10 }}>
          <DatePicker
            id="startDate"
            showIcon
            selected={selectedDate}
            onChange={handleDateChange} //only when value has changed
            minDate={minDate ? minDate : currentDate}
            dateFormat="yyyy/MM/dd"
            inline
            onClickOutside={handleDatePickerClose}
            disabled={disabled}
          />
        </div>
      )}

      {/* <Error>{showError && apiError}</Error> */}
    </div>
  )
}
