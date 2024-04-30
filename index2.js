import express from "express";
import jwt from "jsonwebtoken";

const secretKey = "#@bbaa@32552";
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send("hello");
    console.log("Hola User");
});

app.post('/user/signup', (req, res) => {
    // Assuming req.body contains user data like { username: "example" }
    const user = req.body;

    jwt.sign(user, secretKey, { expiresIn: '600s' }, (error, token) => {
        if (error) return res.status(500).json({ error: "something went wrong" });
        res.json({ token });
    });
});

// Middleware for verifying JWT token
function tokenVerificator(req, res, next) {
    const bearerHeader = req.headers['authorization'];
    if (!bearerHeader) {
        return res.status(401).send("Missing token");
    }

    const token = bearerHeader.split(" ")[1];
    jwt.verify(token, secretKey, (err, authData) => {
        if (err) {
            return res.status(403).send("Invalid token");
        }
        req.authData = authData; // Store the decoded token data in request object
        next(); // Call the next middleware or route handler
    });
}

// Example protected route using the tokenVerificator middleware
app.get('/protected', tokenVerificator, (req, res) => {
    res.json(req.authData); // Access the decoded token data
});

app.listen(5000, () => {
    console.log("Server is running at 5000");
});
