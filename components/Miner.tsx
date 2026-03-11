"use client"

import { useState } from "react"
import init, { mine } from "../public/miner.js"
import { submitHash } from "../hashquest-v4/contracts/miningContract"

export default function Miner() {

  const [hashrate, setHashrate] = useState(0)
  const [wallet, setWallet] = useState<string | null>(null)

  const connectWallet = async () => {

    const opnet = (window as any).opnet

    if (!opnet) {
      alert("Install OPNet wallet")
      return
    }

    try {

      const accounts = await opnet.request({
        method: "requestAccounts"
      })

      console.log("Wallet:", accounts)

      if (accounts && accounts.length > 0) {
        setWallet(accounts[0])
      }

    } catch (err) {

      console.error("Wallet connection failed:", err)

    }

  }

  const startMining = async () => {

    try {

      const wasm = await import("/miner.js")

      // inisialisasi WASM dengan path file
    await wasm.default("/miner_bg.wasm")

      console.log("miner loaded")

      setInterval(() => {

        const hash = mine()

        setHashrate(h => h + 1)

        if(wallet){
          submitHash(wallet, hash)
        }

      }, 100)

    } catch (err) {

      console.error("WASM load failed:", err)

    }

  }

  return (

    <div>

      <h1>HashQuest Miner</h1>

      {!wallet && (
        <button onClick={connectWallet}>
          Connect Wallet
        </button>
      )}

      {wallet && (
        <p>Wallet: {wallet}</p>
      )}

      <button onClick={startMining}>
        Start Mining
      </button>

      <p>Hashrate: {hashrate}</p>

    </div>

  )

}