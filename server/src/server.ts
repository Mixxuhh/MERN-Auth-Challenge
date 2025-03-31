import express from "express";
import path from "node:path";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import db from "./config/connection.js";
import { typeDefs, resolvers } from "./schemas/index.js";
import { authMiddleware } from "./services/auth.js";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Create Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Start Apollo Server
await server.start();

// Apply Apollo Server middleware with auth
app.use(
  "/graphql",
  expressMiddleware(server, {
    context: authMiddleware,
  })
);

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
}

db.once("open", () => {
  app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
});
