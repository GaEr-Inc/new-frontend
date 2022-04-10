import { useValue } from "@agile-ts/react";
import {
  Alert,
  Badge,
  Button,
  Card,
  Center,
  Grid,
  Group,
  Modal,
  ScrollArea,
  Text,
  ThemeIcon,
  useMantineTheme,
} from "@mantine/core";
import { resetAll } from "../utils/requests";
import {
  useScrollLock,
  useViewportSize,
  useLocalStorageValue,
} from "@mantine/hooks";
import { useModals } from "@mantine/modals";
import {
  AlertFillIcon,
  AlertIcon,
  FeedHeartIcon,
  InfoIcon,
} from "@primer/octicons-react";
import _, { first } from "lodash";
import { nanoid } from "nanoid";
import { useState } from "react";
import { FILES } from "../utils/globalStates";
import { deleteFile } from "../utils/requests";

function Start() {
  const { height, width } = useViewportSize();
  const theme = useMantineTheme();
  const [firstStart, setFirstStart] = useLocalStorageValue({
    key: "firstOpen",
    defaultValue: JSON.stringify(true),
  });
  const [showModal, setShowModal] = useState<boolean>(false);

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
    if (width <= 768) {
      return width - 50;
    } else {
      return width - 315;
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
      <Modal
        centered
        opened={JSON.parse(localStorage.getItem("firstOpen") || "[]")}
        closeOnClickOutside={false}
        closeOnEscape={false}
        hideCloseButton
        onClose={() => console.log("cerrando")}
        size="700px"
      >
        <Alert
          icon={
            <ThemeIcon radius="xl" color="red">
              <FeedHeartIcon size={20} />
            </ThemeIcon>
          }
          title="Raffle Manager te da la bienvenida"
          color="teal"
        >
          <Text>
            Raffle Manager será muy útil para la creación, personalización y
            asignación de sus boletas.
          </Text>
          <div style={{ paddingBottom: "5px", paddingRight: "5px" }}>
            <Group position="right">
              <Button
                // variant="gradient"
                radius="xl"
                // gradient={{ from: "teal", to: "lime", deg: 105 }}
                color="teal"
                onClick={() => {
                  setFirstStart(JSON.stringify(false));
                  resetAll();
                }}
              >
                Continuar
              </Button>
            </Group>
          </div>
        </Alert>
      </Modal>
    </ScrollArea>
  );
}

export default Start;
