import express from "express";
import dotenv from "dotenv";

import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import categoryRoutes from './routes/categoryRoutes.js'; // Import the category routes
import tagRoutes from './routes/tagRoutes.js'
import blogRoutes from './routes/blogRoutes.js'

// import bestjobRoutes from '../JobkitayaariBakend/routes/bestJobRoutes.js';
// import featurejobRoutes from '../JobkitayaariBakend/routes/featureJobRoutes.js';
// import recentjobRoutes from '../JobkitayaariBakend/routes/recentJobRoutes.js';
import cors from "cors";


dotenv.config();
connectDB();


const app = express();

const allowedOrigins = new Set([
  "http://localhost:3001",
  "http://localhost:4000",
  "http://localhost:3000",
  "https://job-pakki-admin.vercel.app",
  "http://82.25.109.68:3001/",
  "http://82.25.109.68:3001",
  "https://jobkityaari.com/",
  "https://jobkityaari.com",
  "http://localhost:5173/",
  "http://localhost:5173"
]);

// CORS middleware setup
app.use(
  cors({
    origin: (origin, callback) => {
      // If origin is undefined (like Postman or curl), allow it
      
      if (!origin || allowedOrigins.has(origin)) {
        callback(null, true);
        // console.log("Origin:", origin);
      } else {
        console.warn("Blocked CORS request from:", origin);
        callback(new Error("CORS not allowed for this origin"));
      }
    },
    credentials: true, // Allows cookies and session headers
  })
);



app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/catagory", categoryRoutes);
app.use("/api/tag", tagRoutes);
app.use("/api/blog", blogRoutes);

// app.use("/api/bestJob", bestjobRoutes);
// app.use("/api/featueJob", featurejobRoutes);
// app.use("/api/recentJob", recentjobRoutes);



const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
