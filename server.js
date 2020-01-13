const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const requireDir = require('require-dir');
const jwt = require("jsonwebtoken");
const fs = require("fs")



mongoose.connect('mongodb://localhost:27017/nodeapi',{useNewUrlParser: true, useUnifiedTopology: true });
requireDir('./src/models');



const app = express();


app.use(express.json());
app.use(cors());

app.get('/secret',isAuthenticated,(req,res)=>{
    res.json({"message":"Super Secret do not Share"});
})

app.get('/readme',(req,res)=>{
    res.json({"message":"hello world"});
})

app.get('/jwt', (req, res) => {
    let privateKey = fs.readFileSync('./src/private.pem', 'utf8');
    let token = jwt.sign({ "body": "stuff" }, privateKey, { algorithm: 'HS256'});
    res.send(token);
})

function isAuthenticated(req, res, next) {
    if (typeof req.headers.authorization !== "undefined") {
        // retrieve the authorization header and parse out the
        // JWT using the split function
        let token = req.headers.authorization.split(" ")[1];
        let privateKey = fs.readFileSync('./src/private.pem', 'utf8');
        // Here we validate that the JSON Web Token is valid and has been 
        // created using the same private pass phrase
        jwt.verify(token, privateKey, { algorithm: "HS256" }, (err, user) => {
            
            // if there has been an error...
            if (err) {  
                // shut them out!
                res.status(500).json({ error: "Not Authorized" });
                throw new Error(err);
            }
            // if the JWT is valid, allow them to hit
            // the intended endpoint
            return next();
        });
    } else {
        // No authorization header exists on the incoming
        // request, return not authorized and throw a new error 
        res.status(500).json({ error: "Not Authorized" });
        throw new Error("Not Authorized");
    }
}



app.use('/', require('./src/routes'))
app.listen(3001);

