import axios from "axios"
import { NUMBERS, NUMBERS_BLUE, NUMBERS_GREEN, NUMBERS_RED, USERS_STATE } from "./globalStates"
import { GlobalNumber, User } from "./interfaces"

const server = "http://localhost:4000"

export async function getUsers(): Promise<User[]> {
  return (await axios.get(`${server}/db/users`)).data
}

export async function getNumbers(): Promise<[GlobalNumber[], GlobalNumber[], GlobalNumber[]]> {
  return (await axios.get(`${server}/db/numbers`)).data  
}

export async function getToken(): Promise<string> {
  return (await axios.get(`${server}/db/token`)).data
}

export async function getNumbersByColor(color: 'red' | 'green' | 'blue'): Promise<GlobalNumber[]> {
  return (await axios.get(`${server}/db/numbers/${color}`)).data
}

export function deleteUserById(id:string) {
  axios.delete(`${server}/db/users/delete/${id}`)
}

export async function updateAll() {
  USERS_STATE.set(await getUsers());
  NUMBERS.set(await getNumbers());
  NUMBERS_RED.set(await getNumbersByColor("red"))
  NUMBERS_GREEN.set(await getNumbersByColor("green"))
  NUMBERS_BLUE.set(await getNumbersByColor("blue"))
}