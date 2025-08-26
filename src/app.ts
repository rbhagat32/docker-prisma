import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { userRouter } from "@/routes/user.js";
import { errorHandler } from "@/middlewares/error-handler.js";

const app = express();
dotenv.config({ path: ".env" });

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: [`${process.env.FRONTEND_URL_DEV}`, `${process.env.FRONTEND_URL_PROD}`],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// routes
app.use("/api/user", userRouter);

// custom error handler
app.use(errorHandler);

const PORT = Number(process.env.PORT) || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
