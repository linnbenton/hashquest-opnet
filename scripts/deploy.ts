import { JSONRpcProvider } from "opnet";

async function deploy() {

  console.log("Starting deploy script...");

  const provider = new JSONRpcProvider({
    url: "https://testnet.opnet.org"
  } as any);

  console.log("Connected to OPNet Testnet");

}

deploy();