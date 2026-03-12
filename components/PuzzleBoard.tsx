"use client"

import { useState } from "react"

export default function PuzzleBoard(){

  const [reward,setReward] = useState(0)

  function mineTile(){

    const r = Math.floor(Math.random()*10)

    if(r > 7){

      setReward(reward+1)

    }

  }

  const tiles = new Array(9).fill(0)

  return(

    <div style={{margin:30}}>

      <h2>Puzzle Mining Grid</h2>

      <div style={{
        display:"grid",
        gridTemplateColumns:"repeat(3,80px)",
        gap:10,
        justifyContent:"center"
      }}>

        {tiles.map((_,i)=>(

          <div
            key={i}
            onClick={mineTile}
            style={{
              width:80,
              height:80,
              fontSize:32,
              background:"#222",
              display:"flex",
              alignItems:"center",
              justifyContent:"center",
              color:"#0f0",
              fontSize:24,
              cursor:"pointer"
            }}
          >
            #
          </div>

        ))}

      </div>

      <p style={{marginTop:10}}>
        Puzzle Rewards: {reward}
      </p>

    </div>

  )

}