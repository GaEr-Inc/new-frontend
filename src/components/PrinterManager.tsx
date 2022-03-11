import {
  Affix,
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
  Transition,
  useMantineTheme,
} from "@mantine/core";
import { Calendar, DatePicker, isSameDate } from "@mantine/dates";
import { ArchiveIcon, ArrowUpIcon, TrashIcon } from "@primer/octicons-react";
import dayjs from "dayjs";
import updateLocale from "dayjs/plugin/updateLocale";
import React, { forwardRef, useEffect, useState } from "react";
import { nanoid } from "nanoid";
import _ from "lodash";
import { useNotifications } from "@mantine/notifications";
import { template } from "./TemplateEditor";
import { useForm } from "@mantine/hooks";
import lodash from "lodash";
import { send1ToPrint } from "../utils/requests";

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
interface ItemProps extends React.ComponentPropsWithoutRef<"div"> {
  image: string;
  label: string;
  description: string;
}

const SelectItem = forwardRef<HTMLDivElement, ItemProps>(
  ({ image, label, description, ...others }: ItemProps, ref) => (
    <div ref={ref} {...others}>
      <Group noWrap>
        <Avatar src={image} />

        <div>
          <Text size="sm">{label}</Text>
          <Text size="xs" color="dimmed">
            {description}
          </Text>
        </div>
      </Group>
    </div>
  )
);

