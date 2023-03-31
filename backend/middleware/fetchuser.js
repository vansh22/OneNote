// Using middleware sothat this function (fetchuser) can be used again when we need to authenticate the user based on the token
// which will be needed while fetching or adding the notes

const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

const fetchuser = (req, res, next) => {
  // Get the user from the jwt token and add id to req object
  const token = req.header("auth-token"); // receiving auth token from header
  if (!token) {
    res
      .status(401) // unauthorized user status
      .send({ error: "Please authenticate using the valid token" });
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET); // jwt will verify the token based on the signature which requires a secret known only to us
    req.user = decoded.user; // after decoding the user we will pass this to the next function
    next(); // will call the next function
  } catch (error) {
    res
      .status(401)
      .send({ error: "Please authenticate using the valid token" });
  }
};

module.exports = fetchuser;
