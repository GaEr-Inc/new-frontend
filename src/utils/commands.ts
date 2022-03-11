import { Command } from "@tauri-apps/api/shell"
import path from "path";

let install: Command = new Command('cmd', ['/c' ,'yarn','--cwd', './bootstrap/backend/dist/main.js'] );
let backend: Command = new Command('node', './bootstrap/backend/dist/main.js');
let backendinst = await backend.spawn()
export async function restartBackend() {
  await install.spawn();
  await backendinst?.kill()
  backendinst = await backend.spawn()
}

export async function stopBackend() {
  backendinst.kill()
}