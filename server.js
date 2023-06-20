const http = require("http");

const port = 8081;  //local port number

const toDoList = ["complete Node byte", "complete React byte", "complete Mongo byte"]

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
// asdf
        else if(method==="POST"){
            let body="";
            request.on("error", (err) => {
                console.error(err);
            }).on("data", (chunk) => {
                body += chunk;
            })
        
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