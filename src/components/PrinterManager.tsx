import {
  Affix,
  Alert,
  Avatar,
  Badge,
  Button,
  createStyles,
  Divider,
  Grid,
  Group,
  Modal,
  MultiSelect,
  NativeSelect,
  ScrollArea,
  SegmentedControl,
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
  BrowserIcon,
  CheckIcon,
  NoteIcon,
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
  useScrollLock,
  useSetState,
  useViewportSize,
} from "@mantine/hooks";
import lodash from "lodash";
import { send18ToPrint, send1ToPrint, updateAll } from "../utils/requests";
import { useSelector } from "@agile-ts/react";
import { AlertIcon, InfoIcon } from "@primer/octicons-react";
import { StringDecoder } from "string_decoder";

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
    "/Enero/",
    "/Febrero/",
    "/Marzo/",
    "/Abril/",
    "/Mayo/",
    "/Junio/",
    "/Julio/",
    "/Agosto/",
    "/Septiembre/",
    "/Octubre/",
    "/Noviembre/",
    "/Diciembre/",
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
  brandName: string;
  lineDownText1: string;
  lineDownText2: string;
  lineDownText3: string;
  prizeDescription: string;
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

export interface ticketTemplate {
  lin1: string;
  lin2: string;
  lin3: string;
  pzDesc: string;
  brandName: string;
}

