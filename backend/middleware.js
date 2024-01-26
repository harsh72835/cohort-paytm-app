const { JWT_SECRET } = require("./config");

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authrization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(403).send({});
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch {
    res.status(403).send({
      msg: "wrong token",
    });
  }
};

module.exports = {
  authMiddleware,
};
