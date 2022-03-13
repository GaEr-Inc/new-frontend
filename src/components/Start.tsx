import { useValue } from "@agile-ts/react";
import {
  Alert,
  Badge,
  Button,
  Card,
  Center,
  Grid,
  Group,
  ScrollArea,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { useScrollLock, useViewportSize } from "@mantine/hooks";
import { AlertIcon, InfoIcon } from "@primer/octicons-react";
import _ from "lodash";
import { nanoid } from "nanoid";
import { FILES } from "../utils/globalStates";
import { deleteFile } from "../utils/requests";

function Start() {
  const { height, width } = useViewportSize();
  const theme = useMantineTheme();

  const secondaryColor =
    theme.colorScheme === "dark" ? theme.colors.dark[1] : theme.colors.gray[7];

  const files = useValue(FILES);
  // const files = [
  //   "FILES",
  //   "FILES",
  //   "FILES",
  //   "FILES",
  //   "FILES",
  //   "FILES",
  //   "FILES",
  //   "FILES",
  //   "FILES",
  //   "FILES",
  //   "FILES",
  //   "FILES",
  //   "FILES",
  //   "FILES",
  //   "FILES",
  //   "FILES",
  //   "FILES",
  //   "FILES",
  //   "FILES",
  //   "FILES",
  //   "FILES",
  //   "FILES",
  //   "FILES",
  //   "FILES",
  //   "FILES",
  //   "FILES",
  //   "FILES",
  //   "FILES",
  //   "FILES",
  //   "FILES",
  //   "FILES",
  // ];
  useScrollLock(true);

  function appWidth() {
    if (width<=768) {
      return (width - 50)
    } else {
      return (width - 315)
    }
  }

  return (
    <ScrollArea
      style={{ height: height - 120, width: appWidth() }}
      offsetScrollbars
    >
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
          <div style={{ paddingLeft: "3%" }}>
            <Grid>
              {files.map((file, index) => (
                <Grid.Col
                  key={nanoid()}
                  span={3}
                  style={{ width: 290, minWidth: 222 }}
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
          </div>
        )}
      </>
    </ScrollArea>
  );
}

export default Start;
