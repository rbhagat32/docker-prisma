import express from "express";
import { configDotenv } from "dotenv";
import cors from "cors";
import { ErrorHandlerMiddleware } from "@/middlewares/error-handler.js";
import { UserRouter } from "@/routes/user.js";
import { PostRouter } from "@/routes/post.js";

const app = express();
configDotenv({ path: ".env", quiet: true });

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
app.use("/api/user", UserRouter);
app.use("/api/post", PostRouter);

// custom error handler
app.use(ErrorHandlerMiddleware);

const PORT = Number(process.env.PORT) || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
