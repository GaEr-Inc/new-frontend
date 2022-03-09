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
  useMantineColorScheme,
  MantineProvider,
  Button,
} from "@mantine/core";
import {
  DatabaseIcon,
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
import { TOKEN } from "./utils/globalStates";
import { getToken, getUsers, updateAll } from "./utils/requests";
import { useAgile } from "@agile-ts/react";
import * as _ from "lodash";

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
  const updateUsersInterval = useInterval(async () => {
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

  return (
    <MantineProvider
      theme={dark ? { colorScheme: "dark" } : { colorScheme: "light" }}
      withGlobalStyles
    >
      <AppShell
        navbarOffsetBreakpoint="sm"
        fixed
        className={classes.app}
        // NavBar
        navbar={
          <Navbar
            padding="md"
            hiddenBreakpoint="sm"
            hidden={!opened}
            width={{ sm: 400, lg: 400 }}
          >
            <Link to="/" style={{ textDecoration: "none" }}>
              <NavButton icon={<HomeIcon />} color={"blue"} label={"Inicio"} />
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
                icon={<PeopleIcon />}
                color={"red"}
                label={"Imprimir"}
              />
            </Link>
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
        </Routes>
      </AppShell>
    </MantineProvider>
  );
}

export default App;
