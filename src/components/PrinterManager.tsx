import {
  Affix,
  Alert,
  Avatar,
  Badge,
  Button,
  createStyles,
  Group,
  Modal,
  MultiSelect,
  NativeSelect,
  Select,
  SelectChevronIcon,
  Switch,
  Table,
  Text,
  ThemeIcon,
  Transition,
  useMantineTheme,
} from "@mantine/core";
import { Calendar, DatePicker, isSameDate } from "@mantine/dates";
import {
  ArchiveIcon,
  ArrowUpIcon,
  CheckIcon,
  TrashIcon,
} from "@primer/octicons-react";
import dayjs from "dayjs";
import updateLocale from "dayjs/plugin/updateLocale";
import React, { forwardRef, useEffect, useState } from "react";
import { nanoid } from "nanoid";
import _ from "lodash";
import { useNotifications } from "@mantine/notifications";
import { template } from "./TemplateEditor";
import {
  useDidUpdate,
  useForceUpdate,
  useForm,
  useInterval,
  useSetState,
} from "@mantine/hooks";
import lodash from "lodash";
import { send18ToPrint, send1ToPrint, updateAll } from "../utils/requests";
import { useSelector } from "@agile-ts/react";
import { AlertIcon, InfoIcon } from "@primer/octicons-react";

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
  const forceUpdate = useForceUpdate();
  const { classes, cx } = useStyles();
  const [checked, setChecked] = useState<boolean>(false);
  const [oneDayDate, setOneDayDate] = useState<Date>();
  const [templateSaves, setTemplateSaves] = useState<template[]>(
    JSON.parse(localStorage.getItem("saves") || "[]")
  );
  const [eighteenDates, setEighteenDates] = useState<Date[]>(Array(18));
  const notifications = useNotifications();
  const [days, setDays] = useState<day[]>([
    {
      date: "Date",
      lottery1: "nombre1",
      lottery2: "nombre2",
      encerrado: "encerrado",
      number: 3,
      cost: "precio",
      prize: "premio",
      template: "anycolor",
    },
    {
      date: "Date",
      lottery1: "nombre1",
      lottery2: "nombre2",
      encerrado: "encerrado",
      number: 3,
      cost: "precio",
      prize: "premio",
      template: "anycolor",
    },
    {
      date: "Date",
      lottery1: "nombre1",
      lottery2: "nombre2",
      encerrado: "encerrado",
      number: 3,
      cost: "precio",
      prize: "premio",
      template: "anycolor",
    },
    {
      date: "Date",
      lottery1: "nombre1",
      lottery2: "nombre2",
      encerrado: "encerrado",
      number: 3,
      cost: "precio",
      prize: "premio",
      template: "anycolor",
    },
    {
      date: "Date",
      lottery1: "nombre1",
      lottery2: "nombre2",
      encerrado: "encerrado",
      number: 3,
      cost: "precio",
      prize: "premio",
      template: "anycolor",
    },
    {
      date: "Date",
      lottery1: "nombre1",
      lottery2: "nombre2",
      encerrado: "encerrado",
      number: 3,
      cost: "precio",
      prize: "premio",
      template: "anycolor",
    },
    {
      date: "Date",
      lottery1: "nombre1",
      lottery2: "nombre2",
      encerrado: "encerrado",
      number: 3,
      cost: "precio",
      prize: "premio",
      template: "anycolor",
    },
    {
      date: "Date",
      lottery1: "nombre1",
      lottery2: "nombre2",
      encerrado: "encerrado",
      number: 3,
      cost: "precio",
      prize: "premio",
      template: "anycolor",
    },
    {
      date: "Date",
      lottery1: "nombre1",
      lottery2: "nombre2",
      encerrado: "encerrado",
      number: 3,
      cost: "precio",
      prize: "premio",
      template: "anycolor",
    },
    {
      date: "Date",
      lottery1: "nombre1",
      lottery2: "nombre2",
      encerrado: "encerrado",
      number: 3,
      cost: "precio",
      prize: "premio",
      template: "anycolor",
    },
    {
      date: "Date",
      lottery1: "nombre1",
      lottery2: "nombre2",
      encerrado: "encerrado",
      number: 3,
      cost: "precio",
      prize: "premio",
      template: "anycolor",
    },
    {
      date: "Date",
      lottery1: "nombre1",
      lottery2: "nombre2",
      encerrado: "encerrado",
      number: 3,
      cost: "precio",
      prize: "premio",
      template: "anycolor",
    },
    {
      date: "Date",
      lottery1: "nombre1",
      lottery2: "nombre2",
      encerrado: "encerrado",
      number: 3,
      cost: "precio",
      prize: "premio",
      template: "anycolor",
    },
    {
      date: "Date",
      lottery1: "nombre1",
      lottery2: "nombre2",
      encerrado: "encerrado",
      number: 3,
      cost: "precio",
      prize: "premio",
      template: "anycolor",
    },
    {
      date: "Date",
      lottery1: "nombre1",
      lottery2: "nombre2",
      encerrado: "encerrado",
      number: 3,
      cost: "precio",
      prize: "premio",
      template: "anycolor",
    },
    {
      date: "Date",
      lottery1: "nombre1",
      lottery2: "nombre2",
      encerrado: "encerrado",
      number: 3,
      cost: "precio",
      prize: "premio",
      template: "anycolor",
    },
    {
      date: "Date",
      lottery1: "nombre1",
      lottery2: "nombre2",
      encerrado: "encerrado",
      number: 3,
      cost: "precio",
      prize: "premio",
      template: "anycolor",
    },
    {
      date: "Date",
      lottery1: "nombre1",
      lottery2: "nombre2",
      encerrado: "encerrado",
      number: 3,
      cost: "precio",
      prize: "premio",
      template: "anycolor",
    },
  ]);

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
      date: (value) => value.length > 0 && !(value === "Invalid Date"),
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

  function checkAllDates() {
    const chekingDate = lodash.filter(
      days,
      (o) => o.date === "Date" || o.date === "Invalid Date"
    )[0];
    const chekingLottery1 = lodash.filter(
      days,
      (o) => o.lottery1 === "nombre1"
    )[0];

    if (!chekingDate && !chekingLottery1) {
      notifications.showNotification({
        title: "El documento empezó a generarse",
        message: "El documento demora unos minutos en generarse, por favor espere.",
        color: "blue",
        autoClose: true,
        icon: <CheckIcon />,
      });
      send18ToPrint(days);
    } else {
      notifications.showNotification({
        title: "No se puede generar el documento",
        message: "Hacen falta campos por seleccionar",
        color: "red",
        autoClose: true,
        icon: <AlertIcon />,
      });
      chekingDate
        ? console.log("Hace falta una fecha por seleccionar")
        : console.log("Todo bem");
      chekingLottery1
        ? console.log("Hace falta una plantilla por seleccionar")
        : console.log("todo bem too");
    }
  }

  const rows = checked
    ? days.map((day, index) => (
        <tr key={nanoid()}>
          <td>
            <DatePicker
              transition={"scale-y"}
              minDate={dayjs(new Date()).toDate()}
              placeholder="Fecha de la boleta"
              onChange={(date: Date) => {
                const withoutFormat = eighteenDates;
                withoutFormat[index] = date;
                setEighteenDates(withoutFormat);
                const oldDays = days;
                oldDays[index].date = dayjs(date)
                  .format("DD MMMM YYYY")
                  .toString();
                setDays(oldDays);
              }}
              inputFormat={"DD MMMM YYYY"}
              dayClassName={(date, modifiers) =>
                cx({
                  [classes.weekend]: modifiers.weekend,
                })
              }
              value={eighteenDates[index]}
            />
          </td>
          <td>
            <Select
              onDropdownClose={() => setDays(days)}
              onChange={(v) => {
                const oldDays = days;
                const selectedTemplate = lodash.filter(
                  templateSaves,
                  (o) => o.value === v
                )[0];
                if (v) {
                  oldDays[index] = [
                    {
                      date: days[index].date,
                      lottery1: selectedTemplate.lottery1,
                      lottery2: selectedTemplate.lottery2,
                      encerrado: selectedTemplate.encerrado,
                      number: 5,
                      cost: selectedTemplate.price,
                      prize: selectedTemplate.prize,
                      template: selectedTemplate.color,
                    },
                  ][0];
                  console.log("si", index);
                  setDays(oldDays);
                  console.log(days[index]);
                } else {
                  console.log("no", index);
                }
                // oldDays[index].lottery1 = selectedTemplate.lottery1;
                // oldDays[index].lottery2 = selectedTemplate.lottery2;
                // setDays(oldDays);
                // console.log(oldDays[index]);
                forceUpdate();
              }}
              clearable
              placeholder="Pick one"
              itemComponent={SelectItem}
              data={templateSaves}
              searchable
              maxDropdownHeight={400}
              nothingFound="Nobody here"
            />
          </td>
          <td>{days[index].lottery1}</td>
          <td>{days[index].lottery2}</td>
          <td>{days[index].encerrado}</td>
          <td>{days[index].cost}</td>
          <td>{days[index].prize}</td>
          <td>{template(days[index].template)}</td>
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
                oldDay.date = dayjs(date).format("DD MMMM YYYY").toString();
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
        </tr>
      ));

  return (
    <div>
      <Affix position={{ bottom: 20, right: 20 }}>
        <Button
          type="submit"
          onClick={() => {
            if (checked) {
              console.log("Empezando");
              checkAllDates();
            } else {
              if (oneForm.validate()) {
                send1ToPrint(oneForm.values);
              } else {
                console.log("no se puede");
              }
            }
          }}
          leftIcon={<ArchiveIcon />}
        >
          Imprimir
        </Button>
      </Affix>
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
    </div>
  );
}

export default PrinterManager;
