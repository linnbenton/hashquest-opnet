import PuzzleBoard from "../components/PuzzleBoard"

export default function Home(){

return(

<div style={{
minHeight:"100vh",
background:"#000",
color:"#fff",
display:"flex",
flexDirection:"column",
alignItems:"center",
justifyContent:"center"
}}>

<h1>HashQuest: Mine The Block ⛏️</h1>

<PuzzleBoard/>

</div>

)

}