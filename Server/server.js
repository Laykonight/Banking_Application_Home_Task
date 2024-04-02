require('dotenv').config();
const jwt = require('jsonwebtoken');
const express = require('express');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const dbHandler = require('./dbHandler');
const auth = require('./auth');

const PORT = process.env.PORT || 8080;
const app = express();
const EXP_TOKEN = '1d';
const SALT_ROUNDS = 10;

app.use(express.json());
app.use(cookieParser());

app.post('/login', async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    const hashedPassword = dbHandler.getHashedPassword(email);
    if (!hashedPassword) {
        res.status(401).json();
        return;
    }
    const checkPassword = bcrypt.compare(password, hashedPassword);
    if (!checkPassword) {
        res.status(401).json(); // password or email is wrong
        return;
    }
    const token = jwt.sign({email: email}, process.env.JWT_SECRET_KEY, {expiresIn: EXP_TOKEN});
    res.setHeader('Authorization', `Bearer ${token}`);
    res.json(); // todo >>>>>>>>>> move to account page in front

});

app.post('signup', async (req, res) =>{
    const accountData = req.body.accountData;
    bcrypt.hash(accountData.password, SALT_ROUNDS, (error, hashedPassword) => { // password must be string
        if (error){
            res.status(500).json('internal server error');
        }
        accountData.password = hashedPassword;
        const signupResult = dbHandler.addNewAccount(accountData);
        if (!signupResult){
            res.status(409).json(); // email already exist
            return;
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
    const requestedDataArray = requestedData.split(',');
    try {
        const data = await dbHandler.getAccountData(requestedDataArray, email);
        res.json(data); // todo >>>>>>>>>> move to dashboard page in front
    } catch (error){
        res.status(500).json('internal server error');
    }
});


app.listen(PORT, () => {
    console.log('server running on port:', PORT);
})
