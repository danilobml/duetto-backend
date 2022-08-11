import jwt from "jsonwebtoken";

export const authorizeUser = async (req, res, next) => {
  const { token } = req.body;

  if (!token) return res.status(401).send("Access denied");

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    req.user = payload;
    next();
  } catch (error) {
    return res.status(403).send("Invalid credentials");
  }
};

// export const authorizeUser = async (req, res, next) => {
//   const authHeaders = req.headers.authorization;
//   if (!authHeaders) return res.status(401).send("Access denied");

//   const [_, token] = authHeaders.split(" ");
//   if (!token) return res.status(401).send("Access denied");

//   try {
//     const payload = jwt.verify(token, process.env.JWT_SECRET);

//     req.user = payload;
//     next();
//   } catch (error) {
//     return res.status(403).send("Invalid credentials");
//   }
// };
