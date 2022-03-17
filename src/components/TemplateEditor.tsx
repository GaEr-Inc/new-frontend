import React, { forwardRef, useEffect, useState } from "react";
import {
  ActionIcon,
  Badge,
  Button,
  Checkbox,
  Divider,
  Grid,
  Group,
  Image,
  NumberInput,
  Popover,
  ScrollArea,
  SegmentedControl,
  Select,
  Space,
  Table,
  Tabs,
  TextInput,
} from "@mantine/core";
import { useForm, useScrollLock, useViewportSize } from "@mantine/hooks";
import { nanoid } from "nanoid";
import { PencilIcon, TrashIcon } from "@primer/octicons-react";
import * as lodash from "lodash";
import { StringifyOptions } from "querystring";

export interface template {
  value: string;
  label: string;
  color: string;
  prize: string;
  lottery1: string;
  lottery2: string;
  price: string;
  encerrado: string;
}

function TemplateEditor() {
  const { height, width } = useViewportSize();
  const [templateSaves, setTemplateSaves] = useState<template[]>(
    JSON.parse(localStorage.getItem("saves") || "[]")
  );
  const [printColor, setPrintColor] = useState<string>("red");
  const [editPopOver, setEditPopOver] = useState<boolean>(false);
  // const [error, setError] = useState<string>(null);
  const form = useForm({
    initialValues: {
      value: "",
      label: "",
      color: "red",
      prize: "",
      lottery1: "",
      lottery2: "",
      price: "",
      encerrado: "",
    },
    validationRules: {
      label: (value) => value.length > 2,
      color: (value) =>
        value === "red" || value === "blue" || value === "green",
      prize: (value) => value.length > 0,
      lottery1: (value) => value.length < 11,
      lottery2: (value) => value.length < 11,
      price: (value) => value.length > 0,
      encerrado: (value) => value.length > 0,
    },
    errorMessages: {
      label: "El nombre debe tener mas de dos caracteres",
      color: "Debe seleccionar un color",
      prize: "Debe ingresar el valor del premio",
      lottery1: "El primer nombre escrito debe ser más corto",
      lottery2: "El primer nombre escrito debe ser más corto",
      price: "Debe ingresar el precio de la boleta",
      encerrado: "Debe ingresar el precio del encerrado",
    },
  });

  function deleteTemplateById(id: string) {
    const newArray = lodash.filter(templateSaves, (o) => o.value !== id);
    setTemplateSaves(newArray);
    localStorage.setItem("saves", JSON.stringify(newArray));
  }

  function saveTemplates(data: template) {
    const newSaves = templateSaves;
    newSaves.push(data);
    setTemplateSaves(newSaves);
    localStorage.setItem("saves", JSON.stringify(templateSaves));
  }

  function editTemplateByValue(value: template) {
    form.setValues(value);
  }

  const templateRows = templateSaves.map((element, index) => (
    <tr key={element.value}>
      <td>{element.label}</td>
      <td>
        <Group position="right" spacing="xs">
          <ActionIcon
            onClick={() => {
              editTemplateByValue(element);
              setEditPopOver(!editPopOver);
            }}
          >
            <PencilIcon />
          </ActionIcon>
          <ActionIcon
            onClick={() => {
              deleteTemplateById(element.value);
              setEditPopOver(!editPopOver);
            }}
            color="red"
          >
            <TrashIcon />
          </ActionIcon>
        </Group>
      </td>
    </tr>
  ));

  useScrollLock(true);

  return (
    <ScrollArea style={{ height: height - 120 }} offsetScrollbars>
      <div
        style={{
          width: "100%",
          height: "100%",
          margin: "auto",
          paddingLeft: "5%",
          paddingRight: "10%",
        }}
      >
        <Grid
          grow
          justify="center"
          align="center"
          gutter={50}
          style={{ paddingTop: "6%" }}
        >
          <Grid.Col span={4}>
            <Image
              style={
                {
                  // paddingBottom: "10%",
                }
              }
              radius="md"
              src={`http://localhost:4000/svg/generate/${printColor}/fecha/${
                form.values.lottery1 ? form.values.lottery1 : " "
              }/${form.values.lottery2 ? form.values.lottery2 : " "}/${
                form.values.encerrado ? form.values.encerrado : " "
              }/000/${form.values.price ? form.values.price : " "}/${
                form.values.prize ? form.values.prize : " "
              }/`}
              alt="Random unsplash image"
            />
          </Grid.Col>
          <Grid.Col span={1}>
            Color de la Muestra
            <SegmentedControl
              color={printColor}
              onChange={(v) => setPrintColor(v)}
              transitionDuration={250}
              style={{ width: "100%" }}
              data={[
                { label: "Rojo", value: "red" },
                { label: "Verde", value: "green" },
                { label: "Azul", value: "blue" },
              ]}
            />
            <Space h="xl" />
            <form
              // style={{
              //   width: "100%",
              //   height: "10%",
              //   justifyContent: "left",
              //   paddingBottom: "20%",
              //   paddingTop: "5%",
              // }}
              onSubmit={form.onSubmit((values) => {
                saveTemplates(values);
                form.reset();
              })}
            >
              <TextInput
                required
                label="Nombre Guardado"
                placeholder="Nombre de la plantilla"
                {...form.getInputProps("label")}
              />
              <TextInput
                type="number"
                {...form.getInputProps("prize")}
                required
                label="Valor del Premio"
                // hideControls
                // description="Mínimo 0, máximo 9999."
                placeholder="Ingrese el valor del premio"
                max={9999999}
                min={0}
              />
              <TextInput
                {...form.getInputProps("lottery1")}
                data-autofocus
                required
                placeholder="Chontico"
                label="Nombre superior"
              />
              <TextInput
                data-autofocus
                required
                placeholder="Noche"
                label="Nombre Inferior"
                {...form.getInputProps("lottery2")}
              />
              <Group grow>
                <TextInput
                  type="number"
                  {...form.getInputProps("price")}
                  required
                  label="Precio Boleta"
                  // description="Mínimo 0, máximo 9999."
                  placeholder="Precio Boleta"
                  // hideControls
                  max={19999}
                  min={0}
                />
                <TextInput
                  type="number"
                  {...form.getInputProps("encerrado")}
                  required
                  label="Valor Encerrado"
                  // hideControls
                  // description="Mínimo 0, máximo 99999."
                  placeholder="Valor Encerrado"
                  max={999999}
                  min={0}
                />
              </Group>
              <Space h="md"></Space>
              <Group grow>
                <Popover
                  onClose={() => setEditPopOver(!editPopOver)}
                  withCloseButton
                  opened={editPopOver}
                  target={
                    <Button
                      fullWidth
                      color="gray"
                      onClick={() => {
                        setEditPopOver(!editPopOver);
                      }}
                    >
                      Plantillas
                    </Button>
                  }
                >
                  <ScrollArea style={{ height: 250 }}>
                    <Table highlightOnHover>
                      <thead>
                        <tr>
                          <th>
                            {templateRows.length > 0
                              ? "Nombre de plantilla"
                              : "No existen plantillas creadas"}
                          </th>
                          <th></th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>{templateRows}</tbody>
                    </Table>
                  </ScrollArea>
                </Popover>
                <Button
                  type="submit"
                  onClick={() => deleteTemplateById(form.values.value)}
                  onMouseEnter={() => {
                    form.values.value
                      ? ""
                      : form.setFieldValue("value", nanoid());
                  }}
                >
                  Guardar
                </Button>
              </Group>
            </form>
          </Grid.Col>
        </Grid>
      </div>
    </ScrollArea>
  );
}

export default TemplateEditor;
