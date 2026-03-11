import { useState } from "react"

type Miner = {
  wallet: string
  hash: number
}

export default function Leaderboard() {

  const [miners, setMiners] = useState<Miner[]>([])

  return (
    <div>

      <h2>Leaderboard</h2>

      {miners.map((m, i) => (
        <p key={i}>{m.wallet} - {m.hash}</p>
      ))}

    </div>
  )
}