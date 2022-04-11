import { Button, Center, RingProgress, Text, ThemeIcon } from "@mantine/core";
import _ from "lodash";
import React, { useEffect, useState } from "react";
import { Check } from "tabler-icons-react";
import { client } from "../websockets/wsclient";

export default function BackendStatus() {
  const [oneImagesStatus, setOneImagesStatus] = useState<number>(0);
  const [onePdfStatus, setOnePdfStatus] = useState<number>(0);
  const [allImageStatus, setAllImageStatus] = useState<number>(0);
  const [allPdfStatus, setAllPdfStatus] = useState<number>(0);

  useEffect(() => {
    client.on("one-images", (message) => {
      console.log("IMAGES", message);
      setOneImagesStatus(parseInt(message));
    });
    client.on("one-pdf", (message) => {
      console.log("PDF", message);
      setOnePdfStatus(parseInt(message));
    });
    client.on("all-images", (message) => {
      console.log("ALL IMAGES", message);
      setAllImageStatus(parseInt(message));
    });
    client.on("all-pdf", (message) => {
      console.log("ALL PDF", message);
      setAllPdfStatus(parseInt(message));
    });
  }, []);

  return (
    <div>
      {/* ONE DAY IMAGES GENERATION STATUS */}
      <RingProgress
        sections={[
          {
            value: (oneImagesStatus / 1000) * 100,
            color: (oneImagesStatus / 1000) * 100 > 99 ? "green" : "blue",
          },
        ]}
        label={
          (oneImagesStatus / 1000) * 100 > 99 ? (
            <Center>
              <ThemeIcon color="teal" variant="light" radius="xl" size="xl">
                <Check size={22} />
              </ThemeIcon>
            </Center>
          ) : (
            <Text color="blue" weight={700} align="center" size="xl">
              {_.round((oneImagesStatus / 1000) * 100, 0)}%
            </Text>
          )
        }
      />
      {/* ONE DAY PDF GENERATION STATUS */}
      <RingProgress
        sections={[
          {
            value: (onePdfStatus / 1000) * 100,
            color: (onePdfStatus / 1000) * 100 > 99 ? "green" : "blue",
          },
        ]}
        label={
          (onePdfStatus / 1000) * 100 > 99 ? (
            <Center>
              <ThemeIcon color="teal" variant="light" radius="xl" size="xl">
                <Check size={22} />
              </ThemeIcon>
            </Center>
          ) : (
            <Text color="blue" weight={700} align="center" size="xl">
              {_.round((onePdfStatus / 1000) * 100, 0)}%
            </Text>
          )
        }
      />
      {/* 18 DAYS IMAGES GENERATION STATUS */}
      <RingProgress
        sections={[
          {
            value: allImageStatus,
            color: allImageStatus > 99 ? "green" : "blue",
          },
        ]}
        label={
          allImageStatus > 99 ? (
            <Center>
              <ThemeIcon color="teal" variant="light" radius="xl" size="xl">
                <Check size={22} />
              </ThemeIcon>
            </Center>
          ) : (
            <Text color="blue" weight={700} align="center" size="xl">
              {_.round(allImageStatus, 0)}%
            </Text>
          )
        }
      />
      {/* 18 DAYS PDF GENERATION STATUS */}
      <RingProgress
        sections={[
          {
            value: (allPdfStatus / 18000) * 100,
            color: (allPdfStatus / 18000) * 100 > 99 ? "green" : "blue",
          },
        ]}
        label={
          (allPdfStatus / 18000) * 100 > 99 ? (
            <Center>
              <ThemeIcon color="teal" variant="light" radius="xl" size="xl">
                <Check size={22} />
              </ThemeIcon>
            </Center>
          ) : (
            <Text color="blue" weight={700} align="center" size="xl">
              {_.round((allPdfStatus / 1000) * 100, 0)}%
            </Text>
          )
        }
      />
      <Button>Contar archivos</Button>

    </div>
  );
}
