import { useState } from "react"

export default function Miner(){

 const [hash,setHash] = useState("")
 const [nonce,setNonce] = useState(0)

 const mine = async () => {

  const result = await window.miner.mine(nonce)

  setHash(result)
  setNonce(nonce+1)

 }

 return(

  <div>

   <button onClick={mine}>
    Start Mining
   </button>

   <p>Nonce: {nonce}</p>

   <p>Hash: {hash}</p>

  </div>

 )

}