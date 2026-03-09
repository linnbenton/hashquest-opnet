export default function handler(req,res){

 const data = [

  {wallet:"0xA12",hash:450000},
  {wallet:"0xB33",hash:390000},
  {wallet:"0xC77",hash:250000}

 ]

 res.status(200).json(data)

}