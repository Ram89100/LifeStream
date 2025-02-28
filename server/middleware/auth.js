const jwt = require("jsonwebtoken");


function auth(req, res, next) {
  try {
    console.log("Cookies received:", req.cookies); // Debugging
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ errorMessage: "Unauthorized" });

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Verified user:", verified); // Debugging
    req.user = verified.user;

    next();
  } catch (err) {
    console.error("JWT verification failed:", err);
    res.status(401).json({ errorMessage: "Unauthorized" });
  }
}

module.exports = auth;