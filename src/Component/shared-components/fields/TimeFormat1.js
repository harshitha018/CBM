import * as React from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { renderTimeViewClock } from "@mui/x-date-pickers/timeViewRenderers";
import dayjs from "dayjs";
import "./timePicker.css";
import { useSelector } from 'react-redux'

export default function TimeInputSelect({ onChange, value, isDisabled }) {
  // Convert the stored time string to a Day.js object
  const DarkMode = useSelector(state=>state.data.darkMode)
  const initialTime = dayjs(value || '00:00:00.000', 'HH:mm:ss.SSS');
  const [time, setTime] = React.useState(initialTime);

  console.log(initialTime)

  const onChangeTime = (newTime) => {
    setTime(newTime);
    if (onChange) {
      onChange(newTime?.$d);
    }
  };

  React.useEffect(() => {
    if (value) {
      console.log(value)
      setTime(dayjs(value, 'HH:mm:ss.SSS'));
    } else {
      console.log(value)
      setTime(dayjs('00:00:00.000', 'HH:mm:ss.SSS'));
    }
  }, [value]);

  return (
    <div className="time-container h-full relative" style={{ paddingTop: 0 }}>
        <label 
  style={{
    color: "rgba(0, 0, 0, 0.38)",
    fontFamily: "Roboto, Helvetica, Arial, sans-serif",
    fontWeight: 400,
    fontSize: "12px",
    lineHeight: "1.4375em",
    letterSpacing: "0.00938em",
    padding: 0,
    position:'absolute',
    top:"-9px",
    left:'13px',
    zIndex:1
  }} 
  className={`${
            DarkMode ? "bg-transparent" : "bg-white"
          } capitalize`}
>
  Time
</label>
      <LocalizationProvider dateAdapter={AdapterDayjs} style={{ paddingTop: 0 }}>
        <DemoContainer components={["TimePicker"]}>
          <TimePicker
          // label="Time"
            disabled={isDisabled}
            value={time}
            sx={{
              backgroundColor:"white",
              '& .MuiOutlinedInput-root': {
                padding: "0px",
                height: "32px"
              },
            }}
            onChange={onChangeTime}
            format="HH:mm"
            ampm={false}  // to give 24 hr format
            viewRenderers={{
              hours: renderTimeViewClock,
              minutes: renderTimeViewClock,
              seconds: renderTimeViewClock,
            }}
          />
          {/* <TimePicker  label="time" name="startTime" /> */}
        </DemoContainer>
      </LocalizationProvider>
    </div>
  );
}
