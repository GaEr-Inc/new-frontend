import axios from "axios"
import { NUMBERS, NUMBERS_BLUE, NUMBERS_GREEN, NUMBERS_RED, USERS_STATE } from "./globalStates"

const server = "http://localhost:4000"

export async function getUsers() {
  return (await axios.get(`${server}/db/users`)).data
}

export async function getNumbers() {
  return (await axios.get(`${server}/db/numbers`)).data  
}

export async function getToken() {
  return (await axios.get(`${server}/db/token`)).data
}

export async function getNumbersByColor(color: 'red' | 'green' | 'blue') {
  return (await axios.get(`${server}/db/numbers/${color}`)).data
}

export async function updateAll() {
  USERS_STATE.set(await getUsers());
  NUMBERS.set(await getNumbers());
  NUMBERS_RED.set(await getNumbersByColor("red"))
  NUMBERS_GREEN.set(await getNumbersByColor("green"))
  NUMBERS_BLUE.set(await getNumbersByColor("blue"))
}