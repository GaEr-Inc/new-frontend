import {
  Avatar,
  Badge,
  Button,
  createStyles,
  Group,
  MultiSelect,
  NativeSelect,
  Select,
  Switch,
  Table,
  Text,
  ThemeIcon,
  useMantineTheme,
} from "@mantine/core";
import { Calendar, DatePicker, isSameDate } from "@mantine/dates";
import { TrashIcon } from "@primer/octicons-react";
import dayjs from "dayjs";
import updateLocale from "dayjs/plugin/updateLocale";
import React, { forwardRef, useEffect, useState } from "react";
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

const useStyles = createStyles((theme) => ({
  weekend: {
    color: `${theme.colors.blue[6]} !important`,
  },
}));

function PrinterManager() {
  const { classes, cx } = useStyles();
  const [values, setValues] = useState<Date[]>([]);
  const [checked, setChecked] = useState<boolean>(false);
  const [oneDayDate, setOneDayDate] = useState<Date>();
  const theme = useMantineTheme();
  const inputFormat = values
    .map((date) => dayjs(date).format("dddd DD MMMM YYYY"))
    .join(", ");
  const [datesWithFormat, setDatesWithFormat] = useState<Date[]>(Array(18));

  const [days, setDays] = useState<day[]>([
    {
      date: "",
      lottery1: "Chontico",
      lottery2: "Noche",
      encerrado: "3000",
      number: 3,
      cost: "500",
      prize: "250000",
      template: "red",
    },
    {
      date: "",
      lottery1: "Bogota",
      lottery2: "Javier",
      encerrado: "3000",
      number: 5,
      cost: "600",
      prize: "260000",
      template: "blue",
    },
    {
      date: "",
      lottery1: "Chontico",
      lottery2: "Noche",
      encerrado: "3000",
      number: 3,
      cost: "500",
      prize: "250000",
      template: "red",
    },
    {
      date: "",
      lottery1: "Bogota",
      lottery2: "Javier",
      encerrado: "3000",
      number: 5,
      cost: "600",
      prize: "260000",
      template: "blue",
    },
    {
      date: "",
      lottery1: "Chontico",
      lottery2: "Noche",
      encerrado: "3000",
      number: 3,
      cost: "500",
      prize: "250000",
      template: "red",
    },
    {
      date: "",
      lottery1: "Bogota",
      lottery2: "Javier",
      encerrado: "3000",
      number: 5,
      cost: "600",
      prize: "260000",
      template: "blue",
    },
    {
      date: "",
      lottery1: "Chontico",
      lottery2: "Noche",
      encerrado: "3000",
      number: 3,
      cost: "500",
      prize: "250000",
      template: "red",
    },
    {
      date: "",
      lottery1: "Bogota",
      lottery2: "Javier",
      encerrado: "3000",
      number: 5,
      cost: "600",
      prize: "260000",
      template: "blue",
    },
    {
      date: "",
      lottery1: "Chontico",
      lottery2: "Noche",
      encerrado: "3000",
      number: 3,
      cost: "500",
      prize: "250000",
      template: "red",
    },
    {
      date: "",
      lottery1: "Bogota",
      lottery2: "Javier",
      encerrado: "3000",
      number: 5,
      cost: "600",
      prize: "260000",
      template: "blue",
    },
    {
      date: "",
      lottery1: "Chontico",
      lottery2: "Noche",
      encerrado: "3000",
      number: 3,
      cost: "500",
      prize: "250000",
      template: "red",
    },
    {
      date: "",
      lottery1: "Bogota",
      lottery2: "Javier",
      encerrado: "3000",
      number: 5,
      cost: "600",
      prize: "260000",
      template: "blue",
    },
    {
      date: "",
      lottery1: "Chontico",
      lottery2: "Noche",
      encerrado: "3000",
      number: 3,
      cost: "500",
      prize: "250000",
      template: "red",
    },
    {
      date: "",
      lottery1: "Bogota",
      lottery2: "Javier",
      encerrado: "3000",
      number: 5,
      cost: "600",
      prize: "260000",
      template: "blue",
    },
    {
      date: "",
      lottery1: "Chontico",
      lottery2: "Noche",
      encerrado: "3000",
      number: 3,
      cost: "500",
      prize: "250000",
      template: "green",
    },
    {
      date: "",
      lottery1: "Bogota",
      lottery2: "Javier",
      encerrado: "3000",
      number: 5,
      cost: "600",
      prize: "260000",
      template: "blue",
    },
    {
      date: "",
      lottery1: "Chontico",
      lottery2: "Noche",
      encerrado: "3000",
      number: 3,
      cost: "500",
      prize: "250000",
      template: "red",
    },
    {
      date: "",
      lottery1: "Bogota",
      lottery2: "Javier",
      encerrado: "3000",
      number: 5,
      cost: "600",
      prize: "260000",
      template: "blue",
    },
  ]);

  useEffect(() => {
    console.log(days);
  }, [days]);

  function template(color: string) {
    switch (color) {
      case "red":
        return (
          <Badge style={{ marginRight: 3 }} color="red" variant="filled">
            Rojo
          </Badge>
        );
      case "green":
        return (
          <Badge style={{ marginInline: 3 }} color="green" variant="filled">
            Verde
          </Badge>
        );
      case "blue":
        return (
          <Badge style={{ marginLeft: 3 }} variant="filled">
            Azul
          </Badge>
        );
    }
  }

  const [day, setDay] = useState<day[]>([
    {
      date: "",
      lottery1: "Bogota",
      lottery2: "Javier",
      encerrado: "3000",
      number: 5,
      cost: "600",
      prize: "260000",
      template: "blue",
    },
  ]);

  const selectData = [
    {
      image: "https://img.icons8.com/clouds/256/000000/futurama-bender.png",
      label: "Bender Bending Rodríguez",
      value: "Bender Bending Rodríguez",
      description: "Fascinated with cooking",
    },

    {
      image: "https://img.icons8.com/clouds/256/000000/futurama-mom.png",
      label: "Carol Miller",
      value: "Carol Miller",
      description: "One of the richest people on Earth",
    },
    {
      image: "https://img.icons8.com/clouds/256/000000/homer-simpson.png",
      label: "Homer Simpson",
      value: "Homer Simpson",
      description: "Overweight, lazy, and often ignorant",
    },
    {
      image:
        "https://img.icons8.com/clouds/256/000000/spongebob-squarepants.png",
      label: "Spongebob Squarepants",
      value: "Spongebob Squarepants",
      description: "Not just a sponge",
    },
    {
      image: "https://img.icons8.com/office/160/000000/jake--v2.png",
      label: "Jake",
      value: "Jake",
      description: "Not just a dog",
    },
  ];

  const rows = checked
    ? days.map((day, index) => (
        <tr key={nanoid()}>
          <td>
            <DatePicker
              transition={"scale-y"}
              minDate={dayjs(new Date()).toDate()}
              placeholder="Fecha de la boleta"
              onChange={(date: Date) => {
                const oldDays = days;
                oldDays[index].date = dayjs(date)
                  .format("dddd DD MMMM YYYY")
                  .toString();
                setDays(oldDays);
                console.log(days);
              }}
              inputFormat={"dddd DD MMMM YYYY"}
              dayClassName={(date, modifiers) =>
                cx({
                  [classes.weekend]: modifiers.weekend,
                })
              }
            />
          </td>
          <td>
            <Select
              placeholder="Seleccionar Plantilla"
              itemComponent={forwardRef(
                ({ image, label, description, ...others }, ref) => (
                  <div ref={ref} {...others}>
                    <Group noWrap>
                      <Avatar src={image} />

                      <div>
                        <Text>{label}</Text>
                        <Text size="xs" color="dimmed">
                          {description}
                        </Text>
                      </div>
                    </Group>
                  </div>
                )
              )}
              data={selectData}
              searchable
              maxDropdownHeight={310}
              nothingFound="Nobody here"
              filter={(value, item) =>
                item.label?.toLowerCase().includes(value.toLowerCase().trim()) ||
                item.description
                  .toLowerCase()
                  .includes(value.toLowerCase().trim())
              }
            />
          </td>
          <td>{day.lottery1}</td>
          <td>{day.lottery2}</td>
          <td>{day.encerrado}</td>
          <td>{day.cost}</td>
          <td>{day.prize}</td>
          <td>{template(day.template)}</td>
        </tr>
      ))
    : day.map((day, index) => (
        <tr key={nanoid()}>
          <td>
            <DatePicker
              transition={"scale-y"}
              minDate={dayjs(new Date()).toDate()}
              placeholder="Fecha de la boleta"
              onChange={(date: Date) => {
                const oldDay = day;
                oldDay.date = dayjs(date)
                  .format("dddd DD MMMM YYYY")
                  .toString();
                setDay([oldDay]);
                setOneDayDate(date);
                console.log(day);
              }}
              inputFormat={"dddd DD MMMM YYYY"}
              value={oneDayDate}
              dayClassName={(date, modifiers) =>
                cx({
                  [classes.weekend]: modifiers.weekend,
                })
              }
            />
          </td>
          <td>
            <Select
              placeholder="Seleccionar Plantilla"
              itemComponent={forwardRef(
                ({ image, label, description, ...others }, ref) => (
                  <div ref={ref} {...others}>
                    <Group noWrap>
                      <Avatar src={image} />

                      <div>
                        <Text>{label}</Text>
                        <Text size="xs" color="dimmed">
                          {description}
                        </Text>
                      </div>
                    </Group>
                  </div>
                )
              )}
              data={selectData}
              searchable
              maxDropdownHeight={310}
              nothingFound="Nobody here"
              filter={(value, item) =>
                item.label?.toLowerCase().includes(value.toLowerCase().trim()) ||
                item.description
                  .toLowerCase()
                  .includes(value.toLowerCase().trim())
              }
            />
          </td>
          <td>{day.lottery1}</td>
          <td>{day.lottery2}</td>
          <td>{day.encerrado}</td>
          <td>{day.cost}</td>
          <td>{day.prize}</td>
          <td>{template(day.template)}</td>
        </tr>
      ));

  return (
    <div>
      <Switch
        label="<-- Cantidad de días a Imprimir"
        onLabel="⠀18"
        offLabel="01"
        checked={checked}
        size="lg"
        onChange={(event) => setChecked(event.currentTarget.checked)}
      />
      <Table highlightOnHover>
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
      <Button onClick={() => console.log(JSON.parse(localStorage.getItem("saves") || "[]"))}>Imprimir plantillas</Button>
    </div>
  );
}

export default PrinterManager;
