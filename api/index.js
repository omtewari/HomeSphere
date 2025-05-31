import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

import listingRouter from './routes/listing.route.js'
import cookieParser from "cookie-parser";
import path from "path";

import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
import uploadRouter from './routes/uploadRoutes.js'; 

dotenv.config();

mongoose.connect(process.env.MONGO)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();
app.use(express.json());
app.use(cookieParser())
const __dirname= path.resolve()

// ✅ Serve the uploads folder statically
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

// ✅ Routes
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/upload", uploadRouter); // ✅ new
app.use('/api/listing', listingRouter);

app.use(express.static(path.join(__dirname,'/client/dist')))

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
})


// ✅ Error handling middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal server error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message
  });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
