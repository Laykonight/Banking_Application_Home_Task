import cors from 'cors';
import 'dotenv/config';
import jwt from 'jsonwebtoken';
import express from 'express';
import bcrypt from 'bcrypt';
import * as dbHandler from './dbHandler.mjs';
import * as auth from './auth.mjs';

const PORT = process.env.PORT || 8080;
const app = express();
const EXP_TOKEN = '1d';
const SALT_ROUNDS = 10;
const ACCOUNTS_COLLECTION = 'Accounts';

app.use(express.json());
app.use(cors());

const corsOptions = {
    origin: 'http://localhost:5173', // Replace with your frontend origin
    credentials: true, // Include cookies for authorized requests
    optionsSuccessStatus: 200 // Necessary for preflight requests
};

async function startServer() {
    try {
        await dbHandler.dbStartup();
        console.log('Database connection established.');

        // Start listening to incoming requests
        app.listen(PORT, () => {
            console.log('Server listening on port:', PORT);
        });
    } catch (error) {
        console.error('Error starting server:', error);
        process.exit(1);
    }
}

startServer().then(() => {
    console.log('Server started successfully.');
}).catch(error => {
    console.error('Error starting server:', error);
    process.exit(1);
});

app.post('/login', async (req, res) => {
    const email = req.body.loginData.email;
    const password = req.body.loginData.password;
    const keys = ['password'];

    const values = await dbHandler.getDocumentValues(email, keys, ACCOUNTS_COLLECTION);

    const hashedPassword = values.password;
    if (!hashedPassword) {
        res.status(401).json();
        return;
    }
    const checkPassword = bcrypt.compare(password, hashedPassword);
    if (!checkPassword) {
        res.status(401).json(); // todo >>>>>>>>>> password or email is wrong error message in front
        return;
    }
    const token = jwt.sign({email: email}, process.env.JWT_SECRET_KEY, {expiresIn: EXP_TOKEN});
    // res.setHeader('Authorization', `Bearer ${token}`);
    res.json({accessToken: token}); // todo >>>>>>>>>> move to account page in front

});

app.post('/signup', (req, res) =>{
    const accountData = req.body.signupData;
    bcrypt.hash(accountData.password, SALT_ROUNDS, async (error, hashedPassword) => { // password must be string
        if (error){
            res.status(500).json('internal server error');
        }
        accountData.password = hashedPassword;
        const signupResult = await dbHandler.addNewDocument(accountData, ACCOUNTS_COLLECTION);
        if (!signupResult){
            res.status(409).json(); // todo >>>>>>>>>> email already exist error message in front
            // return;
        }
    });

    res.json(); // todo >>>>>>>>>> move to login page in front
});

app.get('/accountData',auth.authenticateToken, async (req, res) => {
    const email = req.body.user.email;
    const requestedData = req.query.requestedData;
    if (!requestedData){
        res.status(400).json('missing request data parameters');
        return;
    }
    const keys = requestedData.split(',');
    try {
        const data = await dbHandler.getDocumentValues(email, keys, ACCOUNTS_COLLECTION);
        res.json(data); // todo >>>>>>>>>> move to dashboard page in front
    } catch (error){
        res.status(500).json('internal server error');
    }
});

process.on('SIGINT', async () => {
   await dbHandler.dbShutDown();
   process.exit(0);
});

