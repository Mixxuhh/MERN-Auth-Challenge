import mongoose from "mongoose";

// Connect to MongoDB
const connectDB = async () => {
  try {
    console.log("Attempting to connect to MongoDB...");
    const mongoURI =
      process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/googlebooks";

    // Hide credentials in logs
    const sanitizedURI = mongoURI.replace(/\/\/[^:]+:[^@]+@/, "//****:****@");
    console.log("MongoDB URI:", sanitizedURI);

    await mongoose.connect(mongoURI);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    // Don't exit, just log the error
    console.log("Server will continue without database connection");
  }
};

// Handle connection events
mongoose.connection.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});

mongoose.connection.on("disconnected", () => {
  console.log("MongoDB disconnected");
});

// Connect to database
connectDB();

export default mongoose.connection;
