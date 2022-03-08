import { Button, useMantineTheme } from "@mantine/core";
import { Calendar, DatePicker, isSameDate } from "@mantine/dates";
import dayjs from "dayjs";
import React, { useState } from "react";

function PrinterManager() {
  const [values, setValues] = useState<Date[]>([]);
  const strValues = values.map.toString();
  const theme = useMantineTheme();
  const inputFormat = values
    .map((date) => dayjs(date).format("DD/MM/YY"))
    .join(", ");
  const dayStyle = (date: Date) => {
    if (values.some((day) => isSameDate(date, day))) {
      return {
        backgroundColor: theme.colors.blue[0],
        color: theme.colors.blue[9],
      };
    }
    return {};
  };

  const handleDayPick = (value: Date) => {
    setValues((current) => {
      if (current.some((day) => isSameDate(value, day))) {
        return current.filter((day) => !isSameDate(value, day));
      }
      return values.length < 18 ? [...current, value] : values;
    });
  };
  return (
    <div>
      <DatePicker
        minDate={dayjs(new Date()).toDate()}
        placeholder="Pick multiple days"
        closeCalendarOnChange={false}
        inputFormat={inputFormat}
        value={values.length > 0 ? values[0] : null}
        onChange={handleDayPick}
        dayStyle={dayStyle}
        multiline
        styles={{
          selected: {
            backgroundColor: "transparent",
            color: "unset",
          },
        }}
      />
      <Button onClick={()=>console.log()}>Imprimir dates</Button>
    </div>
  );
}

export default PrinterManager;
