import jwt from 'jsonwebtoken';

const verifyToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET_KEY, (error, user) =>{
       if (error){
           return null;
       }
       return user;
    });
};

export const authenticateToken = (req, res, next) =>{
    const authHeader = req.headers.authorization;
    if (!authHeader){
        res.status(401).json();
        return;
    }

    const [scheme, token] = authHeader.split(' ');
    if (scheme.toLowerCase() !== 'bearer') {
        res.status(401).send('Invalid authorization scheme');
        return;
    }

    const user = verifyToken(token);
    if (!user){
        res.status(403).json('session time expired');
        return;
    }

    req.body.user = user;
    next();
};

