import { useEffect, useState } from 'react';
import TimePicker from 'react-time-picker';
import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css';
import styled from 'styled-components';

const CustomTimePicker = styled(TimePicker)`
  .react-time-picker__wrapper {
    width:"60px";
    border: 0.5px solid lightgray; /* Custom border color */
    border-radius: 5px; /* Custom border radius */
    padding: 5px; /* Custom padding */
  }

  .react-time-picker__clock {
    color: lightgray;
  }

  .react-time-picker__button {
    color: lightgray;
  }
`;

export default function TimeInput({ onChange, value, disabled=false }) {
  const [val, setVal] = useState(value || '00:00');

  const onChangeTime = (time) => {
    console.log(time)
    setVal(time);
    if (onChange) {
      onChange(time);
    }
  };

  useEffect(() => {
    if (value && Object.keys(value).length) {
      setVal(value)
    } else {
        setVal([])
    }
  }, [value])
  console.log(val)

  return (
    <div className='w-["60px"]'>
   <CustomTimePicker  disabled={disabled} onChange={onChangeTime} format='HH:mm' value={val} />
    </div>

  
  );
}
