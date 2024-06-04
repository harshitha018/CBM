// import * as React from 'react';
// import InputLabel from '@mui/material/InputLabel';
// import MenuItem from '@mui/material/MenuItem';
// import FormControl from '@mui/material/FormControl';
// import Select, { SelectChangeEvent } from '@mui/material/Select';

// export default function SelectSmall({ showError,
//     apiError,
//     errors,
//     icon,
//     data,
//     name,
//     width = '100%',
//     label,
//     required,
//     value,
//     iconFree,
//     onChange,
//     disable, options, defaultValue = '', backgroundColor }) {
//   const [selectedValue, setSelectedValue] = React.useState(defaultValue);

//   const handleChange = (event) => {
//     setSelectedValue(event.target.value);
//     console.log(event)

//   };


//   return (
//     <FormControl sx={{ minWidth: 120, backgroundColor }} size="small">
//       <InputLabel id="demo-select-small-label" sx={{ zIndex: 0,fontSize:"14px" }}>{label}</InputLabel>
//       <Select
//         labelId="demo-select-small-label"
//         id="demo-select-small"
//         value={selectedValue}
//         label={label}
//         sx={{
//           fontSize: '12px', // Set font size for input text
//           display: 'flex',
//           alignItems: 'center',
//           '& .MuiSelect-select': {
//             height: "27px"
//           }
//         }}
//         onChange={handleChange}
//       >
//         <MenuItem value="">
//           <em>None</em>
//         </MenuItem>
//         {options.map(option => (
//           <MenuItem key={option.value} value={option.value}>
//             {option.label}
//           </MenuItem>
//         ))}
//       </Select>
//     </FormControl>
//   );
// }




import React, { useEffect, useState, useRef } from 'react'
import Paper from '@mui/material/Paper'
import InputBase from '@mui/material/InputBase'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
// import Error from '../error/error'
import Select from 'react-select'
import InputAdornment from '@mui/material/InputAdornment'
import { useSelector } from 'react-redux'

export default function ShadowIconSelect({
  showError,
  apiError,
  errors,
  icon,
  data,
  name,
  width = '100%',
  options,
  label,
  required,
  value,
  defaultValue,
  iconFree,
  onChange,
  disable,
  ...rest
}) {
  // const currentValue = data?.[name] || [{ label: value, value: value }] || [];
  const [selectedValue, setSelectedValue] = useState(value || defaultValue)
  const DarkMode = useSelector(state=>state.data.darkMode)

  console.log(defaultValue, 'defaultValue-----')

  const selectRef = useRef(null)

  const customStyles = {
    // .css-1xc3v61-indicatorContainer
    control: (styles, { isDisabled }) => ({      
      ...styles,
      cursor: isDisabled ? 'not-allowed' : 'default',
      backgroundColor: isDisabled ? '#F1F1F1 ':"white",
      color:"#B0B0B0"
      // Example: backgroundColor: isDisabled ? 'rgba(206, 217, 224, 0.5)' : 'white'
    }),
    
    control: (provided, state) => ({
      ...provided,
      backgroundColor: state.isDisabled ? '#F1F1F1' : '#fff',
      borderColor: state.isDisabled ? '#d3d3d3' : '#9e9e9e',
      color: state.isDisabled ? '#a0a0a0' : '#000',
      minHeight: '30px',
      height: '30px',
      boxShadow: state.isFocused ? null : null,
      cursor: state.isDisabled ? 'not-allowed' : 'default',
    }),

    clearIndicator: (defaultStyles) => ({
      ...defaultStyles,
      padding: 0, // Removes padding from the close (clear) button
    }),
    dropdownIndicator: (defaultStyles) => ({
      ...defaultStyles,
      padding: 0, // Removes padding from the dropdown indicator
      svg: {
        position: 'absolute',
        top: '4px',
        right: '18px',
      },
    }),
    ...(iconFree ? {
      indicatorSeparator: () => ({}),
    } : {}),
  };
  

  useEffect(() => {
    if (value && Object.keys(value).length) {
      setSelectedValue(value)
    } else {
      setSelectedValue([])
    }
  }, [value])

  const handleChange = (selectedOption) => {
    console.log(selectedOption, 'Checking')
    setSelectedValue(selectedOption)
    onChange(selectedOption)
  }
  console.log(DarkMode)

  return (
    <div
      className={`text-start flex-1 relative `}
      style={{ fontSize: '13px', textTransform: 'lowercase' }}
    >
    <label 
  style={{
    color: "rgba(0, 0, 0, 0.38)",
    fontFamily: "Roboto, Helvetica, Arial, sans-serif",
    fontWeight: 400,
    background: `linear-gradient(to bottom, ${DarkMode ? 'transparent' : 'white'} 56%, ${disable ? '#F1F1F1' : 'white'} 50%)`,
    padding: 0,
    margin: 0,
    fontSize: "12px",
    lineHeight: "1.4375em",
    letterSpacing: "0.00938em",
    // padding: 0,
    paddingLeft:"2px",
    paddingRight:"2px",
    position:'absolute',
    top:"-9px",
    left:'13px',
    zIndex:1
  }} 
  className={`${
            DarkMode ? "bg-transparent" : "bg-white"
          } capitalize`}
>
  {label}
</label>
      <Select
      styles={customStyles}
      components={{ IndicatorSeparator:() => null }}
        ref={selectRef}
        sx={{
          display: 'flex',
          alignItems: 'center',
          width: width,
          zIndex:999,
          // height:"30px !important"
        }}
        placeholder={
          <React.Fragment>
            <IconButton sx={{ p: '2px' }} aria-label="menu">
              {' '}
              {icon}{' '}
            </IconButton>{' '}
            <span style={{ fontSize: '12px' }} className="text-nowrap">
              {' '}
            </span>
            <span style={{ color: 'red' }}>{required ? '*' : ''}</span>
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

        // onInputChange={loadOptions}
        // isLoading={isLoading}
      />
      {/* <Error>{showError && apiError}</Error> */}
    </div>
  )
}
