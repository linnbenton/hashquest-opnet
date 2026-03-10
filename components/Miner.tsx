"use client";

import { useEffect, useState } from "react";

export default function Miner() {

  const [miner, setMiner] = useState<any>(null);
  const [status, setStatus] = useState("idle");
  const [wallet, setWallet] = useState<string | null>(null);

  // load wasm miner
  useEffect(() => {

    async function loadMiner() {

      try {

        const module = await import(
          /* webpackIgnore: true */
          "/wasm-miner/miner.js"
        );

        await module.default();

        setMiner(module);
        setStatus("miner ready");

        console.log("Miner loaded:", module);

      } catch (err) {

        console.error("Miner load error:", err);
        setStatus("miner failed");

      }

    }

    loadMiner();

  }, []);

  // connect OPNet wallet
  const connectWallet = async () => {

    if (!(window as any).opnet) {

      alert("Please install OPNet Wallet");

      return;

    }

    try {

      const result = await (window as any).opnet.connect();

      console.log("Wallet:", result);

      setWallet(result.address);

    } catch (err) {

      console.error("Wallet connection failed:", err);

    }

  };

  // start mining
  const startMining = () => {

    if (!miner) {

      alert("Miner not ready");

      return;

    }

    console.log("Start mining...");

    if (miner.start) {
      miner.start();
    }

    setStatus("mining");

  };

  return (

    <div style={{padding:"20px"}}>

      <h2>HashQuest Miner</h2>

      <p>Status: {status}</p>

      {wallet ? (
        <p>Wallet: {wallet}</p>
      ) : (
        <button onClick={connectWallet}>
          Connect OPNet Wallet
        </button>
      )}

      <br/><br/>

      <button onClick={startMining}>
        Start Mining
      </button>

    </div>

  );

}