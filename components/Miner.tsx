"use client"

import { useState,useRef } from "react"

export default function Miner(){

  const [status,setStatus] = useState("Ready")
  const [hashrate,setHashrate] = useState(0)

  const mining = useRef(false)

  async function start(){

    if(mining.current) return

    mining.current = true
    setStatus("Mining")

    let hashes = 0
    const start = Date.now()

    while(mining.current){

      hashes++

      if(hashes % 10000 === 0){

        const seconds = (Date.now()-start)/1000

        setHashrate(Math.floor(hashes/seconds))

        await new Promise(r=>setTimeout(r,0))

      }

    }

  }

  function stop(){

    mining.current = false
    setStatus("Stopped")

  }

  return(

    <div style={{marginTop:30}}>

      <h2>CPU Miner</h2>

      <p>Status: {status}</p>

      <p>Hashrate: {hashrate} H/s</p>

      <button
        onClick={start}
        style={{fontSize:18,padding:"10px 20px"}}
      >
        Start Mining
      </button>

      <button
        onClick={stop}
        style={{
          fontSize:18,
          padding:"10px 20px",
          marginLeft:10
        }}
      >
        Stop
      </button>

    </div>

  )

}