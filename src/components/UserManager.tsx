import { useAgile } from "@agile-ts/react";
import { Badge, Box, Button, Table, Text } from "@mantine/core";
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
          </tr>
        </thead>
        <tbody>
          {users.map((user: User) => (
            <tr>
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
                  <Badge style={{ marginLeft: 3 }} color='red' variant="outline">Rojo {user.maxRandomNumbers.red}</Badge>  
                  <Badge style={{ marginLeft: 3 }} color='green' variant="outline">Verde {user.maxRandomNumbers.green}</Badge>  
                  <Badge style={{ marginLeft: 3 }} variant="outline">Azul {user.maxRandomNumbers.blue}</Badge>  
                </>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default UserManager;
