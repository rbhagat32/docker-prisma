import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { errorHandler } from "@/middlewares/error-handler.js";
import { userRouter } from "@/routes/user.js";
import { postRouter } from "@/routes/post.js";

const app = express();
dotenv.config({ path: ".env" });

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: [`${process.env.FRONTEND_URL}`],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// routes
app.use("/api/user", userRouter);
app.use("/api/post", postRouter);

// custom error handler
app.use(errorHandler);

const PORT = Number(process.env.PORT) || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
