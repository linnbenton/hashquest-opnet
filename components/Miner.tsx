"use client"

import { useState } from "react"
import { submitHash } from "../hashquest-v4/contracts/miningContract"

export default function Miner() {

 const [hashrate,setHashrate] = useState(0)
 const [wallet,setWallet] = useState<string | null>(null)

 const connectWallet = async () => {

  if(!(window as any).opnet){
   alert("Install OPNet wallet")
   return
  }

  const w = await (window as any).opnet.connect()

  setWallet(w.address)

  console.log("Wallet:",w)

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