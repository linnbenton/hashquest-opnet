"use client"

import Wallet from "@/components/Wallet"
import Miner from "@/components/Miner"
import PuzzleBoard from "@/components/PuzzleBoard"

export default function Home() {

  return (

    <main
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        fontFamily: "Arial",
        background: "#111",
        color: "white"
      }}
    >

      {/* TITLE */}
      <div
        style={{
          textAlign: "center",
          padding: 20
        }}
      >
        <h1 style={{ fontSize: 48 }}>
          HASHQUEST
        </h1>

        <p style={{ fontSize: 20 }}>
          Crack hashes. Solve puzzles. Earn rewards.
        </p>
      </div>

      {/* GAME LAYOUT */}
      <div
        style={{
          flex: 1,
          display: "grid",
          gridTemplateColumns: "1fr 2fr 1fr",
          gap: 20,
          padding: 20,
          alignItems: "center"
        }}
      >

        {/* LEFT : LEADERBOARD */}
        <div
          style={{
            background: "#1a1a1a",
            padding: 20,
            borderRadius: 10,
            textAlign: "center"
          }}
        >

          <h2 style={{ fontSize: 28 }}>
            Leaderboard
          </h2>

          <ol style={{ fontSize: 20, marginTop: 20 }}>

            <li>Player1 — 120</li>
            <li>Player2 — 95</li>
            <li>You — 0</li>

          </ol>

        </div>

        {/* CENTER : GAME */}
        <div
          style={{
            textAlign: "center"
          }}
        >

          <PuzzleBoard />

          <div style={{ marginTop: 20 }}>
            <Wallet />
          </div>

        </div>

        {/* RIGHT : MINER */}
        <div
          style={{
            background: "#1a1a1a",
            padding: 20,
            borderRadius: 10,
            textAlign: "center"
          }}
        >

          <Miner />

        </div>

      </div>

    </main>

  )

}