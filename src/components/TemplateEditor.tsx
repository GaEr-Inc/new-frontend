import React, { useState } from "react";
import { Image } from "@mantine/core";

function TemplateEditor() {
  const [prizeValue, setPrizeValue] = useState(250000);
  const [firstLotteryName, setFirstLotteryName] = useState("Chontico");
  const [secondLotteryName, setSecondLotteryName] = useState("Dia");
  const [priceValue, setPriceValue] = useState(500);
  const [encerradoValue, setEncerradoValue] = useState(3000);
  const [template, setTemplate] = useState<'red' | 'green' | 'blue'>("blue");
  const [defaultDate, setDefaultDate] = useState<string>("dia # de mes de año");
  return (
    <div style={{ width: 600, margin: "auto" }}>
      <Image
        radius="md"
        src={`http://localhost:4000/svg/generate/${template}/fecha/${firstLotteryName}/${secondLotteryName}/${encerradoValue}/000/${priceValue}/${prizeValue}/`}
        alt="Random unsplash image"
      />
    </div>
  );
}

export default TemplateEditor;
