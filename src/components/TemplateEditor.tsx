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
  Modal,
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
import {
  useForm,
  useLocalStorageValue,
  useScrollLock,
  useViewportSize,
} from "@mantine/hooks";
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

export interface ticketTemplate {
  lin1: string;
  lin2: string;
  lin3: string;
  pzDesc: string;
  brandName: string;
}

function TemplateEditor() {
  const { height, width } = useViewportSize();
  const [templateSaves, setTemplateSaves] = useState<template[]>(
    JSON.parse(localStorage.getItem("saves") || "[]")
  );
  const [ticketInfo, setTicketInfo] = useLocalStorageValue({
    key: "tickets",
    defaultValue: JSON.stringify({
      lin1: "Resp: CRA.5E No. 6-59 Altos Guadalajara CEL.:304 3381617",
      lin2: "Pagos de Premios de 3 a 6 p.m. de Lunes a Sábado",
      lin3: "Cad. 8 días - Boleta Rota o enmendada no se paga",
      pzDesc: "MERCADO DE",
      brandName: "EL TREBOL",
    }),
  });
  const [printColor, setPrintColor] = useState<string>("red");
  const [editPopOver, setEditPopOver] = useState<boolean>(false);
  const [editTicket, setEditTicket] = useState<boolean>(false);
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

  const ticketForm = useForm({
    initialValues: {
      lin1: JSON.parse(ticketInfo).lin1,
      lin2: JSON.parse(ticketInfo).lin2,
      lin3: JSON.parse(ticketInfo).lin3,
      pzDesc: JSON.parse(ticketInfo).pzDesc,
      brandName: JSON.parse(ticketInfo).brandName,
    },
    validationRules: {},
    errorMessages: {},
  });

  function updateTicketInfo(values: ticketTemplate) {
    setTicketInfo(
      JSON.stringify({
        lin1: values.lin1,
        lin2: values.lin2,
        lin3: values.lin3,
        pzDesc: values.pzDesc,
        brandName: values.brandName,
      })
    );
  }

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
            <Modal
              title="Información Básica de la Boleta"
              centered
              size="500px"
              opened={editTicket}
              onClose={() => setEditTicket(!editTicket)}
            >
              <form
                // style={{
                //   width: "100%",
                //   height: "10%",
                //   justifyContent: "left",
                //   paddingBottom: "20%",
                //   paddingTop: "5%",
                // }}
                onSubmit={ticketForm.onSubmit((values) => {
                  updateTicketInfo(values);
                  ticketForm.setFieldValue("lin1", values.lin1);
                  ticketForm.setFieldValue("lin2", values.lin2);
                  ticketForm.setFieldValue("lin3", values.lin3);
                  ticketForm.setFieldValue("pzDesc", values.pzDesc);
                  ticketForm.setFieldValue("brandName", values.brandName);
                  // ticketForm.reset();
                  setEditTicket(!editTicket);
                })}
              >
                <TextInput
                  required
                  label="Título de la Boleta"
                  placeholder="Título de la Boleta"
                  {...ticketForm.getInputProps("brandName")}
                />
                <TextInput
                  required
                  label="Descripción del Premio"
                  placeholder="Descripción del Premio"
                  {...ticketForm.getInputProps("pzDesc")}
                />
                <TextInput
                  required
                  label="Primera Línea Datos de Contacto"
                  placeholder="Primera Línea Datos de Contacto"
                  {...ticketForm.getInputProps("lin1")}
                />
                <TextInput
                  required
                  label="Segunda Línea Datos de Contacto"
                  placeholder="Segunda Línea Datos de Contacto"
                  {...ticketForm.getInputProps("lin2")}
                />
                <TextInput
                  required
                  label="Tercera Línea Datos de Contacto"
                  placeholder="Tercera Línea Datos de Contacto"
                  {...ticketForm.getInputProps("lin3")}
                />
                {/* <Button color="grape">Restablecer valores</Button>
                <Button color="gray">Cancelar</Button>
                <Button
                  style={{ paddingLeft: "20%" }}
                  type="submit"
                >
                  Guardar
                </Button> */}
                <div style={{ paddingTop: "15px" }}>
                  <Group position="apart" spacing="xs">
                    <Button
                      onClick={() => {
                        ticketForm.setFieldValue("lin1", "Resp: CRA.5E No. 6-59 Altos Guadalajara CEL.:304 3381617");
                        ticketForm.setFieldValue("lin2", "Pagos de Premios de 3 a 6 p.m. de Lunes a Sábado");
                        ticketForm.setFieldValue("lin3", "Cad. 8 días - Boleta Rota o enmendada no se paga");
                        ticketForm.setFieldValue("pzDesc", "MERCADO DE");
                        ticketForm.setFieldValue("brandName", "EL TREBOL" );
                      }}
                      color="grape"
                    >
                      Restablecer valores
                    </Button>
                    <Group position="right" spacing="xs">
                      <Button
                        color="gray"
                        onClick={() => setEditTicket(!editTicket)}
                      >
                        Cancelar
                      </Button>
                      <Button type="submit">Guardar</Button>
                    </Group>
                  </Group>
                </div>
              </form>
            </Modal>
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
              }/${JSON.parse(ticketInfo).lin1}/${JSON.parse(ticketInfo).lin2}/${
                JSON.parse(ticketInfo).lin3
              }/${JSON.parse(ticketInfo).pzDesc}/${
                JSON.parse(ticketInfo).brandName
              }`}
              alt="Random unsplash image"
            />
          </Grid.Col>
          <Grid.Col span={1}>
            {/* <div style={{ alignContent: "stretch" }}> */}
            <Grid
              grow
              justify="center"
              align="center"
              gutter={0}
              // style={{ paddingTop: "6%" }}
            >
              <Grid.Col span={11}>
                <p>Editar Información de la Boleta</p>
              </Grid.Col>
              <Grid.Col span={1}>
                <ActionIcon
                  variant="light"
                  onClick={() => setEditTicket(!editTicket)}
                >
                  <PencilIcon />
                </ActionIcon>
              </Grid.Col>
            </Grid>
            {/* </div> */}
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
function useLocalStorage(arg0: { key: any }): [any, any] {
  throw new Error("Function not implemented.");
}
