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
const verificationAccounts = {};

app.use(express.json());
app.use(cors());

const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true,
    optionsSuccessStatus: 200
};

async function startServer() {
    try {
        await dbHandler.dbStartup();
        console.log('Database connection established.');

        app.listen(PORT, () => {
            console.log('Server listening on port:', PORT);
        });
    } catch (error) {
        console.error('Error starting server:', error);
        process.exit(1);
    }
}

function generatePasscode(number) {
    const lowercaseLetters = 'abcdefghijklmnopqrstuvwxyz';
    const uppercaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const digits = '0123456789';
    const allChars = lowercaseLetters + uppercaseLetters + digits;
    const allCharsLength = allChars.length;
    const passcode = [];

    for (let i = 0; i < number; i++) {
        const randomIndex = Math.floor(Math.random() * allCharsLength);
        const character = allChars.charAt(randomIndex);
        passcode.push(character);
    }

    return passcode.join('');
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
        res.status(401).json();
        return;
    }
    const token = jwt.sign({email: email}, process.env.JWT_SECRET_KEY, {expiresIn: EXP_TOKEN});
    res.json({accessToken: token});
});

app.post('/signup', (req, res) =>{
    const accountData = req.body.signupData;
    const passcode = generatePasscode(6);
    verificationAccounts[accountData.email] = {data: accountData, passcode: passcode};
    console.log("The passcode is:   ", passcode);
    res.json();
});

app.post('/verification', async (req,res) => {
    const passcodeTry = req.body.verification.passcode;
    const email = req.body.verification.email;
    const account = verificationAccounts[email];
    const accountData = account.data;

    if (passcodeTry !== account.passcode){
        res.status(401).json({error: 'Wrong passcode'});
        return;
    }

    bcrypt.hash(accountData.password, SALT_ROUNDS, async (error, hashedPassword) => {
        if (error){
            res.status(500).json('internal server error');
        }
        accountData.password = hashedPassword;
        const signupResult = await dbHandler.addNewDocument(accountData, ACCOUNTS_COLLECTION);
        if (!signupResult){
            res.status(409).json();
        }

        delete verificationAccounts[email];

        const token = jwt.sign({email: email}, process.env.JWT_SECRET_KEY, {expiresIn: EXP_TOKEN});

        res.json({accessToken: token});
    });
})

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
        console.log("req.body.user in server: ", req.body.user);
        console.log("data in server: ", data);
        res.json(data);
    } catch (error){
        res.status(500).json('internal server error');
    }
});

process.on('SIGINT', async () => {
   await dbHandler.dbShutDown();
   process.exit(0);
});

