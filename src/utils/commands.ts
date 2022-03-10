import { Command } from "@tauri-apps/api/shell"

export async function restartBackend() {
  await new Command('wsl', ['killall', 'v2']).spawn()
  await new Command('wsl', ['exec', '~/backend/v2']).execute()
}

export async function stopBackend() {
  await new Command('wsl', ['killall', 'v2']).execute()
}