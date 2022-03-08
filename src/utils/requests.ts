import ky from "ky"

const server = "http://localhost:4000"

export function getUsers() {
  ky.get(`${server}/db/users`).then(res => console.log(res.body))
}