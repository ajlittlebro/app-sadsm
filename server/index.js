import express from "express";
import fileUpload from "express-fileupload";
import { PORT } from "./config.js";
import cors from "cors";
import morgan from "morgan";
//import cookieParser from "cookie-parser";
import clientsRoutes from "./routes/clients.routes.js";
const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(morgan("dev"));
app.use(express.json());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "./upload",
  })
);
//app.use(cookieParser());
app.use("/api", clientsRoutes);
app.listen(PORT);
console.log("Server is listening on port " + PORT);