function PrinterManager() {
  const { height, width } = useViewportSize();
  const forceUpdate = useForceUpdate();
  const { classes, cx } = useStyles();
  const [checked, setChecked] = useState<string>("1");
  const [oneDayDate, setOneDayDate] = useState<Date>();
  const [printColor, setPrintColor] = useState<string>("red");
  const [selectValue, setSelectValue] = useState<string>("");
  const [templateSaves, setTemplateSaves] = useState<template[]>(
    JSON.parse(localStorage.getItem("saves") || "[]")
  );
  const [ticketSaves, setTicketSaves] = useState<ticketTemplate>(
    JSON.parse(localStorage.getItem("tickets") || "")
  );
  const [eighteenDates, setEighteenDates] = useState<Date[]>(Array(18));
  const notifications = useNotifications();
  const [days, setDays] = useState<day[]>([
    {
      date: "",
      lottery1: "⠀⠀⠀⠀⠀⠀⠀⠀⠀",
      lottery2: "⠀⠀⠀⠀⠀⠀⠀⠀⠀",
      encerrado: "",
      number: 3,
      cost: "",
      prize: "",
      template: "",
      brandName: "EL TREBOL",
      lineDownText1: "Test Line 1",
      lineDownText2: "Test Line 2",
      lineDownText3: "Test Line 3",
      prizeDescription: "MERCADO DE",
    },
    {
      date: "",
      lottery1: "⠀⠀⠀⠀⠀⠀⠀⠀⠀",
      lottery2: "⠀⠀⠀⠀⠀⠀⠀⠀⠀",
      encerrado: "",
      number: 3,
      cost: "",
      prize: "",
      template: "",
      brandName: "EL TREBOL",
      lineDownText1: "Test Line 1",
      lineDownText2: "Test Line 2",
      lineDownText3: "Test Line 3",
      prizeDescription: "MERCADO DE",
    },
    {
      date: "",
      lottery1: "⠀⠀⠀⠀⠀⠀⠀⠀⠀",
      lottery2: "⠀⠀⠀⠀⠀⠀⠀⠀⠀",
      encerrado: "",
      number: 3,
      cost: "",
      prize: "",
      template: "",
      brandName: "EL TREBOL",
      lineDownText1: "Test Line 1",
      lineDownText2: "Test Line 2",
      lineDownText3: "Test Line 3",
      prizeDescription: "MERCADO DE",
    },
    {
      date: "",
      lottery1: "⠀⠀⠀⠀⠀⠀⠀⠀⠀",
      lottery2: "⠀⠀⠀⠀⠀⠀⠀⠀⠀",
      encerrado: "",
      number: 3,
      cost: "",
      prize: "",
      template: "",
      brandName: "EL TREBOL",
      lineDownText1: "Test Line 1",
      lineDownText2: "Test Line 2",
      lineDownText3: "Test Line 3",
      prizeDescription: "MERCADO DE",
    },
    {
      date: "",
      lottery1: "⠀⠀⠀⠀⠀⠀⠀⠀⠀",
      lottery2: "⠀⠀⠀⠀⠀⠀⠀⠀⠀",
      encerrado: "",
      number: 3,
      cost: "",
      prize: "",
      template: "",
      brandName: "EL TREBOL",
      lineDownText1: "Test Line 1",
      lineDownText2: "Test Line 2",
      lineDownText3: "Test Line 3",
      prizeDescription: "MERCADO DE",
    },
    {
      date: "",
      lottery1: "⠀⠀⠀⠀⠀⠀⠀⠀⠀",
      lottery2: "⠀⠀⠀⠀⠀⠀⠀⠀⠀",
      encerrado: "",
      number: 3,
      cost: "",
      prize: "",
      template: "",
      brandName: "EL TREBOL",
      lineDownText1: "Test Line 1",
      lineDownText2: "Test Line 2",
      lineDownText3: "Test Line 3",
      prizeDescription: "MERCADO DE",
    },
    {
      date: "",
      lottery1: "⠀⠀⠀⠀⠀⠀⠀⠀⠀",
      lottery2: "⠀⠀⠀⠀⠀⠀⠀⠀⠀",
      encerrado: "",
      number: 3,
      cost: "",
      prize: "",
      template: "",
      brandName: "EL TREBOL",
      lineDownText1: "Test Line 1",
      lineDownText2: "Test Line 2",
      lineDownText3: "Test Line 3",
      prizeDescription: "MERCADO DE",
    },
    {
      date: "",
      lottery1: "⠀⠀⠀⠀⠀⠀⠀⠀⠀",
      lottery2: "⠀⠀⠀⠀⠀⠀⠀⠀⠀",
      encerrado: "",
      number: 3,
      cost: "",
      prize: "",
      template: "",
      brandName: "EL TREBOL",
      lineDownText1: "Test Line 1",
      lineDownText2: "Test Line 2",
      lineDownText3: "Test Line 3",
      prizeDescription: "MERCADO DE",
    },
    {
      date: "",
      lottery1: "⠀⠀⠀⠀⠀⠀⠀⠀⠀",
      lottery2: "⠀⠀⠀⠀⠀⠀⠀⠀⠀",
      encerrado: "",
      number: 3,
      cost: "",
      prize: "",
      template: "",
      brandName: "EL TREBOL",
      lineDownText1: "Test Line 1",
      lineDownText2: "Test Line 2",
      lineDownText3: "Test Line 3",
      prizeDescription: "MERCADO DE",
    },
    {
      date: "",
      lottery1: "⠀⠀⠀⠀⠀⠀⠀⠀⠀",
      lottery2: "⠀⠀⠀⠀⠀⠀⠀⠀⠀",
      encerrado: "",
      number: 3,
      cost: "",
      prize: "",
      template: "",
      brandName: "EL TREBOL",
      lineDownText1: "Test Line 1",
      lineDownText2: "Test Line 2",
      lineDownText3: "Test Line 3",
      prizeDescription: "MERCADO DE",
    },
    {
      date: "",
      lottery1: "⠀⠀⠀⠀⠀⠀⠀⠀⠀",
      lottery2: "⠀⠀⠀⠀⠀⠀⠀⠀⠀",
      encerrado: "",
      number: 3,
      cost: "",
      prize: "",
      template: "",
      brandName: "EL TREBOL",
      lineDownText1: "Test Line 1",
      lineDownText2: "Test Line 2",
      lineDownText3: "Test Line 3",
      prizeDescription: "MERCADO DE",
    },
    {
      date: "",
      lottery1: "⠀⠀⠀⠀⠀⠀⠀⠀⠀",
      lottery2: "⠀⠀⠀⠀⠀⠀⠀⠀⠀",
      encerrado: "",
      number: 3,
      cost: "",
      prize: "",
      template: "",
      brandName: "EL TREBOL",
      lineDownText1: "Test Line 1",
      lineDownText2: "Test Line 2",
      lineDownText3: "Test Line 3",
      prizeDescription: "MERCADO DE",
    },
    {
      date: "",
      lottery1: "⠀⠀⠀⠀⠀⠀⠀⠀⠀",
      lottery2: "⠀⠀⠀⠀⠀⠀⠀⠀⠀",
      encerrado: "",
      number: 3,
      cost: "",
      prize: "",
      template: "",
      brandName: "EL TREBOL",
      lineDownText1: "Test Line 1",
      lineDownText2: "Test Line 2",
      lineDownText3: "Test Line 3",
      prizeDescription: "MERCADO DE",
    },
    {
      date: "",
      lottery1: "⠀⠀⠀⠀⠀⠀⠀⠀⠀",
      lottery2: "⠀⠀⠀⠀⠀⠀⠀⠀⠀",
      encerrado: "",
      number: 3,
      cost: "",
      prize: "",
      template: "",
      brandName: "EL TREBOL",
      lineDownText1: "Test Line 1",
      lineDownText2: "Test Line 2",
      lineDownText3: "Test Line 3",
      prizeDescription: "MERCADO DE",
    },
    {
      date: "",
      lottery1: "⠀⠀⠀⠀⠀⠀⠀⠀⠀",
      lottery2: "⠀⠀⠀⠀⠀⠀⠀⠀⠀",
      encerrado: "",
      number: 3,
      cost: "",
      prize: "",
      template: "",
      brandName: "EL TREBOL",
      lineDownText1: "Test Line 1",
      lineDownText2: "Test Line 2",
      lineDownText3: "Test Line 3",
      prizeDescription: "MERCADO DE",
    },
    {
      date: "",
      lottery1: "⠀⠀⠀⠀⠀⠀⠀⠀⠀",
      lottery2: "⠀⠀⠀⠀⠀⠀⠀⠀⠀",
      encerrado: "",
      number: 3,
      cost: "",
      prize: "",
      template: "",
      brandName: "EL TREBOL",
      lineDownText1: "Test Line 1",
      lineDownText2: "Test Line 2",
      lineDownText3: "Test Line 3",
      prizeDescription: "MERCADO DE",
    },
    {
      date: "",
      lottery1: "⠀⠀⠀⠀⠀⠀⠀⠀⠀",
      lottery2: "⠀⠀⠀⠀⠀⠀⠀⠀⠀",
      encerrado: "",
      number: 3,
      cost: "",
      prize: "",
      template: "",
      brandName: "EL TREBOL",
      lineDownText1: "Test Line 1",
      lineDownText2: "Test Line 2",
      lineDownText3: "Test Line 3",
      prizeDescription: "MERCADO DE",
    },
    {
      date: "",
      lottery1: "⠀⠀⠀⠀⠀⠀⠀⠀⠀",
      lottery2: "⠀⠀⠀⠀⠀⠀⠀⠀⠀",
      encerrado: "",
      number: 3,
      cost: "",
      prize: "",
      template: "",
      brandName: "EL TREBOL",
      lineDownText1: "Test Line 1",
      lineDownText2: "Test Line 2",
      lineDownText3: "Test Line 3",
      prizeDescription: "MERCADO DE",
    },
  ]);

  const oneForm = useForm({
    initialValues: {
      date: "",
      lottery1: "⠀⠀⠀⠀⠀⠀⠀⠀⠀",
      lottery2: "⠀⠀⠀⠀⠀⠀⠀⠀⠀",
      encerrado: "",
      number: 5,
      cost: "",
      prize: "",
      template: "red",
      brandName: ticketSaves.brandName,
      lineDownText1: ticketSaves.lin1,
      lineDownText2: ticketSaves.lin2,
      lineDownText3: ticketSaves.lin3,
      prizeDescription: ticketSaves.pzDesc,
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
      // date: null,
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
      lottery1: "Chontico",
      lottery2: "Dia",
      encerrado: "3000",
      number: 5,
      cost: "600",
      prize: "260000",
      template: "blue",
      brandName: "EL TREBOL",
      lineDownText1: "Test Line 1",
      lineDownText2: "Test Line 2",
      lineDownText3: "Test Line 3",
      prizeDescription: "MERCADO DE",
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
        message:
          "El documento demora unos minutos en generarse, por favor espere.",
        color: "blue",
        autoClose: true,
        icon: <CheckIcon />,
      });
      send18ToPrint(days, printColor);
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
  useScrollLock(true);

  function colorAssignment() {
    const oldColor = days;
    for (let i = 0; i < days.length; i++) {
      oldColor[i].template = printColor;
    }
    setDays(oldColor);
  }

  const rows =
    checked === "18"
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
                    .format("dddd, DDMMMMYYYY")
                    .toString();
                  setDays(oldDays);
                  forceUpdate();
                }}
                inputFormat={"dddd, DDMMMMYYYY"}
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
                  setSelectValue(selectedTemplate.label);
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
                        template: printColor,
                        brandName: ticketSaves.brandName,
                        lineDownText1: ticketSaves.lin1,
                        lineDownText2: ticketSaves.lin2,
                        lineDownText3: ticketSaves.lin3,
                        prizeDescription: ticketSaves.pzDesc,
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
                placeholder="Seleccionar Plantilla"
                itemComponent={SelectItem}
                data={templateSaves}
                searchable
                maxDropdownHeight={400}
                nothingFound="Nobody here"
                value={selectValue}
              />
            </td>
            <td>{days[index].lottery1}</td>
            <td>{days[index].lottery2}</td>
            <td>{days[index].encerrado}</td>
            <td>{days[index].cost}</td>
            <td>{days[index].prize}</td>
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
                    .format("dddd, DDMMMMYYYY")
                    .toString();
                  setDay([oldDay]);
                  setOneDayDate(date);
                  oneForm.setFieldValue("date", oldDay.date);
                }}
                inputFormat={"dddd, DDMMMMYYYY"}
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
                  oneForm.setFieldValue(
                    "encerrado",
                    selectedTemplate.encerrado
                  );
                  oneForm.setFieldValue("cost", selectedTemplate.price);
                  oneForm.setFieldValue("prize", selectedTemplate.prize);
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
          </tr>
        ));

  return (
    <div>
      <Affix position={{ bottom: 20, right: 50 }}>
        <Button
          type="submit"
          onMouseEnter={() => colorAssignment()}
          onClick={() => {
            if (checked === "18") {
              checkAllDates();
            } else {
              console.log(oneForm.values);
              if (oneForm.validate()) {
                notifications.showNotification({
                  title: "El documento empezó a generarse",
                  message:
                    "El documento demora unos minutos en generarse, por favor espere.",
                  color: "blue",
                  autoClose: true,
                  icon: <CheckIcon />,
                });
                send1ToPrint(oneForm.values, printColor);
                // console.log(oneForm.values, printColor);
              } else {
                notifications.showNotification({
                  title: "No se puede generar el documento",
                  message: "Hacen falta campos por seleccionar",
                  color: "red",
                  autoClose: true,
                  icon: <AlertIcon />,
                });
              }
            }
          }}
          leftIcon={<ArchiveIcon />}
        >
          Imprimir
        </Button>
      </Affix>
      <Grid gutter="xs" style={{ paddingBottom: "%" }}>
        <Grid.Col span={8}>
          <SegmentedControl
            onChange={(v) => setChecked(v)}
            transitionDuration={250}
            data={[
              { label: "Un Día", value: "1" },
              { label: "18 Días", value: "18" },
            ]}
          />
        </Grid.Col>
        <Grid.Col span={4}>
          <SegmentedControl
            color={printColor}
            onChange={(v) => {
              setPrintColor(v);
              oneForm.setFieldValue("template", v);
            }}
            transitionDuration={50}
            style={{ width: "100%" }}
            data={[
              { label: "Rojo", value: "red" },
              { label: "Verde", value: "green" },
              { label: "Azul", value: "blue" },
            ]}
          />
        </Grid.Col>
      </Grid>
      <Divider my="sm" />
      <ScrollArea style={{ height: height - 235 }} offsetScrollbars>
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
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
      </ScrollArea>
      <Divider my="sm" />
    </div>
  );
}

export default PrinterManager;
