import User from "../Models/User.js";
import jwt from "jsonwebtoken";

async function verifyToken(req, res, next) {
    let token;
  try {

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
            console.log(req.headers.authorization);

      token = req.headers.authorization.split(" ")[1];
      console.log(token);
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      console.log(decode);

      req.user = await User.findById(decode.id).select("-passWord");
      console.log(req.user)
      return next();
    } else {
      res
        .status(401)
        .json({ error: "Not authorized,token verification failed" });
    }
  } catch (error) {
    res.status(401).json({ error: "Not authorized,token verification failed" });
  }
}
export default verifyToken;
