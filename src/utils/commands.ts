import { Child, Command } from "@tauri-apps/api/shell";

const startBackend = new Command('cmd', ['/c', 'raffle-backend'])
let backendChild: Child;
export async function restartBackend() {
  // const installYarn = await new Command('cmd', ['/c', 'npm', 'i', '-g', 'yarn']).execute()
  // console.log(installYarn.stdout)
  // const installDeps = await new Command('cmd', ['/c', 'install-raffle-deps']).execute()
  // console.log(installDeps.stdout)
  startBackend.stdout.on("data", (data) => console.log(data));
  startBackend.stderr.on("data", (data) => console.log(data));
  backendChild = await startBackend.spawn()
}

export async function stopBackend() {
  const killBackend = await new Command('taskkill', ["/IM" ,'node.exe', '/F']).execute()
  console.log(killBackend.stdout)
}