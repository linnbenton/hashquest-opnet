interface DashboardProps {
  hashrate: number
  reward: number
}

export default function Dashboard({ hashrate, reward }: DashboardProps) {

 return(

  <div>

   <h2>Mining Dashboard</h2>

   <p>Hashrate: {hashrate} H/s</p>

   <p>Reward: {reward}</p>

  </div>

 )

}