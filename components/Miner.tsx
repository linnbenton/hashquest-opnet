"use client"

import { useState } from "react"
import { submitHash } from "../hashquest-v4/contracts/miningContract"

export default function Miner() {

 const [hashrate,setHashrate] = useState(0)
 const [wallet,setWallet] = useState<string | null>(null)

 const connectWallet = async () => {

  const opnet = (window as any).opnet

  if (!opnet) {
    alert("Install OPNet wallet")
    return
  }

  try {

    // request account dari wallet
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

  const wasm = await fetch("/miner.wasm")

  const bytes = await wasm.arrayBuffer()

  const module = await WebAssembly.instantiate(bytes,{})

  const miner = module.instance.exports as any

  console.log("miner loaded")

  setInterval(()=>{

   const hash = miner.mine()

   setHashrate(h=>h+1)

   submitHash(wallet!,hash)

  },100)

 }

 return(

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