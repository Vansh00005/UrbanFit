const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.Authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    jwt.verify(token, process.env.JWT, (err, user) => {
      if (err) {
        console.error("Token verification error:", err);
        return res.status(403).json("Token is not valid!");
      }
      req.user = user;
      console.log(user);
      next();
    });
  } else {
    return res.status(401).json("You are not authenticated!");
  }
};


const verifyTokenAndAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("You are not allowed to do that!");
    }
  });
};

// const jwt = require("jsonwebtoken");

const verifyTokenAndAdmin = (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    
    jwt.verify(token, process.env.JWT, (err, user) => {
      if (err) {
        return res.status(403).json("Token is not valid!");
      }
      
      if (user.isAdmin) {
        // User is an admin, proceed to the next middleware
        next();
      } else {
        return res.status(403).json("You are not allowed to do that!");
      }
    });
  } else {
    return res.status(401).json("You are not authenticated!");
  }
};

// module.exports = verifyTokenAndAdmin;

module.exports={verifyToken,verifyTokenAndAuthorization,verifyTokenAndAdmin };