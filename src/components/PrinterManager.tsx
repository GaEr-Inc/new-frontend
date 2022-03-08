import { Button, Switch, Table, useMantineTheme } from "@mantine/core";
import { Calendar, DatePicker, isSameDate } from "@mantine/dates";
import dayjs from "dayjs";
import React, { useState } from "react";

export interface day {
  date: string;
  lottery1: string;
  lottery2: string;
  encerrado: string;
  number: number;
  cost: string;
  prize: string;
  template: string;
}

function PrinterManager() {
  const [values, setValues] = useState<Date[]>([]);
  const [checked, setChecked] = useState<boolean>(false);
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

  const days: day[] = [
    {
      date: "22 Febrero 2022",
      lottery1: "Chontico",
      lottery2: "Noche",
      encerrado: "3000",
      number: 3,
      cost: "500",
      prize: "250000",
      template: "red",
    },
    {
      date: "23 Febrero 2022",
      lottery1: "Bogota",
      lottery2: "Javier",
      encerrado: "3000",
      number: 5,
      cost: "600",
      prize: "260000",
      template: "blue",
    },
    {
      date: "24 Febrero 2022",
      lottery1: "Chontico",
      lottery2: "Noche",
      encerrado: "3000",
      number: 3,
      cost: "500",
      prize: "250000",
      template: "red",
    },
    {
      date: "25 Febrero 2022",
      lottery1: "Bogota",
      lottery2: "Javier",
      encerrado: "3000",
      number: 5,
      cost: "600",
      prize: "260000",
      template: "blue",
    },
    {
      date: "26 Febrero 2022",
      lottery1: "Chontico",
      lottery2: "Noche",
      encerrado: "3000",
      number: 3,
      cost: "500",
      prize: "250000",
      template: "red",
    },
    {
      date: "27 Febrero 2022",
      lottery1: "Bogota",
      lottery2: "Javier",
      encerrado: "3000",
      number: 5,
      cost: "600",
      prize: "260000",
      template: "blue",
    },
    {
      date: "28 Febrero 2022",
      lottery1: "Chontico",
      lottery2: "Noche",
      encerrado: "3000",
      number: 3,
      cost: "500",
      prize: "250000",
      template: "red",
    },
    {
      date: "29 Febrero 2022",
      lottery1: "Bogota",
      lottery2: "Javier",
      encerrado: "3000",
      number: 5,
      cost: "600",
      prize: "260000",
      template: "blue",
    },
    {
      date: "30 Febrero 2022",
      lottery1: "Chontico",
      lottery2: "Noche",
      encerrado: "3000",
      number: 3,
      cost: "500",
      prize: "250000",
      template: "red",
    },
    {
      date: "31 Febrero 2022",
      lottery1: "Bogota",
      lottery2: "Javier",
      encerrado: "3000",
      number: 5,
      cost: "600",
      prize: "260000",
      template: "blue",
    },
    {
      date: "32 Febrero 2022",
      lottery1: "Chontico",
      lottery2: "Noche",
      encerrado: "3000",
      number: 3,
      cost: "500",
      prize: "250000",
      template: "red",
    },
    {
      date: "33 Febrero 2022",
      lottery1: "Bogota",
      lottery2: "Javier",
      encerrado: "3000",
      number: 5,
      cost: "600",
      prize: "260000",
      template: "blue",
    },
    {
      date: "34 Febrero 2022",
      lottery1: "Chontico",
      lottery2: "Noche",
      encerrado: "3000",
      number: 3,
      cost: "500",
      prize: "250000",
      template: "red",
    },
    {
      date: "35 Febrero 2022",
      lottery1: "Bogota",
      lottery2: "Javier",
      encerrado: "3000",
      number: 5,
      cost: "600",
      prize: "260000",
      template: "blue",
    },
    {
      date: "36 Febrero 2022",
      lottery1: "Chontico",
      lottery2: "Noche",
      encerrado: "3000",
      number: 3,
      cost: "500",
      prize: "250000",
      template: "red",
    },
    {
      date: "37 Febrero 2022",
      lottery1: "Bogota",
      lottery2: "Javier",
      encerrado: "3000",
      number: 5,
      cost: "600",
      prize: "260000",
      template: "blue",
    },
    {
      date: "38 Febrero 2022",
      lottery1: "Chontico",
      lottery2: "Noche",
      encerrado: "3000",
      number: 3,
      cost: "500",
      prize: "250000",
      template: "red",
    },
    {
      date: "39 Febrero 2022",
      lottery1: "Bogota",
      lottery2: "Javier",
      encerrado: "3000",
      number: 5,
      cost: "600",
      prize: "260000",
      template: "blue",
    },
  ];

  const day: day[] = [
    {
      date: "33 Febrero 2022",
      lottery1: "Bogota",
      lottery2: "Javier",
      encerrado: "3000",
      number: 5,
      cost: "600",
      prize: "260000",
      template: "blue",
    },
  ];

  const rows = checked
    ? days.map((day) => (
        <tr key={day.date}>
          <td>{day.date}</td>
          <td>{day.lottery1}</td>
          <td>{day.lottery2}</td>
          <td>{day.encerrado}</td>
          <td>{day.cost}</td>
          <td>{day.prize}</td>
          <td>{day.template}</td>
        </tr>
      ))
    : day.map((day) => (
        <tr key={day.date}>
          <td>{day.date}</td>
          <td>{day.lottery1}</td>
          <td>{day.lottery2}</td>
          <td>{day.encerrado}</td>
          <td>{day.cost}</td>
          <td>{day.prize}</td>
          <td>{day.template}</td>
        </tr>
      ));

  return (
    <div>
      <DatePicker
        minDate={dayjs(new Date()).toDate()}
        placeholder="Pick multiple days"
        closeCalendarOnChange={true}
        // inputFormat={inputFormat}
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
      <Switch
        checked={checked}
        size="md"
        onChange={(event) => setChecked(event.currentTarget.checked)}
      />
      <Table>
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Parte 1</th>
            <th>Parte 2</th>
            <th>Encerrado</th>
            <th>Precio</th>
            <th>Premio</th>
            <th>Color</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
      <Button onClick={() => console.log(rows.length)}>Imprimir dates</Button>
    </div>
  );
}

export default PrinterManager;
