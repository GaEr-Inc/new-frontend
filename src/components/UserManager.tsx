import { useAgile } from "@agile-ts/react";
import { ActionIcon, Badge, Box, Button, Table, Text, ThemeIcon } from "@mantine/core";
import { EyeIcon, PencilIcon } from "@primer/octicons-react";
import React from "react";
import { NUMBERS, NUMBERS_RED, USERS_STATE } from "../utils/globalStates";
import { User } from "../utils/interfaces";
import { getUsers } from "../utils/requests";

function UserManager() {
  const users = useAgile(USERS_STATE);

  return (
    <div>
      <Table>
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
                <Text  size="md">{user.name}</Text>
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
                  <Badge  style={{ marginRight: 2 }} color='red' variant="outline">{user.maxRandomNumbers.red}</Badge>  
                  <Badge style={{ marginInline: 2 }} color='green' variant="outline">{user.maxRandomNumbers.green}</Badge>  
                  <Badge style={{ marginLeft: 2 }} variant="outline">{user.maxRandomNumbers.blue}</Badge>  
                </>
              </td>
              <td>
                <ThemeIcon onClick={() => console.log("Hello")} radius={10}>
                  <PencilIcon/>
                </ThemeIcon>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}



export default UserManager;
