import React, { forwardRef, useState } from "react";
import { Group, Avatar, Text, Select } from "@mantine/core";
import { template } from "./components/TemplateEditor";

const data = [
  {
    value: "1234",
    label: "Primero mi perro",
    color: "azul",
    prize: "",
    lottery1: "",
    lottery2: "",
    price: "",
    encerrado: "",
  },
  {
    value: "1235",
    label: "Segundo mi so",
    color: "azul",
    prize: "",
    lottery1: "",
    lottery2: "",
    price: "",
    encerrado: "",
  },
];

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

function TemplateSelector() {
  const [templateSaves, setTemplateSaves] = useState<template[]>(
    JSON.parse(localStorage.getItem("saves") || "[]")
  );
  return (
    <div>
      <Select
        label="Choose employee of the month"
        placeholder="Pick one"
        itemComponent={SelectItem}
        data={templateSaves}
        searchable
        maxDropdownHeight={400}
        nothingFound="Nobody here"
      />
    </div>
  );
}

export default TemplateSelector;
