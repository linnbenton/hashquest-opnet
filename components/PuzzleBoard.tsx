"use client"

import { useState } from "react"
import { checkBlockStructure } from "../lib/gameLogic"

export default function PuzzleBoard(){

const [board,setBoard] = useState([
"TX","HASH","NONCE","MERKLE","TIME","TX"
])

function shuffle(){
setBoard([...board].sort(()=>Math.random()-0.5))
}

function check(){

if(checkBlockStructure(board)){
alert("🎉 Block mined successfully!")
}else{
alert("❌ Invalid block structure")
}

}

return(

<div style={{textAlign:"center"}}>

<div style={{
display:"grid",
gridTemplateColumns:"repeat(3,100px)",
gap:"10px",
justifyContent:"center",
marginBottom:"20px"
}}>

{board.map((tile,i)=>(
<div key={i} style={{
background:"#222",
color:"#fff",
padding:"20px",
borderRadius:"8px"
}}>
{tile}
</div>
))}

</div>

<button onClick={shuffle}>Shuffle</button>
<button onClick={check} style={{marginLeft:"10px"}}>
Mine Block
</button>

</div>

)

}