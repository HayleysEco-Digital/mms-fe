import React, { useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';

const DatePickerComp = ({onDateSelect, value}) => {
  const [startDate, setStartDate] = useState(new Date());

  const handleDateChange = (date) => {
    setStartDate(date);
    onDateSelect(date);
  }
  return (
    <DatePicker className="form-control" selected={startDate} onChange={handleDateChange} dateFormat="yyyy-MM-dd"/>
  );
};

export default DatePickerComp;