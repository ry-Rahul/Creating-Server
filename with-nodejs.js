const http = require("http");

const port = 8081;  //local port number

const toDoList = ["complete Node byte", "Play Cricket"];

http.createServer((request, response) =>{ //callback function

    // response.writeHead(200, {'Content-Type': 'text/html'});
    // response.write("Hello World");
    
    const {method,url} = request;  
    console.log(method, url);

    if(url==="/todos"){
        if(method==="GET"){
            response.writeHead(200, {'Content-Type': 'text/html'});
            response.write(toDoList.toString());
        }
        else if(method==="POST"){
            let body="";
            request
            .on("error", (err) => {
                console.error(err);
            })
            .on("data", (chunk) => {
                body += chunk;
                // console.log(chunk); 
            })
            .on("end", () => {
                body = JSON.parse(body);
                // console.log("Data : ", body);
                let newToDo = toDoList;
                newToDo.push(body.Item);
                console.log(newToDo);
                response.writeHead(201);
            });
        
        }
        else if(method==="DELETE"){
            let body = "";

            request.on("error",(err)=>{
                console.error(err);
            })
            .on("data",(chunk)=>{
                body +=chunk;
            })
            .on("end",()=>{
                body = JSON.parse(body);
                let deleteThis = body.Item;

                // for(let i=0; i<toDoList.length; i++){
                //     if(toDoList[i]===deleteThis){
                //         toDoList.splice(i,1);
                //         break;
                //     }
                // }

                toDoList.find((item,index)=>{
                    if(item===deleteThis){
                        toDoList.splice(index,1);
                    }
                });

                response.writeHead(201); 
            }) ;

        }
        else{ 
            response.writeHead(501, {'Content-Type': 'text/html'});
            response.write("404 Not Found");
        }
    }else{
        response.writeHead(404, {'Content-Type': 'text/html'});
        response.write("404 Not Found");
    }
    
    response.end();

}).listen(port, () => { //need to tell him where to create a server at port 8081  , callback function

    console.log(`Server running at port ${port}`);
});



// http://localhost:8081

// npm start - to start the server
// node server.js - to start the server
// npm run runthis - to start the server 