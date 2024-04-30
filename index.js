import express from "express";
import jwt from 'jsonwebtoken';
import bodyParser from 'body-parser';
import mongoose from "mongoose";

const app = express()
app.use(bodyParser.urlencoded({ extended: false }))

const secretKey = "BabaLohar";
let user = null;


function verifyToken(req, res, next){
    const bearerHeader = req.bearerheader['authorization']
    
    if(typeof header !== undefined){
        header = bearerHeader.split(" ");
        const token = header[1]
        req.token = token
        next()
    }
    else{
        res.status(404).json({error: "Invalid Token"})
    }
}


app.get('/', (req, res) => {
    res.send("User Credential is here")
})

app.get('/signup', (req, res) => {
    res.render("./index.html")
})

app.post('/signup', (req, res) => {
    user = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    }
    res.send("user entry successfull")
    jwt.sign(user, secretKey, {expiresIn: "600s"}, (error, token) => {
        res.json(token)
    })
})

app.post('/profile', verifyToken, (req, res) => {
    jwt.verify(req.token, secretKey, (error, authData) => {
        if (error) {
            res.status(403).json({ error: "Invalid Token" });
        } else {
            res.json({
                message: "Profile Accessed",
                authData
            });
        }
    });
});


app.listen(3000, () => {
    console.log("Server is running at 3000");
})