function PrinterManager() {
  const { classes, cx } = useStyles();
  const [values, setValues] = useState<Date[]>([]);
  const [checked, setChecked] = useState<boolean>(false);
  const [oneDayDate, setOneDayDate] = useState<Date>();
  const [templateSaves, setTemplateSaves] = useState<template[]>(
    JSON.parse(localStorage.getItem("saves") || "[]")
  );
  const theme = useMantineTheme();
  const notifications = useNotifications();
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
      template: "",
    },
    {
      date: "",
      lottery1: "Bogota",
      lottery2: "Javier",
      encerrado: "3000",
      number: 5,
      cost: "600",
      prize: "260000",
      template: "",
    },
    {
      date: "",
      lottery1: "Chontico",
      lottery2: "Noche",
      encerrado: "3000",
      number: 3,
      cost: "500",
      prize: "250000",
      template: "",
    },
    {
      date: "",
      lottery1: "Bogota",
      lottery2: "Javier",
      encerrado: "3000",
      number: 5,
      cost: "600",
      prize: "260000",
      template: "",
    },
    {
      date: "",
      lottery1: "Chontico",
      lottery2: "Noche",
      encerrado: "3000",
      number: 3,
      cost: "500",
      prize: "250000",
      template: "",
    },
    {
      date: "",
      lottery1: "Bogota",
      lottery2: "Javier",
      encerrado: "3000",
      number: 5,
      cost: "600",
      prize: "260000",
      template: "",
    },
    {
      date: "",
      lottery1: "Chontico",
      lottery2: "Noche",
      encerrado: "3000",
      number: 3,
      cost: "500",
      prize: "250000",
      template: "",
    },
    {
      date: "",
      lottery1: "Bogota",
      lottery2: "Javier",
      encerrado: "3000",
      number: 5,
      cost: "600",
      prize: "260000",
      template: "",
    },
    {
      date: "",
      lottery1: "Chontico",
      lottery2: "Noche",
      encerrado: "3000",
      number: 3,
      cost: "500",
      prize: "250000",
      template: "",
    },
    {
      date: "",
      lottery1: "Bogota",
      lottery2: "Javier",
      encerrado: "3000",
      number: 5,
      cost: "600",
      prize: "260000",
      template: "",
    },
    {
      date: "",
      lottery1: "Chontico",
      lottery2: "Noche",
      encerrado: "3000",
      number: 3,
      cost: "500",
      prize: "250000",
      template: "",
    },
    {
      date: "",
      lottery1: "Bogota",
      lottery2: "Javier",
      encerrado: "3000",
      number: 5,
      cost: "600",
      prize: "260000",
      template: "",
    },
    {
      date: "",
      lottery1: "Chontico",
      lottery2: "Noche",
      encerrado: "3000",
      number: 3,
      cost: "500",
      prize: "250000",
      template: "",
    },
    {
      date: "",
      lottery1: "Bogota",
      lottery2: "Javier",
      encerrado: "3000",
      number: 5,
      cost: "600",
      prize: "260000",
      template: "",
    },
    {
      date: "",
      lottery1: "Chontico",
      lottery2: "Noche",
      encerrado: "3000",
      number: 3,
      cost: "500",
      prize: "250000",
      template: "",
    },
    {
      date: "",
      lottery1: "Bogota",
      lottery2: "Javier",
      encerrado: "3000",
      number: 5,
      cost: "600",
      prize: "260000",
      template: "",
    },
    {
      date: "",
      lottery1: "Chontico",
      lottery2: "Noche",
      encerrado: "3000",
      number: 3,
      cost: "500",
      prize: "250000",
      template: "",
    },
    {
      date: "",
      lottery1: "Bogota",
      lottery2: "Javier",
      encerrado: "3000",
      number: 5,
      cost: "600",
      prize: "260000",
      template: "",
    },
  ]);

  useEffect(() => {
    console.log(days);
  }, [days]);

  const oneForm = useForm({
    initialValues: {
      date: "",
      lottery1: "",
      lottery2: "",
      encerrado: "",
      number: 5,
      cost: "",
      prize: "",
      template: "",
    },
    validationRules: {
      date: (value) => value.length > 0 && !(value==="Invalid Date"),
      lottery1: (value) => value.length > 0,
      lottery2: (value) => value.length > 0,
      encerrado: (value) => value.length > 0,
      cost: (value) => value.length > 0,
      prize: (value) => value.length > 0,
      template: (value) => value.length > 0,
    },
    errorMessages: {
      date: "Debe seleccionar una fecha",
      lottery1: "Debe seleccionar una plantilla",
      lottery2: "Debe seleccionar una plantilla",
      encerrado: "Debe seleccionar una plantilla",
      number: 5,
      cost: "Debe seleccionar una plantilla",
      prize: "Debe seleccionar una plantilla",
      template: "Debe seleccionar una plantilla",
    },
  });

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
              clearable
              placeholder="Pick one"
              itemComponent={SelectItem}
              data={templateSaves}
              searchable
              maxDropdownHeight={400}
              nothingFound="Nobody here"
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
              {...oneForm.getInputProps("date")}
              transition={"scale-y"}
              minDate={dayjs(new Date()).toDate()}
              placeholder="Fecha de la boleta"
              onChange={(date: Date) => {
                const oldDay = day;
                oldDay.date = dayjs(date)
                  .format("DD MMMM YYYY")
                  .toString();
                setDay([oldDay]);
                setOneDayDate(date);
                oneForm.setFieldValue("date", oldDay.date);
              }}
              inputFormat={"DD MMMM YYYY"}
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
              onChange={(v) => {
                const selectedTemplate = lodash.filter(
                  templateSaves,
                  (o) => o.value === v
                )[0];
                console.log(selectedTemplate);
                oneForm.setFieldValue("lottery1", selectedTemplate.lottery1);
                oneForm.setFieldValue("lottery2", selectedTemplate.lottery2);
                oneForm.setFieldValue("encerrado", selectedTemplate.encerrado);
                oneForm.setFieldValue("cost", selectedTemplate.price);
                oneForm.setFieldValue("prize", selectedTemplate.prize);
                oneForm.setFieldValue("template", selectedTemplate.color);
              }}
              clearable
              placeholder="Seleccionar Plantilla"
              itemComponent={SelectItem}
              data={templateSaves}
              searchable
              maxDropdownHeight={200}
              nothingFound="Nobody here"
            />
          </td>
          <td {...oneForm.getInputProps("lottery1")}>
            {oneForm.values.lottery1}
          </td>
          <td {...oneForm.getInputProps("lottery2")}>
            {oneForm.values.lottery2}
          </td>
          <td {...oneForm.getInputProps("encerrado")}>
            {oneForm.values.encerrado}
          </td>
          <td {...oneForm.getInputProps("cost")}>{oneForm.values.cost}</td>
          <td {...oneForm.getInputProps("prize")}>{oneForm.values.prize}</td>
          <td {...oneForm.getInputProps("template")}>
            {template(oneForm.values.template)}
          </td>
          <Affix position={{ bottom: 20, right: 20 }}>
            <Button
              type="submit"
              onClick={() =>
                oneForm.validate()
                  ? send1ToPrint(oneForm.values)
                  : console.log("no se puede")
              }
              leftIcon={<ArchiveIcon />}
            >
              Imprimir
            </Button>
          </Affix>
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
      <Button
        onClick={() => {
          console.log(JSON.parse(localStorage.getItem("saves") || "[]"));
          console.log(oneForm.values);
        }}
      >
        Imprimir plantillas
      </Button>
    </div>
  );
}

export default PrinterManager;
