import { useAgile } from "@agile-ts/react";
import {
  ActionIcon,
  Badge,
  Box,
  Button,
  Checkbox,
  Loader,
  Modal,
  ScrollArea,
  Table,
  Tabs,
  Text,
  TextInput,
  ThemeIcon,
  TransferList,
  TransferListData,
} from "@mantine/core";
import { useForm, useId } from "@mantine/hooks";
import {
  EyeIcon,
  ImageIcon,
  ListUnorderedIcon,
  PencilIcon,
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
import { deleteUserById, getNumbersByColor, getUsers } from "../utils/requests";

function UserManager() {
  const uuid = useId();
  const users = useAgile(USERS_STATE);
  const form = useForm({
    initialValues: {
      name: "",
      number: "",
    },
  });
  const [userReds, setuserReds] = useState<TransferListData>([[], []]);
  const [userRandomReds, setRandomuserReds] = useState<TransferListData>([
    [],
    [],
  ]);
  const [userGreens, setuserGreens] = useState<TransferListData>([[], []]);
  const [userRandomGreens, setuserRandomGreens] = useState<TransferListData>([
    [],
    [],
  ]);
  const [userBlues, setuserBlues] = useState<TransferListData>([[], []]);
  const [userRandomBlues, setuserRandomBlues] = useState<TransferListData>([
    [],
    [],
  ]);
  const editUser = async (user: User, randoms: boolean) => {
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
  };

  const [opened, setOpened] = useState<boolean>(false);
  const [userId, setUserId] = useState<string>("");
  return (
    <div>
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
              <td>
                {opened && userId === user.id ? (
                  <Loader style={{ marginInline: 5 }} size="sm" />
                ) : (
                  <ThemeIcon
                    style={{ marginInline: 5 }}
                    onClick={() => {
                      setOpened(true);
                      setUserId(user.id);
                      editUser(user);
                    }}
                    radius={10}
                  >
                    <PencilIcon />
                  </ThemeIcon>
                )}
                <ThemeIcon
                  style={{ marginInline: 5 }}
                  onClick={() => deleteUserById(user.id)}
                  radius={10}
                >
                  <TrashIcon />
                </ThemeIcon>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Modal
        opened={opened}
        onClose={() => {
          setOpened(false);
        }}
        title="Editar Usuario"
      >
        <form onSubmit={form.onSubmit((values) => console.log(values))}>
          <TextInput
            required
            label="Nombre"
            placeholder=""
            {...form.getInputProps("name")}
          />
          <TextInput
            required
            label="Numero"
            placeholder="your@email.com"
            {...form.getInputProps("number")}
          />
          <Tabs>
            <Tabs.Tab color="red" label="Rojos" icon={<ListUnorderedIcon />}>
              <TransferList
                searchPlaceholder="Busqueda..."
                nothingFound="No se encontro"
                value={userReds}
                onChange={setuserReds}
              />
            </Tabs.Tab>
            <Tabs.Tab color="green" label="Verdes" icon={<ListUnorderedIcon />}>
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

          <Button style={{marginTop: 15}} type="submit">Submit</Button>
        </form>
      </Modal>
    </div>
  );
}

export default UserManager;
