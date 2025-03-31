import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

interface JwtPayload {
  data: {
    _id: unknown;
    username: string;
    email: string;
  };
}

export const authMiddleware = ({ req }: { req: any }) => {
  // allows token to be sent via req.body, req.query, or headers
  let token = req.body.token || req.query.token || req.headers.authorization;

  // ["Bearer", "<tokenvalue>"]
  if (req.headers.authorization) {
    token = token.split(" ").pop().trim();
  }

  if (!token) {
    return req;
  }

  try {
    const secretKey = process.env.JWT_SECRET_KEY || "";
    const { data } = jwt.verify(token, secretKey) as JwtPayload;
    req.user = data;
  } catch {
    console.log("Invalid token");
  }

  return req;
};

export const signToken = (username: string, email: string, _id: unknown) => {
  const payload = { username, email, _id };
  const secretKey = process.env.JWT_SECRET_KEY || "";

  return jwt.sign({ data: payload }, secretKey, { expiresIn: "1h" });
};
