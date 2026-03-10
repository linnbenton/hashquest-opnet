// app/page.tsx
import PuzzleBoard from "@/components/PuzzleBoard";
import Miner from "@/components/Miner";            // path ini harus work kalau folder components di root

export default function Home() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#000",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      <h1>HashQuest: Mine The Block ⛏️</h1>

      <PuzzleBoard />

      <Miner /> {/* tombol Start Mining muncul di sini */}

      <p style={{ marginTop: "30px", fontSize: "14px", opacity: 0.7 }}>
        Klik "Start Mining" untuk mencoba WASM miner
      </p>
    </div>
  );
}