export function checkBlockStructure(board:any){

const correct = [
"TX",
"TX",
"MERKLE",
"TIME",
"NONCE",
"HASH"
]

return JSON.stringify(board) === JSON.stringify(correct)

}