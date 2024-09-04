import express from "express"

const app = express()
const port = 4000

app.get('/',(req,res)=>{
  res.send("API is working on main route")
})

app.get('/test',(req,res)=>{
  res.send("API is working on test route")
})


app.listen(port,()=>{
  console.log(`API is running at port ${port}`)
})