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
import { AlertIcon, InfoIcon } from "@primer/octicons-react";
import _ from "lodash";
import { nanoid } from "nanoid";
import { FILES } from "../utils/globalStates";
import { deleteFile } from "../utils/requests";

function Start() {
  const theme = useMantineTheme();

  const secondaryColor =
    theme.colorScheme === "dark" ? theme.colors.dark[1] : theme.colors.gray[7];

  const files = useValue(FILES);

  return (
    <>
      {files.length === 0 ? (
        <Center style={{ paddingTop: "3%" }}>
          <Alert
            variant="light"
            style={{ width: "50%" }}
            icon={<InfoIcon size={16} />}
            title="Información"
            color="teal"
          >
            Aqui aparecerán los archivos que vayas creando.
          </Alert>
        </Center>
      ) : (
        <Grid>
          {files.map((file, index) => (
            <Grid.Col
              key={nanoid()}
              span={3}
              style={{ width: 340, minWidth: 310 }}
            >
              <Card shadow="sm">
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
      )}
    </>
  );
}

export default Start;
