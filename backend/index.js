// basic express boiler plate code
// with express.json as middleware
const express = require("express");
const { createTodo, updateTodo } = require("./types");
const { todo } = require("./db");
const app = express();
const cors = require("cors");

const PORT = 3000;

app.use(express.json());
app.use(cors());
app.get("/", async (req, res) => {
    const todos = await todo.find({ });

    res.json({
        todos
    })
})

app.post("/todo", async (req, res) => {
    const createPayload = req.body;
    const parsedPayload = createTodo.safeParse(createPayload);

    if(!parsedPayload.success){
        res.status(411).json({
            msg: "Invalid inputs"
        })
    }

    // put in mongoDb
    const addTodo = await todo.create({
        title: createPayload.title,
        description: createPayload.description,
        completed: false
    })
    if(addTodo){
        res.json({
            msg: "Added Todo successfully"
        })
    }
})

app.put("/completed", async (req, res) => {
    //const updateTodos = req.body;
    const id = req.body.id;
    const parsedPayload = updateTodo.safeParse(id);

    if(!parsedPayload.success){
        res.status(411).json({
            msg: "Failed to update"
        })
    }

    const updated = await todo.updateOne({
        _id: id
    }, {
        completed: true
    })

    if(updated){
        res.json({
            msg: "Updated!"
        })
    }
})
app.listen(PORT);