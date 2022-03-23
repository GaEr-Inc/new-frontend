import { useAgile } from "@agile-ts/react";
import {
  ActionIcon,
  Affix,
  Badge,
  Box,
  Button,
  Checkbox,
  Divider,
  Loader,
  Modal,
  NumberInput,
  ScrollArea,
  Table,
  Tabs,
  Text,
  TextInput,
  ThemeIcon,
  TransferList,
  TransferListData,
  Transition,
} from "@mantine/core";
import { useForm, useId, useScrollLock, useViewportSize } from "@mantine/hooks";
import {
  ArrowUpIcon,
  EyeIcon,
  ImageIcon,
  ListUnorderedIcon,
  PencilIcon,
  PlusCircleIcon,
  TrashIcon,
} from "@primer/octicons-react";
import React, { useState } from "react";
import {
  NUMBERS,
  NUMBERS_BLUE,
  NUMBERS_GREEN,
  NUMBERS_RED,
  USERS_STATE,
} from "../utils/globalStates";
import { User } from "../utils/interfaces";
import {
  addUser,
  deleteUserById,
  getNumbersByColor,
  getUsers,
  updateUserToDB,
} from "../utils/requests";

function UserManager() {
  const uuid = useId();
  const users = useAgile(USERS_STATE);
  const form = useForm({
    initialValues: {
      name: "",
      number: "",
      red: 0,
      green: 0,
      blue: 0,
    },
  });
  const [userReds, setuserReds] = useState<TransferListData>([[], []]);
  const [userGreens, setuserGreens] = useState<TransferListData>([[], []]);
  const [userBlues, setuserBlues] = useState<TransferListData>([[], []]);
  const editUser = (user: User) => {
    let redGlobals: TransferListData = [[], []];
    const currentReds = NUMBERS_RED._value;
    currentReds.map((num) =>
      redGlobals[0].push({ label: num.textNumber, value: num.textNumber })
    );
    user.numbers.red.asignedNumbers.map((num) =>
      redGlobals[1].push({
        label: num.toString(),
        value: num.toString(),
        group: "Asignados",
      })
    );
    user.numbers.red.randomNumbers.map((num) =>
      redGlobals[1].push({
        label: num.toString(),
        value: num.toString(),
        group: "Aleatorios",
      })
    );
    setuserReds(redGlobals);
    let greenGlobals: TransferListData = [[], []];
    const currentGreens = NUMBERS_GREEN._value;
    currentGreens.map((num) =>
      greenGlobals[0].push({ label: num.textNumber, value: num.textNumber })
    );
    user.numbers.green.asignedNumbers.map((num) =>
      greenGlobals[1].push({
        label: num.toString(),
        value: num.toString(),
        group: "Asignados",
      })
    );
    user.numbers.green.randomNumbers.map((num) =>
      greenGlobals[1].push({
        label: num.toString(),
        value: num.toString(),
        group: "Aleatorios",
      })
    );
    setuserGreens(greenGlobals);
    let blueGlobals: TransferListData = [[], []];
    const currentBlues = NUMBERS_BLUE._value;
    currentBlues.map((num) =>
      blueGlobals[0].push({ label: num.textNumber, value: num.textNumber })
    );
    user.numbers.blue.asignedNumbers.map((num) =>
      blueGlobals[1].push({
        label: num.toString(),
        value: num.toString(),
        group: "Asignados",
      })
    );
    user.numbers.blue.randomNumbers.map((num) =>
      blueGlobals[1].push({
        label: num.toString(),
        value: num.toString(),
        group: "Aleatorios",
      })
    );
    setuserBlues(blueGlobals);
    return user;
  };
  const { height, width } = useViewportSize();
  const [opened, setOpened] = useState<boolean>(false);
  const [deleting, setDeleting] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<User | undefined>();
  const [userId, setUserId] = useState<string>("");
  const updateUser = (user: User) => {
    const newReds: number[] = [];
    userReds[1].map((num) =>
      num.group === "Aleatorio"
        ? console.log("Aleatorio")
        : newReds.push(parseInt(num.value))
    );
    const newGreens: number[] = [];
    userGreens[1].map((num) =>
      num.group === "Aleatorio"
        ? console.log("Aleatorio")
        : newGreens.push(parseInt(num.value))
    );
    const newBlues: number[] = [];
    userBlues[1].map((num) =>
      num.group === "Aleatorio"
        ? console.log("Aleatorio")
        : newBlues.push(parseInt(num.value))
    );
    user.numbers.red.asignedNumbers = newReds;
    user.numbers.green.asignedNumbers = newGreens;
    user.numbers.blue.asignedNumbers = newBlues;
  };
  useScrollLock(true);
  console.log(height, width);
  return (
    <div>
      <Divider my="sm" />
      <ScrollArea style={{ height: height - 180 }} offsetScrollbars>
        <Table highlightOnHover>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Telefono</th>
              <th>Numeros</th>
              <th>Numeros Aleatorios</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user: User) => (
              <tr key={user.id}>
                <td>
                  <Text size="md">{user.name}</Text>
                </td>
                <td>{user.phoneNumber}</td>
                <td>
                  {
                    <>
                      <Badge
                        style={{ marginRight: 3 }}
                        color="red"
                        variant="filled"
                      >
                        Rojo
                      </Badge>
                      <Badge
                        style={{ marginInline: 3 }}
                        color="green"
                        variant="filled"
                      >
                        Verde
                      </Badge>
                      <Badge style={{ marginLeft: 3 }} variant="filled">
                        Azul
                      </Badge>
                    </>
                  }
                </td>
                <td>
                  <>
                    <Badge
                      style={{ marginRight: 2 }}
                      color="red"
                      variant="outline"
                    >
                      {user.maxRandomNumbers.red}
                    </Badge>
                    <Badge
                      style={{ marginInline: 2 }}
                      color="green"
                      variant="outline"
                    >
                      {user.maxRandomNumbers.green}
                    </Badge>
                    <Badge style={{ marginLeft: 2 }} variant="outline">
                      {user.maxRandomNumbers.blue}
                    </Badge>
                  </>
                </td>
                <td style={{ display: "flex" }}>
                  {opened && userId === user.id ? (
                    <Loader style={{ marginInline: 5 }} size="sm" />
                  ) : (
                    <ActionIcon
                      variant="filled"
                      color="blue"
                      style={{ marginInline: 5 }}
                      onClick={() => {
                        setOpened(true);
                        setUserId(user.id);
                        form.setFieldValue("number", user.phoneNumber);
                        form.setFieldValue("name", user.name);
                        form.setFieldValue("red", user.maxRandomNumbers.red);
                        form.setFieldValue(
                          "green",
                          user.maxRandomNumbers.green
                        );
                        form.setFieldValue("blue", user.maxRandomNumbers.blue);
                        setCurrentUser(user);
                        editUser(user);
                      }}
                      radius={10}
                    >
                      <PencilIcon />
                    </ActionIcon>
                  )}
                  {deleting && user.id === userId ? (
                    <Loader style={{ marginInline: 5 }} size="sm" />
                  ) : (
                    <ActionIcon
                      color="blue"
                      variant="filled"
                      style={{ marginInline: 5 }}
                      onClick={() => {
                        setDeleting(true);
                        setUserId(user.id)
                        deleteUserById(user.id, setDeleting);
                      }}
                      radius={10}
                    >
                      <TrashIcon />
                    </ActionIcon>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </ScrollArea>
      <Modal
        centered
        opened={opened}
        onClose={() => {
          setOpened(false);
        }}
        title="Editar Usuario"
      >
        <ScrollArea style={{ height: height - 160 }} offsetScrollbars>
          <form
            onSubmit={form.onSubmit(
              (values: {
                name: string;
                number: string;
                red: number;
                green: number;
                blue: number;
              }) => {
                const editedUser: User | undefined = currentUser
                  ? editUser(currentUser)
                  : undefined;
                if (editedUser) {
                  editedUser.name = values.name;
                  editedUser.phoneNumber = values.number;
                  editedUser.maxRandomNumbers.red = values.red;
                  editedUser.maxRandomNumbers.green = values.green;
                  editedUser.maxRandomNumbers.blue = values.blue;
                  updateUser(editedUser);
                  userId === "nanoid"
                    ? addUser(editedUser)
                    : updateUserToDB(editedUser);
                  console.log(values);
                  setOpened(false);
                  form.reset();
                }
              }
            )}
          >
            <TextInput
              required
              label="Nombre"
              placeholder="Antonio"
              {...form.getInputProps("name")}
            />
            <TextInput
              required
              label="Numero"
              placeholder="31000000"
              {...form.getInputProps("number")}
            />
            <NumberInput
              required
              label="Numeros Aleatorios Rojos"
              {...form.getInputProps("red")}
            />
            <NumberInput
              required
              label="Numeros Aleatorios Verdes"
              {...form.getInputProps("green")}
            />
            <NumberInput
              required
              label="Numeros Aleatorios Azules"
              {...form.getInputProps("blue")}
            />
            <Tabs>
              <Tabs.Tab color="red" label="Rojos" icon={<ListUnorderedIcon />}>
                <TransferList
                  searchPlaceholder="Busqueda..."
                  nothingFound="No se encontró..."
                  value={userReds}
                  onChange={setuserReds}
                />
              </Tabs.Tab>
              <Tabs.Tab
                color="green"
                label="Verdes"
                icon={<ListUnorderedIcon />}
              >
                <TransferList
                  searchPlaceholder="Busqueda..."
                  nothingFound="No se encontro"
                  value={userGreens}
                  onChange={setuserGreens}
                />
              </Tabs.Tab>
              <Tabs.Tab label="Azules" icon={<ListUnorderedIcon />}>
                <TransferList
                  searchPlaceholder="Busqueda..."
                  nothingFound="No se encontro"
                  value={userBlues}
                  onChange={setuserBlues}
                />
              </Tabs.Tab>
            </Tabs>
            <Button style={{ marginTop: 15 }} type="submit">
              Guardar
            </Button>
          </form>
        </ScrollArea>
      </Modal>
      <Affix
        style={{ display: opened ? "none" : "" }}
        position={{ bottom: 20, right: 50 }}
      >
        <Button
          leftIcon={<PlusCircleIcon />}
          onClick={() => {
            let voidUser: User = {
              name: "",
              phoneNumber: "",
              id: "nanoid",
              maxRandomNumbers: { blue: 0, green: 0, red: 0 },
              numbers: {
                blue: { asignedNumbers: [], randomNumbers: [] },
                green: { asignedNumbers: [], randomNumbers: [] },
                red: { asignedNumbers: [], randomNumbers: [] },
              },
            };
            setCurrentUser(voidUser);
            form.reset();
            editUser(voidUser);
            setUserId("nanoid");
            setOpened(true);
          }}
        >
          Añadir Usuario
        </Button>
      </Affix>
    </div>
  );
}
export default UserManager;
