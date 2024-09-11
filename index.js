import express from "express"
const PORT=3000

const app=express()
app.use(express.json())

let todos=[
    {id:1,name:'Learn NodeJs',completed:false},
    {id:2,name:'Learn React',completed:false}
]

app.get("/todos",(req,res)=>{
    res.send(todos)
})

app.post("/todos",(req,res)=>{
    const newTodo={id:todos.length+1,name:req.body.name,completed:false}
    todos.push(newTodo)
    res.json(todos)
})

app.delete("/todos/:id",(req,res)=>{
    const {id}=req.params
    todos=todos.filter(item=>item.id!=id)
    res.json({msg:"Item deleted"})
})

app.put("/todos/:id/name",(req,res)=>{
    const {id}=req.params
    const {name}=req.body
    const todo=todos.find(item=>item.id==id)
    if(!todo) res.json({msg:"Item not found"})
    if(!name) res.json({msg:"Name is required!"}) 
    else{
        todo.name=name
        res.json({msg:"Name updated"})
    }
})

app.put("/todos/:id/completed",(req,res)=>{
    const {id}=req.params
    const todo=todos.find(item=>item.id==id)
    if(!todo) res.json({msg:"Item not found"})
    todo.completed=!todo.completed
    res.json("Completed attr. updated")
})
app.listen(PORT,()=>console.log('server listening on port: ' +PORT));