import React, { forwardRef, useState } from "react";
import {
  Badge,
  Button,
  Checkbox,
  Grid,
  Group,
  Image,
  NumberInput,
  Select,
  Space,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/hooks";

function TemplateEditor() {
  const [prizeValue, setPrizeValue] = useState(250000);
  const [firstLotteryName, setFirstLotteryName] = useState("Chontico");
  const [secondLotteryName, setSecondLotteryName] = useState("Dia");
  const [priceValue, setPriceValue] = useState(500);
  const [encerradoValue, setEncerradoValue] = useState(3000);
  const [template, setTemplate] = useState<"red" | "green" | "blue">("blue");
  const [defaultDate, setDefaultDate] = useState<string>("dia # de mes de año");
  const [formType, setFormType] = useState<"register" | "login">("register");
  const [loading, setLoading] = useState(false);
  // const [error, setError] = useState<string>(null);
  const form = useForm({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      termsOfService: true,
    },

    validationRules: {
      firstName: (value) => formType === "login" || value.trim().length >= 2,
      lastName: (value) => formType === "login" || value.trim().length >= 2,
      email: (value) => /^\S+@\S+$/.test(value),
      password: (value) => /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/.test(value),
    },

    errorMessages: {
      email: "Invalid email",
      password:
        "Password should contain 1 number, 1 letter and at least 6 characters",
      confirmPassword: "Passwords don't match. Try again",
    },
  });

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
            src={`http://localhost:4000/svg/generate/${template}/fecha/${firstLotteryName}/${secondLotteryName}/${encerradoValue}/000/${priceValue}/${prizeValue}/`}
            alt="Random unsplash image"
          />
        </Grid.Col>

        <Grid.Col span={1}>
          <form onSubmit={form.onSubmit((values) => console.log(values))}>
            <TextInput
              required
              label="Nombre Guardado"
              placeholder="Nombre de la plantilla"
              {...form.getInputProps("email")}
            />
            <Select
              label="Color de la PLantilla"
              required
              placeholder="Escoge un Color"
              itemComponent={forwardRef(
                ({label, value, ...others }, ref) => (
                  <div ref={ref} {...others}>
                        <Badge
                          style={{ marginRight: 3 }}
                          color={value}
                          variant="filled"
                        >
                          {label}
                        </Badge>
                  </div>
                )
              )}
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
            <NumberInput
              required
              label="Valor del Premio"
              hideControls
              // description="Mínimo 0, máximo 9999."
              placeholder="Ingrese el valor del premio"
              max={999999}
              min={0}
            />
            <TextInput
              data-autofocus
              required
              placeholder="Chontico"
              label="Nombre superior"
              {...form.getInputProps("firstName")}
            />
            <TextInput
              data-autofocus
              required
              placeholder="Noche"
              label="Nombre Inferior"
              {...form.getInputProps("firstName")}
            />
            <Group grow>
              <NumberInput
                required
                label="Precio Boleta"
                // description="Mínimo 0, máximo 999."
                placeholder="Precio Boleta"
                hideControls
                max={999}
                min={0}
              />
              <NumberInput
                required
                label="Valor Encerrado"
                hideControls
                // description="Mínimo 0, máximo 9999."
                placeholder="Valor Encerrado"
                max={9999}
                min={0}
              />
            </Group>
            <Space h="md"></Space>
            <Button type="submit">Submit</Button>
          </form>
        </Grid.Col>
      </Grid>
    </div>
  );
}

export default TemplateEditor;
