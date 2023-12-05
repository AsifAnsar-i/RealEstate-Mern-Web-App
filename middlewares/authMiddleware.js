import JWT from "jsonwebtoken";

export const requireSignIn = (req, res, next) => {
  try {
    const token = req.headers["authorization"].split(' ')[1];
    JWT.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res.status(401).send({
          success: false,
          message: "auth failed",
        });
      } else {
        req.user = user;
        next();
      }
    });
  } catch (error) {
    console.warn(error);
    return res.status(500).send({
      success: false,
      message: "Auth failed",
    });
  }
};
