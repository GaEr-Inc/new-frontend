import axios from "axios";
import { day } from "../components/PrinterManager";
import {
  CONNECTION_STATE,
  FILES,
  NUMBERS,
  NUMBERS_BLUE,
  NUMBERS_GREEN,
  NUMBERS_RED,
  USERS_STATE,
} from "./globalStates";
import { GlobalNumber, User } from "./interfaces";

const server = "http://localhost:4000";

export async function getUsers(): Promise<User[]> {
  return (await axios.get(`${server}/db/users`)).data;
}

export async function getFiles() {
  return (await axios.get(`${server}/files`)).data;
}

export function deleteFile(file: string) {
  axios.get(`${server}/file/delete/${file}`);
}

export async function getNumbers(): Promise<
  [GlobalNumber[], GlobalNumber[], GlobalNumber[]]
> {
  return (await axios.get(`${server}/db/numbers`)).data;
}

export async function getToken(): Promise<string> {
  return (await axios.get(`${server}/db/token`)).data;
}

export async function getNumbersByColor(
  color: "red" | "green" | "blue"
): Promise<GlobalNumber[]> {
  return (await axios.get(`${server}/db/numbers/${color}`)).data;
}

export function deleteUserById(id: string) {
  axios.delete(`${server}/db/users/delete/${id}`);
}

export function updateUserToDB(user: User) {
  axios.post(`${server}/db/users/update`, {
    id: user.id,
    name: user.name,
    phoneNumber: user.phoneNumber,
    numbers: {
      red: {
        asignedNumbers: user.numbers.red.asignedNumbers,
        randomNumbers: user.numbers.red.randomNumbers,
      },
      green: {
        asignedNumbers: user.numbers.green.asignedNumbers,
        randomNumbers: user.numbers.green.randomNumbers,
      },
      blue: {
        asignedNumbers: user.numbers.blue.asignedNumbers,
        randomNumbers: user.numbers.blue.randomNumbers,
      },
    },
    maxRandomNumbers: {
      red: user.maxRandomNumbers.red,
      green: user.maxRandomNumbers.green,
      blue: user.maxRandomNumbers.blue,
    },
  });
}

export function send1ToPrint(day: day) {
  axios.post(`${server}/pdf/printone`, {
    date: day.date,
    lottery1: day.lottery1,
    lottery2: day.lottery2,
    encerrado: day.encerrado,
    number: 3,
    cost: day.cost,
    prize: day.prize,
    template: day.template,
  });
}

export function send18ToPrint(days: day[]) {
  axios.post(`${server}/pdf/print`, days);
}

export function checkBackend() {
  axios
    .get(`${server}/status`, { timeout: 500 })
    .then((res) => {
      CONNECTION_STATE.set(true);
    })
    .catch((reason) => {
      CONNECTION_STATE.set(false);
    });
}

export function addUser(user: User) {
  axios.post(`${server}/db/users/create`, {
    id: user.id,
    name: user.name,
    phoneNumber: user.phoneNumber,
    numbers: {
      red: {
        asignedNumbers: user.numbers.red.asignedNumbers,
        randomNumbers: user.numbers.red.randomNumbers,
      },
      green: {
        asignedNumbers: user.numbers.green.asignedNumbers,
        randomNumbers: user.numbers.green.randomNumbers,
      },
      blue: {
        asignedNumbers: user.numbers.blue.asignedNumbers,
        randomNumbers: user.numbers.blue.randomNumbers,
      },
    },
    maxRandomNumbers: {
      red: user.maxRandomNumbers.red,
      green: user.maxRandomNumbers.green,
      blue: user.maxRandomNumbers.blue,
    },
  });
}

export function resetAll() {
  axios.delete(`${server}/db/all`);
}

export async function updateAll() {
  checkBackend();
  if (CONNECTION_STATE._value === true) {
    USERS_STATE.set(await getUsers());
    FILES.set(await getFiles());
    NUMBERS.set(await getNumbers());
    if (
      NUMBERS_RED.value.length === 0 &&
      NUMBERS_GREEN._value.length === 0 &&
      NUMBERS_BLUE.value.length === 0 &&
      localStorage.getItem("dbstarted") === null
    ) {
      axios.delete(`${server}/db/all`);
      localStorage.setItem("dbstarted", "true");
    }
    NUMBERS_RED.set(await getNumbersByColor("red"));
    NUMBERS_GREEN.set(await getNumbersByColor("green"));
    NUMBERS_BLUE.set(await getNumbersByColor("blue"));
  }
}
