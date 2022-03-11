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
  MoonIcon,
  PeopleIcon,
  SunIcon,
} from "@primer/octicons-react";
import { Link, Route, Routes } from "react-router-dom";
import UserManager from "./components/UserManager";
import NavButton from "./NavButton";
import PrinterManager from "./components/PrinterManager";
import Start from "./components/Start";
import { useInterval } from "@mantine/hooks";
import { CONNECTION_STATE, TOKEN } from "./utils/globalStates";
import { getToken, getUsers, updateAll } from "./utils/requests";
import reactIntegration, { useAgile } from "@agile-ts/react";
import TemplateEditor from "./components/TemplateEditor";
import * as _ from "lodash";
import { restartBackend, stopBackend } from "./utils/commands";
import { shared } from "@agile-ts/core";
import { NotificationsProvider } from "@mantine/notifications";
import PrinterReWork from "./components/PrinterReWork";
import TemplateSelector from "./TemplateSelector";

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

  const [opened, setOpened] = useState(false);
  const theme = useMantineTheme();
  const { classes } = useStyles();

  useEffect(() => {
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
              width={{ sm: 400, lg: 400 }}
            >
              <Navbar.Section grow>
                <Link to="/" style={{ textDecoration: "none" }}>
                  <NavButton
                    icon={<HomeIcon />}
                    color={"blue"}
                    label={"Inicio"}
                  />
                </Link>
                <Link to="/users" style={{ textDecoration: "none" }}>
                  <NavButton
                    icon={<PeopleIcon />}
                    color={"green"}
                    label={"Administrar Usuarios"}
                  />
                </Link>
                <Link to="/printer" style={{ textDecoration: "none" }}>
                  <NavButton
                    icon={<FileSymlinkFileIcon />}
                    color="red"
                    label={"Imprimir"}
                  />
                </Link>
                <Link to="/templateEditor" style={{ textDecoration: "none" }}>
                  <NavButton
                    icon={<FileMediaIcon />}
                    color="grape"
                    label={"Plantillas"}
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
                <MediaQuery largerThan="sm" styles={{ display: "none" }}>
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
          </Routes>
        </AppShell>
      </NotificationsProvider>
    </MantineProvider>
  );
}
export default App;
