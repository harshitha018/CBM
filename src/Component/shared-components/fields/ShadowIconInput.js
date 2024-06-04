import * as React from 'react'
import Paper from '@mui/material/Paper'
import InputBase from '@mui/material/InputBase'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
// import Error from '../error/error'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'

export default function ShadowIconInput({
  showError,
  apiError,
  errors,
  data,
  icon,
  label,
  type,
  width = '100%',
  value,
  onChange = () => {},
  required,
  name,
  disabled,
  backgroundColor = "white",
  maxWidth,
  typeError
}) {
  let currentValue = data?.[name] || value || ''
  currentValue = value !== 0 ? currentValue : 0
  const error = apiError || (showError && errors[name])
  return (
    <div className="text-start flex-1" style={{width:maxWidth}}>
      <TextField
        fullWidth={true}
        label={label}
        size="small"
        type={type ? type : 'text'}
        disabled={disabled ? disabled : false}
        sx={{
          fontSize: '12px', // Set font size for input text
          display: 'flex',
          alignItems: 'center',
          // '& .MuiFormControl-fullWidth':{
          //   width:"230px"
          // },
          '& .MuiOutlinedInput-root':{
              height:"32px"
          },
          '& .MuiInputBase-input': {
            fontSize: '12px',
            fontWeight: '500',
            // width:"200px",
            paddingTop: '10px',
            paddingBottom: '10px',
            // background:backgroundColor
          },
          '& .MuiInputBase-input::placeholder': {
            // Apply styles to placeholder
            fontSize: '12px', // Adjust placeholder font size here
            fontWeight: '500',
            // background:backgroundColor
          },
          "& .MuiInputBase-root.Mui-disabled": {
      backgroundColor: "#F1F1F1", // (default alpha is 0.38)
      color:"#B0B0B0"
    }
        }}
        // placeholder={label}
        inputProps={{ 'aria-label': name }}
        value={currentValue}
        // style={{backGround:backgroundColor}}
        onChange={onChange}
        name={name}
        InputProps={{
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
      {/* <Paper
        component="form"
        sx={{ p: '2px 2px', display: 'flex', alignItems: 'center', width: width }}
        >
        <IconButton sx={{ p: '2px' }} aria-label="menu">
            {icon}
        </IconButton>
        <InputBase
            type={(type)?type:'text'}
            sx={{ ml: 1, flex: 1, fontSize:'12px' }}
            placeholder={label}
            inputProps={{ 'aria-label': name }}
            value={currentValue}
            onChange={onChange}
            name={name}
        />
        
        <Divider sx={{ height: 20, m: 0.5 }} orientation="vertical" />
        <span style={{ color: 'red',}}>{required ? '*' : ''}</span>
        </Paper> */}
      {/* <Error>{error}</Error> */}
      {/* {typeError ?<div className='text-xs text-red-500'>{typeError}</div> : null} */}
    </div>
  )
}
