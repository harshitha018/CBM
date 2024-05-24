import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Error from "../error/Error";
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
 
export default function ShadowIconInput({ showError, apiError, errors, data, icon, label, type, width = "100%", value, onChange = () => { }, required, name, disabled }) {
    const currentValue = data?.[name] || value || ""
    const error = apiError || (showError && errors[name])
    return (
    <div className='text-start flex-1'>
         <TextField
            fullWidth={true}
            size="small"
            type={(type)?type:'text'}
            disabled={disabled?disabled:false}
            sx={{
                fontSize: '12px', // Set font size for input text
                display: 'flex',
                alignItems: 'center',
                '& .MuiInputBase-input' : {
                  fontSize: '12px',
                  fontWeight: '500',
                  paddingTop:'10px',
                  paddingBottom:'10px'
                },
                '& .MuiInputBase-input::placeholder': { // Apply styles to placeholder
                  fontSize: '12px', // Adjust placeholder font size here
                  fontWeight: '500'
                }
              }}
            placeholder={label}
            inputProps={{ 'aria-label': name }}
            value={currentValue}
            onChange={onChange}
            name={name}
            InputProps={{
                startAdornment: <InputAdornment position="start">{icon}</InputAdornment>,
                endAdornment: <React.Fragment><Divider sx={{ height: 20, m: 0.5 }} orientation="vertical" />
                <span style={{ color: 'red',}}>{required ? '*' : ''}</span></React.Fragment>
            }}
        />
        <Error>{error}</Error>
    </div>
  );
}