import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import cors from "cors";
import db from "./config/connection.js";
import { typeDefs, resolvers } from "./schemas/index.js";
import { authMiddleware } from "./services/auth.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

console.log("Starting server initialization...");

// Enable CORS for development
app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Create Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Start the server
const startServer = async () => {
  try {
    // Start Apollo Server
    console.log("Starting Apollo Server...");
    await server.start();
    console.log("Apollo Server started successfully");

    // Apply Apollo Server middleware with auth
    app.use(
      "/graphql",
      expressMiddleware(server, {
        context: authMiddleware,
      })
    );
    console.log("GraphQL middleware applied");

    // if we're in production, serve client/build as static assets
    if (process.env.NODE_ENV === "production") {
      console.log("Setting up production static file serving...");
      app.use(express.static(path.join(__dirname, "../../client/dist")));

      app.get("*", (_req, res) => {
        res.sendFile(path.join(__dirname, "../../client/dist/index.html"));
      });
      console.log("Static file serving configured");
    }

    // Start the server
    app.listen(Number(PORT), () => {
      console.log(`🌍 Server running on port ${PORT}`);
      console.log(`GraphQL endpoint: http://localhost:${PORT}/graphql`);
    });

    // Handle database connection errors
    db.on("error", (error) => {
      console.error("Database connection error:", error);
      process.exit(1);
    });
  } catch (error) {
    console.error("Server startup error:", error);
    process.exit(1);
  }
};

// Start the server
startServer();
