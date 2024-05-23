// import * as React from "react";
// import TextField from "@mui/material/TextField";
// import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
// import InputAdornment from "@mui/material/InputAdornment";
// import { IconButton } from "@mui/material";

// import time_i from "../../assets/icons/form/time.svg";
// import { createTheme, ThemeProvider } from "@mui/material/styles";
// const theme = createTheme({
//   components: {
//     MuiTextField: {
//       styleOverrides: {
//         root: {
//           "& .MuiInputBase-input": {
//             fontSize: "12px",
//           },
//         },
//       },
//     },
//   },
// });

// export default function TextSelect({
//   initialOptions,
//   background,
//   showTime,
//   icon,
//   label,
//   required,
//   value: val,
//   onChange,
// }) {
//   // const [value, setValue] = React.useState(initialOptions?.[0] || "");
//   const [value, setValue] = React.useState(val || "");
//   const filter = createFilterOptions();

//   React.useEffect(() => {
//     setValue(val);
//   }, [val]);
//   console.log(label);
//   return (
//     <ThemeProvider theme={theme}>
//       <Autocomplete
//         value={value}
//         size="small"
//         onChange={(event, newValue) => {
//           if (typeof newValue === "string") {
//             setValue({
//               value: newValue,
//             });
//           } else if (newValue && newValue?.inputValue) {
//             // Create a new value from the user input
//             setValue({
//               value: newValue.inputValue,
//             });
//             onChange(newValue.inputValue);
//           } else {
//             setValue(newValue);
//           }
//         }}
//         filterOptions={(options, params) => {
//           if (!options || !params) {
//             return []; // Return an empty array if options or params are undefined
//           }

//           const filtered = filter(options, params);

//           const { inputValue } = params;
//           // Suggest the creation of a new value
//           const isExisting = options?.some(
//             (option) => inputValue === option?.value
//           );
//           if (inputValue !== "" && !isExisting) {
//             filtered?.push({
//               inputValue,
//               value: `Add "${inputValue}"`,
//             });
//           }

//           return filtered;
//         }}
//         selectOnFocus
//         clearOnBlur
//         handleHomeEndKeys
//         id="free-solo-with-text-demo"
//         options={initialOptions ? initialOptions : []}
//         getOptionLabel={(option) => {
//           // Value selected with enter, right from the input
//           if (typeof option === "string") {
//             return option;
//           }
//           // Add "xxx" option created dynamically
//           if (option.inputValue) {
//             return option.inputValue;
//           }
//           // Regular option
//           return option.value;
//         }}
//         renderOption={(props, option) => <li {...props}>{option.value}</li>}
//         // sx={{ width: 300 }}
//         freeSolo
//         renderInput={(params) => (
//           <TextField
//             id="icon-text-field"
//             {...params}
//             size="small"
//             sx={{
//               display: "inline-block",
//               fontSize: "8px",
//               backgroundColor: background ? background : "white",
//             }}
//             InputProps={{
//               ...params.InputProps,
//               startAdornment: (
//                 <>
//                   <InputAdornment position="start">
//                     <img src={time_i} width="15px" height="15px" />
//                   </InputAdornment>
//                 </>
//               ),
//             }}
//             variant="outlined"
//             placeholder="Flight Time"
//           />
//         )}
//       />
//     </ThemeProvider>
//   );
// }
