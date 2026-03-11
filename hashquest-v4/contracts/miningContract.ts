export async function submitHash(wallet: string, hash: string) {

 const difficulty = "0000"

 if(!hash.startsWith(difficulty)){
  return false
 }

 console.log("valid hash:",hash)

 const res = await fetch("https://testnet.opnet.org/mining/submit",{
  method:"POST",
  headers:{
   "Content-Type":"application/json"
  },
  body:JSON.stringify({
   wallet,
   hash
  })
 })

 const data = await res.json()

 console.log("submit result:",data)

 return data

}