"use client";

import { useState } from "react";

export default function Miner() {

  const [status, setStatus] = useState("idle");

  const startMining = async () => {

    try {

      setStatus("loading wasm");

      // load wasm file
      const response = await fetch("/wasm-miner/miner_bg.wasm");

      const bytes = await response.arrayBuffer();

      // initialize wasm
      const wasm = await WebAssembly.instantiate(bytes, {});

      console.log("WASM loaded:", wasm);

      setStatus("mining");

    } catch (err) {

      console.error("Miner error:", err);

      setStatus("miner failed");

    }

  };

  return (

    <div style={{ textAlign: "center", padding: "20px" }}>

      <h2>HashQuest Miner</h2>

      <p>Status: {status}</p>

      <button onClick={startMining}>
        Start Mining
      </button>

    </div>

  );

}