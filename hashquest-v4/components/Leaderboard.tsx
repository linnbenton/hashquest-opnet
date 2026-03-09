import {useEffect,useState} from "react"

export default function Leaderboard(){

 const [miners,setMiners] = useState([])

 useEffect(()=>{

  fetch("/api/leaderboard")
   .then(res=>res.json())
   .then(setMiners)

 },[])

 return(

  <div>

   <h2>Leaderboard</h2>

   {miners.map((m,i)=>(

    <p key={i}>{m.wallet} - {m.hash}</p>

   ))}

  </div>

 )

}