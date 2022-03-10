import { useValue } from "@agile-ts/react";
import {
  Alert,
  Badge,
  Button,
  Card,
  Center,
  Grid,
  Group,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { useLocalStorageValue } from "@mantine/hooks";
import { AlertIcon } from "@primer/octicons-react";
import { Command } from "@tauri-apps/api/shell";
import _ from "lodash";
import { nanoid } from "nanoid";
import React from "react";
import { FILES } from "../utils/globalStates";
import { deleteFile } from "../utils/requests";

function Start() {
  const theme = useMantineTheme();

  const secondaryColor =
    theme.colorScheme === "dark" ? theme.colors.dark[1] : theme.colors.gray[7];

  const files = useValue(FILES);

  return (
      <>
      {files.length === 0 ? 
        <Center>
          <Alert
            icon={<AlertIcon size={16} />}
            title="Información"
            color="yellow"
          >
            Aqui Apareceran los archivos que vayas creando
          </Alert>
        </Center>
       : 
        <Grid>
          {files.map((file, index) => (
            <Grid.Col key={nanoid()} span={3} style={{ width: 340 }}>
              <Card shadow="sm" >
                <Group
                  position="apart"
                  style={{ marginBottom: 5, marginTop: theme.spacing.sm }}
                >
                  <Text weight={500}>{file}</Text>
                  {_.startsWith(file, "one") ? (
                    <Badge color="black" variant="light">
                      Un Dia
                    </Badge>
                  ) : (
                    <Badge color={"red"}>18 Dias</Badge>
                  )}
                </Group>
                <a
                  style={{ textDecoration: "none" }}
                  href={`http://localhost:4000/file/${file}`}
                  download
                >
                  <Button
                    variant="light"
                    color="green"
                    fullWidth
                    style={{ marginTop: 14 }}
                  >
                    Descargar
                  </Button>
                </a>

                <Button
                  variant="light"
                  color="red"
                  fullWidth
                  onClick={() => deleteFile(file)}
                  style={{ marginTop: 14 }}
                >
                  Eliminar
                </Button>
              </Card>
            </Grid.Col>
          ))}
        </Grid>
      }
    </> 
  );
}

export default Start;
