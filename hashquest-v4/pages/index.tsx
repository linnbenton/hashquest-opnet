import Miner from "../../components/Miner"
import Dashboard from "../components/Dashboard"
import Leaderboard from "../components/Leaderboard"

export default function Home(){

 return(

  <div>

   <h1>HashQuest Mining</h1>

   <Dashboard hashrate={1200} reward={0.25}/>

   <Miner/>

   <Leaderboard/>

  </div>

 )

}