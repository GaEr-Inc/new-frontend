import {
  Button,
  Switch,
  Table,
  ThemeIcon,
  useMantineTheme,
} from "@mantine/core";
import { Calendar, DatePicker, isSameDate } from "@mantine/dates";
import { TrashIcon } from "@primer/octicons-react";
import dayjs from "dayjs";
import updateLocale from "dayjs/plugin/updateLocale";
import React, { useState } from "react";
import { nanoid } from "nanoid";

dayjs.extend(updateLocale);

dayjs.updateLocale("en", {
  weekdays: [
    "Domingo",
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
  ],
  months: [
    "de Enero de",
    "de Febrero de",
    "de Marzo de",
    "de Abril de",
    "de Mayo de",
    "de Junio de",
    "de Julio de",
    "de Agosto de",
    "de Septiembre de",
    "de Octubre de",
    "de Noviembre de",
    "de Diciembre de",
  ],
});

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
  const [oneDayDate, setOneDayDate] = useState<Date>();
  const theme = useMantineTheme();
  const inputFormat = values
    .map((date) => dayjs(date).format("dddd DD MMMM YYYY"))
    .join(", ");
  const datesWithFormat = inputFormat.split(",");

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
      date: dayjs(oneDayDate).format("dddd DD MMMM YYYY").toString(),
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
        <tr key={nanoid()}>
          <td>{day.date}</td>
          <td>
            <DatePicker
              minDate={dayjs(new Date()).toDate()}
              placeholder="Pick multiple days"
              clearable={false}
              // value={values.length > 0 ? values[0] : null}
              // onChange={handleDayPick}
            />
            <ThemeIcon
              style={{ marginInline: 5 }}
              onClick={() => console.log("holi")}
              radius={10}
            >
              <TrashIcon />
            </ThemeIcon>
          </td>
          <td>{day.lottery1}</td>
          <td>{day.lottery2}</td>
          <td>{day.encerrado}</td>
          <td>{day.cost}</td>
          <td>{day.prize}</td>
          <td>{day.template}</td>
        </tr>
      ))
    : day.map((day, index) => (
        <tr key={nanoid()}>
          <td>
            <DatePicker
              minDate={dayjs(new Date()).toDate()}
              placeholder="Fecha de la boleta"
              onChange={(date: Date) => setOneDayDate(date)}
              inputFormat={"dddd DD MMMM YYYY"}
              value={oneDayDate}
            />
          </td>
          <td>
            <ThemeIcon
              style={{ marginInline: 5 }}
              onClick={() => console.log("holi")}
              radius={10}
            >
              <TrashIcon />
            </ThemeIcon>
          </td>
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
      <Switch
        checked={checked}
        size="md"
        onChange={(event) => setChecked(event.currentTarget.checked)}
      />
      <Table>
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Plantilla</th>
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
      <Button
        onClick={() =>
          console.log(dayjs(oneDayDate).format("dddd DD MMMM YYYY").toString())
        }
      >
        Imprimir dates
      </Button>
    </div>
  );
}

export default PrinterManager;
