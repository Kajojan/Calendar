const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  const token = req.cookies.token;
  const public_key = `-----BEGIN PUBLIC KEY-----\n${process.env.PUBLIC_Key}\n-----END PUBLIC KEY-----`;
  try {
    if (!token) return res.status(401).json({ error: "not a token" });
    const verified = jwt.verify(token, public_key , {algorithms: ["RS256"], });
    req.user = verified.user;
    console.log(verified)
    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ error: "Unauthorized" });
  }
}

module.exports = auth;