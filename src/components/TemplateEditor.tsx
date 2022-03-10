import React, { forwardRef, useEffect, useState } from "react";
import {
  ActionIcon,
  Badge,
  Button,
  Checkbox,
  Grid,
  Group,
  Image,
  NumberInput,
  Popover,
  Select,
  Space,
  Table,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/hooks";
import { nanoid } from "nanoid";
import { PencilIcon, TrashIcon } from "@primer/octicons-react";
import * as lodash from "lodash";

export interface templates {
  id: string;
  templateName: string;
  color: string;
  prize: string;
  upperName: string;
  lowerName: string;
  price: string;
  encerrado: string;
}

function TemplateEditor() {
  const [templateSaves, setTemplateSaves] = useState<templates[]>(
    JSON.parse(localStorage.getItem("saves") || "[]")
  );
  const [editPopOver, setEditPopOver] = useState<boolean>(false);
  // const [error, setError] = useState<string>(null);
  const form = useForm({
    initialValues: {
      id: "",
      templateName: "",
      color: "",
      prize: "",
      upperName: "",
      lowerName: "",
      price: "",
      encerrado: "",
    },
    validationRules: {
      templateName: (value) => value.length > 2,
      color: (value) =>
        value === "red" || value === "blue" || value === "green",
      prize: (value) => value.length > 0,
      upperName: (value) => value.length < 11,
      lowerName: (value) => value.length < 11,
      price: (value) => value.length > 0,
      encerrado: (value) => value.length > 0,
    },
    errorMessages: {
      templateName: "El nombre debe tener mas de dos caracteres",
      color: "Debe seleccionar un color",
      prize: "Debe ingresar el valor del premio",
      upperName: "El primer nombre escrito debe ser más corto",
      lowerName: "El primer nombre escrito debe ser más corto",
      price: "Debe ingresar el precio de la boleta",
      encerrado: "Debe ingresar el precio del encerrado",
    },
  });

  function deleteTemplateById(id: string) {
    const newArray = lodash.filter(templateSaves, (o) => o.id !== id);
    setTemplateSaves(newArray);
    localStorage.setItem("saves", JSON.stringify(newArray));
    console.log(newArray);
  }

  function saveTemplates(data: templates) {
    const newSaves = templateSaves;
    newSaves.push(data);
    setTemplateSaves(newSaves);
    localStorage.setItem("saves", JSON.stringify(templateSaves));
    console.log(newSaves);
    console.log(templateSaves);
  }

  function editTemplateByValue(value: templates) {
    form.setValues(value);
  }

  const templateRows = templateSaves.map((element, index) => (
    <tr key={element.id}>
      <td>{element.templateName}</td>
      <td>
        <Group position="right" spacing="xs">
          <ActionIcon
            onClick={() => {
              editTemplateByValue(element);
            }}
          >
            <PencilIcon />
          </ActionIcon>
          <ActionIcon
            onClick={() => {
              deleteTemplateById(element.id);
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

  return (
    <div
      style={{
        width: "100%",
        margin: "auto",
        paddingLeft: "10%",
        paddingRight: "15%",
      }}
    >
      <Grid grow justify="center" align="center" gutter="xl">
        <Grid.Col span={1}>
          <Image
            radius="md"
            src={`http://localhost:4000/svg/generate/${
              form.values.color ? form.values.color : "blue"
            }/fecha/${form.values.upperName ? form.values.upperName : " "}/${
              form.values.lowerName ? form.values.lowerName : " "
            }/${form.values.encerrado ? form.values.encerrado : " "}/000/${
              form.values.price ? form.values.price : " "
            }/${form.values.prize ? form.values.prize : " "}/`}
            alt="Random unsplash image"
          />
        </Grid.Col>

        <Grid.Col span={1}>
          <form
            onSubmit={form.onSubmit((values) => {
              saveTemplates(values);
              console.log(values);
              form.reset();
            })}
          >
            <TextInput
              required
              label="Nombre Guardado"
              placeholder="Nombre de la plantilla"
              {...form.getInputProps("templateName")}
            />
            <Select
              {...form.getInputProps("color")}
              label="Color de la Plantilla"
              required
              placeholder="Escoge un Color"
              itemComponent={forwardRef(({ label, value, ...others }, ref) => (
                <div ref={ref} {...others}>
                  <Badge
                    style={{ marginRight: 3 }}
                    color={value}
                    variant="filled"
                    // fullWidth
                    // radius="xs"
                  >
                    {label}
                  </Badge>
                </div>
              ))}
              // onChange={(value: "red" | "green" | "blue") => {
              //   value ? setTemplate(value) : setTemplate("blue");
              //   form.setFieldValue("color", value);
              // }}
              data={[
                { value: "red", label: "Rojo" },
                { value: "green", label: "Verde" },
                { value: "blue", label: "Azul" },
              ]}
              clearable
              maxDropdownHeight={400}
              nothingFound="Nobody here"
              // filter={(value, item) =>
              //   item.label
              //     ?.toLowerCase()
              //     .includes(value.toLowerCase().trim()) ||
              //   item.description
              //     .toLowerCase()
              //     .includes(value.toLowerCase().trim())
              // }
            />
            <TextInput
              type="number"
              {...form.getInputProps("prize")}
              required
              label="Valor del Premio"
              // hideControls
              // description="Mínimo 0, máximo 9999."
              placeholder="Ingrese el valor del premio"
              max={999999}
              min={0}
            />
            <TextInput
              {...form.getInputProps("upperName")}
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
              {...form.getInputProps("lowerName")}
            />
            <Group grow>
              <TextInput
                type="number"
                {...form.getInputProps("price")}
                required
                label="Precio Boleta"
                // description="Mínimo 0, máximo 999."
                placeholder="Precio Boleta"
                // hideControls
                max={999}
                min={0}
              />
              <TextInput
                type="number"
                {...form.getInputProps("encerrado")}
                required
                label="Valor Encerrado"
                // hideControls
                // description="Mínimo 0, máximo 9999."
                placeholder="Valor Encerrado"
                max={9999}
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
                      console.log(
                        JSON.parse(localStorage.getItem("saves") || "[]")
                      );
                      setEditPopOver(!editPopOver);
                      console.log(templateSaves);
                    }}
                  >
                    Plantillas
                  </Button>
                }
              >
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
              </Popover>
              <Button
                type="submit"
                onClick={()=>deleteTemplateById(form.values.id)}
                onMouseEnter={() => {
                  form.values.id ? "" : form.setFieldValue("id", nanoid());
                }}
              >
                Guardar
              </Button>
            </Group>
          </form>
        </Grid.Col>
      </Grid>
    </div>
  );
}

export default TemplateEditor;
