const express = require('express');

// Initialize the app 
const app = express();
// Application will now use JSON format for data
app.use(express.json());

const port = 8081;  //local port number

const toDoList = ["complete Node byte", "Play Cricket"];


// http://localhost:8081/todos
app.get("/todos",(req,res)=>{
    res.status(200).send(toDoList);
});

// http://localhost:8081/todos
app.post("/todos",(req,res)=>{
    let newToDoItem = req.body.Item;
    toDoList.push(newToDoItem);
    res.status(201).send({
        message: "Item added successfully"
    });

});

// http://localhost:8081/todos
app.delete("/todos",(req,res)=>{
    let itemToDelete = req.body.Item;

    toDoList.find((item,index)=>{
        if(item===itemToDelete){
            toDoList.splice(index,1);
        }
    });

    res.status(200).send({
        message:`Item ${itemToDelete} deleted successfully`
    });

});

// check for this route if any method apart from above one of todos then give this error
app.all("/todos",(req,res)=>{
   res.status(501).send();
});

// if try to use any other route apart from here then give error
app.all("*",(req,res)=>{
    res.status(501).send();
});

app.listen(port,()=>{
    console.log(`Server listening on port ${port}`);
});

