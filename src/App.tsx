import { useEffect, useState } from "react";
import {
  AppShell,
  Navbar,
  useMantineTheme,
  Text,
  Header,
  MediaQuery,
  Burger,
  createStyles,
  ActionIcon,
  MantineProvider,
  Button,
} from "@mantine/core";
import {
  AlertFillIcon,
  CheckCircleFillIcon,
  FileMediaIcon,
  FileSymlinkFileIcon,
  HomeIcon,
  InfoIcon,
  MoonIcon,
  PeopleIcon,
  SunIcon,
  ToolsIcon,
} from "@primer/octicons-react";
import { Link, Route, Routes } from "react-router-dom";
import UserManager from "./components/UserManager";
import NavButton from "./NavButton";
import PrinterManager from "./components/PrinterManager";
import Start from "./components/Start";
import { useInterval, useLocalStorageValue, useScrollLock, useViewportSize } from "@mantine/hooks";
import { CONNECTION_STATE, TOKEN } from "./utils/globalStates";
import { getToken, getUsers, resetDB, updateAll } from "./utils/requests";
import reactIntegration, { useAgile } from "@agile-ts/react";
import TemplateEditor from "./components/TemplateEditor";
import * as _ from "lodash";
import { restartBackend, stopBackend } from "./utils/commands";
import { shared } from "@agile-ts/core";
import { NotificationsProvider } from "@mantine/notifications";
import Configuration from "./components/Configuration";
import { client } from "./websockets/wsclient";
import BackendStatus from "./components/BackendStatus";

export const useStyles = createStyles((theme) => ({
  button: {
    display: "block",
    width: "100%",
    padding: theme.spacing.xs,
    borderRadius: theme.radius.sm,
    color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    },
  },
  app: {
    theme: "dark",
  },
}));

function App() {
  shared.integrate(reactIntegration);
  const updateUsersInterval = useInterval(async () => {
    updateAll();
    if (!_.isEqual(await getToken(), TOKEN._value)) {
      updateAll();
      console.log("Globals Updated");
      TOKEN.set(await getToken());
    }
  }, 200);

  const { height, width } = useViewportSize();
  const [opened, setOpened] = useState<boolean>(false);
  const theme = useMantineTheme();
  const { classes } = useStyles();
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

  useEffect(() => {
    restartBackend();

    updateUsersInterval.start();

    return () => {
      updateUsersInterval.stop;
    };
  }, []);

  const [dark, setDark] = useState<boolean>(false);
  const connectionStatus = useAgile(CONNECTION_STATE);
  return (
    <MantineProvider
      theme={dark ? { colorScheme: "dark" } : { colorScheme: "light" }}
      withGlobalStyles
    >
      <NotificationsProvider position="top-right">
        <AppShell
          navbarOffsetBreakpoint="sm"
          fixed
          style={{ minHeight: "100%", minWidth: "100%" }}
          className={classes.app}
          // NavBar
          navbar={
            <Navbar
              padding="md"
              hiddenBreakpoint="sm"
              hidden={!opened}
              width={{ sm: 260, lg: 260 }}
            >
              <Navbar.Section grow>
                <Link
                  onClick={() => setOpened(false)}
                  to="/"
                  style={{ textDecoration: "none" }}
                >
                  <NavButton
                    icon={<HomeIcon />}
                    color={"blue"}
                    label={"Inicio"}
                  />
                </Link>
                <Link
                  onClick={() => setOpened(false)}
                  to="/users"
                  style={{ textDecoration: "none" }}
                >
                  <NavButton
                    icon={<PeopleIcon />}
                    color={"green"}
                    label={"Administrar Usuarios"}
                  />
                </Link>
                <Link
                  onClick={() => setOpened(false)}
                  to="/printer"
                  style={{ textDecoration: "none" }}
                >
                  <NavButton
                    icon={<FileSymlinkFileIcon />}
                    color="red"
                    label={"Imprimir"}
                  />
                </Link>
                <Link
                  onClick={() => setOpened(false)}
                  to="/templateEditor"
                  style={{ textDecoration: "none" }}
                >
                  <NavButton
                    icon={<FileMediaIcon />}
                    color="grape"
                    label={"Plantillas"}
                  />
                </Link>
                <Link
                  onClick={() => setOpened(false)}
                  to="/backendStatus"
                  style={{ textDecoration: "none" }}
                >
                  <NavButton
                    icon={<InfoIcon/>}
                    color="yellow"
                    label={"Progreso"}
                  />
                </Link>
                <Link
                  onClick={() => setOpened(false)}
                  to="/config"
                  style={{ textDecoration: "none" }}
                >
                  <NavButton
                    icon={<ToolsIcon />}
                    color="gray"
                    label={"Configuracion"}
                  />
                </Link>
              </Navbar.Section>
              <Navbar.Section>
                {!connectionStatus ? (
                  <ActionIcon
                    style={{ marginInline: 5 }}
                    size="md"
                    variant="outline"
                    color="red"
                    onClick={() => restartBackend()}
                  >
                    <AlertFillIcon />
                  </ActionIcon>
                ) : (
                  <ActionIcon
                    style={{ marginInline: 5 }}
                    size="md"
                    variant="outline"
                    color="green"
                    onClick={() => stopBackend()}
                  >
                    <CheckCircleFillIcon />
                  </ActionIcon>
                )}
              </Navbar.Section>
            </Navbar>
          }
          // Header
          header={
            <Header height={70} padding="md">
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  height: "100%",
                  width: "100%",
                }}
              >
                <MediaQuery largerThan={768} styles={{ display: "none" }}>
                  <Burger
                    opened={opened}
                    onClick={() => setOpened((o) => !o)}
                    size="sm"
                    color={theme.colors.gray[6]}
                    mr="xl"
                  />
                </MediaQuery>
                <ActionIcon
                  style={{
                    marginInline: 10,
                  }}
                  onClick={() => (dark ? setDark(false) : setDark(true))}
                  title="Toggle color scheme"
                >
                  {dark ? <SunIcon /> : <MoonIcon />}
                </ActionIcon>

                <Text>Raffle Manager</Text>
              </div>
            </Header>
          }
        >
          <Routes>
            <Route path="/" element={<Start />} />
            <Route path="/users" element={<UserManager />} />
            <Route path="/printer" element={<PrinterManager />} />
            <Route path="/templateEditor" element={<TemplateEditor />} />
            <Route path="/backendStatus" element={<BackendStatus/>} />
            <Route path="/config" element={<Configuration />} />
          </Routes>
        </AppShell>
      </NotificationsProvider>
    </MantineProvider>
  );
}
export default App;
