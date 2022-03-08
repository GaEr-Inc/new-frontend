import { Button, Switch, Table, useMantineTheme } from "@mantine/core";
import { Calendar, DatePicker, isSameDate } from "@mantine/dates";
import dayjs from "dayjs";
import updateLocale from "dayjs/plugin/updateLocale"
import React, { useState } from "react";

dayjs.extend(updateLocale)

dayjs.updateLocale('en', {
  weekdays: [
    "Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"
  ],
  months: [
    "de Enero del", "de Febrero del", "de Marzo del", "de Abril del", "de Mayo del", "de Junio del", "de Julio del",
    "de Agosto del", "de Septiembre del", "de Octubre del", "de Noviembre del", "de Diciembre del"
  ]
})

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
    .map((date) => dayjs(date).format("dddd DD MMMM YYYY"))
    .join(", ");
  const datesWithFormat = inputFormat.split(",");
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
      date: datesWithFormat[0],
      lottery1: "Chontico",
      lottery2: "Noche",
      encerrado: "3000",
      number: 3,
      cost: "500",
      prize: "250000",
      template: "red",
    },
    {
      date: datesWithFormat[1],
      lottery1: "Bogota",
      lottery2: "Javier",
      encerrado: "3000",
      number: 5,
      cost: "600",
      prize: "260000",
      template: "blue",
    },
    {
      date: datesWithFormat[2],
      lottery1: "Chontico",
      lottery2: "Noche",
      encerrado: "3000",
      number: 3,
      cost: "500",
      prize: "250000",
      template: "red",
    },
    {
      date: datesWithFormat[3],
      lottery1: "Bogota",
      lottery2: "Javier",
      encerrado: "3000",
      number: 5,
      cost: "600",
      prize: "260000",
      template: "blue",
    },
    {
      date: datesWithFormat[4],
      lottery1: "Chontico",
      lottery2: "Noche",
      encerrado: "3000",
      number: 3,
      cost: "500",
      prize: "250000",
      template: "red",
    },
    {
      date: datesWithFormat[5],
      lottery1: "Bogota",
      lottery2: "Javier",
      encerrado: "3000",
      number: 5,
      cost: "600",
      prize: "260000",
      template: "blue",
    },
    {
      date: datesWithFormat[6],
      lottery1: "Chontico",
      lottery2: "Noche",
      encerrado: "3000",
      number: 3,
      cost: "500",
      prize: "250000",
      template: "red",
    },
    {
      date: datesWithFormat[7],
      lottery1: "Bogota",
      lottery2: "Javier",
      encerrado: "3000",
      number: 5,
      cost: "600",
      prize: "260000",
      template: "blue",
    },
    {
      date: datesWithFormat[8],
      lottery1: "Chontico",
      lottery2: "Noche",
      encerrado: "3000",
      number: 3,
      cost: "500",
      prize: "250000",
      template: "red",
    },
    {
      date: datesWithFormat[9],
      lottery1: "Bogota",
      lottery2: "Javier",
      encerrado: "3000",
      number: 5,
      cost: "600",
      prize: "260000",
      template: "blue",
    },
    {
      date: datesWithFormat[10],
      lottery1: "Chontico",
      lottery2: "Noche",
      encerrado: "3000",
      number: 3,
      cost: "500",
      prize: "250000",
      template: "red",
    },
    {
      date: datesWithFormat[11],
      lottery1: "Bogota",
      lottery2: "Javier",
      encerrado: "3000",
      number: 5,
      cost: "600",
      prize: "260000",
      template: "blue",
    },
    {
      date: datesWithFormat[12],
      lottery1: "Chontico",
      lottery2: "Noche",
      encerrado: "3000",
      number: 3,
      cost: "500",
      prize: "250000",
      template: "red",
    },
    {
      date: datesWithFormat[13],
      lottery1: "Bogota",
      lottery2: "Javier",
      encerrado: "3000",
      number: 5,
      cost: "600",
      prize: "260000",
      template: "blue",
    },
    {
      date: datesWithFormat[14],
      lottery1: "Chontico",
      lottery2: "Noche",
      encerrado: "3000",
      number: 3,
      cost: "500",
      prize: "250000",
      template: "red",
    },
    {
      date: datesWithFormat[15],
      lottery1: "Bogota",
      lottery2: "Javier",
      encerrado: "3000",
      number: 5,
      cost: "600",
      prize: "260000",
      template: "blue",
    },
    {
      date: datesWithFormat[16],
      lottery1: "Chontico",
      lottery2: "Noche",
      encerrado: "3000",
      number: 3,
      cost: "500",
      prize: "250000",
      template: "red",
    },
    {
      date: datesWithFormat[17],
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
      <Button onClick={() => console.log(datesWithFormat)}>Imprimir dates</Button>
    </div>
  );
}

export default PrinterManager;
