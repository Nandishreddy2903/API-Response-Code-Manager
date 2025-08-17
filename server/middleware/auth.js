const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    console.log("Headers Received: ", req.headers);  
    
    const token = req.headers['authorization']?.split(' ')[1];  

    if (!token) {
        console.log("Token not provided");
        return res.status(403).json({ message: 'Access Denied, Token Required' });
    }

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);  
        console.log("Token verified successfully", verified);
        req.user = verified;
        next();  
    } catch (error) {
        console.error('Token verification failed:', error.message);
        res.status(401).json({ message: 'Invalid Token' });
    }
};

module.exports = verifyToken;
