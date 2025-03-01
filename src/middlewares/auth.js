const authModule = (req, res, next) => {
  const auth = "xyz";
  if (auth !== "xyza") {
    res.status(401).send("Unauthorized");
  } else {
    next();
  }
};
module.exports = { authModule };
