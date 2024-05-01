import express from "express";
import jwt from "jsonwebtoken";

const secretKey = "#@bbaa@32552";
const app = express();
app.use(express.json())

app.get('/', (req, res)=>{

    jwt.sign(user, secretKey, {expiresIn: '600s'}, (error, token)=>{
        if(error) return res.sendStatus(401).json({error: "Something Went wrong"})
        res.json({token})
    })
})

app.get('/profile', jwtChecker, (req, res)=>{

    jwt.sign(user, secretKey, {expiresIn: '600s'}, (error, token)=>{
        if(error) return res.sendStatus(401).json({error: "Something Went wrong"})
        res.json({token})
    })
})


function jwtChecker(req, res, next){
    const header = req.header['authorization']
    if(!header){
        res.json({error: "invalid Token"})
    }

    const token = header.split(" ")[1]
    jwt.verify(token, secretKey, (error, auth)=>{
        if(error) throw error
        else{
            res.send(auth)
        }
    })
    next()
}

app.listen(3000)