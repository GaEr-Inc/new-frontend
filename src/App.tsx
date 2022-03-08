import { useState } from "react";
import {
  AppShell,
  Navbar,
  useMantineTheme,
  Text,
  Header,
  MediaQuery,
  Burger,
  createStyles,
} from "@mantine/core";
import { DatabaseIcon, HomeIcon, PeopleIcon } from "@primer/octicons-react";
import { Link, Route, Routes } from "react-router-dom";
import UserManager from "./components/UserManager";
import NavButton from "./NavButton";
import Start from "./components/Start";

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
}));

function App() {
  const [opened, setOpened] = useState(false);
  const theme = useMantineTheme();
  const { classes } = useStyles();
  return (
    <AppShell
      navbarOffsetBreakpoint="sm"
      fixed
      // NavBar
      navbar={
        <Navbar
          padding="md"
          hiddenBreakpoint="sm"
          hidden={!opened}
          width={{ sm: 400, lg: 400 }}
        >
          <Link to='/' style={{textDecoration: "none"}}>
          <NavButton icon={<HomeIcon/>} color={"blue"} label={"Inicio"}/>
          </Link>
          <Link to='/users' style={{textDecoration: "none"}}>
          <NavButton icon={<PeopleIcon/>} color={"green"} label={"Administrar Usuarios"}/>
          </Link>
        </Navbar>
      }
      // Header
      header={
        <Header height={70} padding="md">
          <div
            style={{ display: "flex", alignItems: "center", height: "100%" }}
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

            <Text>Raffle Manager</Text>
          </div>
        </Header>
      }
    >
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/users" element={<UserManager />} />
      </Routes>
    </AppShell>
  );
}


export default App;
