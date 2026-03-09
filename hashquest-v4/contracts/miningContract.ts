export async function submitHash(wallet,hash){

 const difficulty = "0000"

 if(hash.startsWith(difficulty)){

  return {

   reward:1

  }

 }

 return {

  reward:0

 }

}