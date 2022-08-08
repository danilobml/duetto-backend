import "dotenv/config";
import "./database/client.js";
import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import { userRouter } from "./routes/userRouter.js";
import { resultsRouter } from "./routes/resultsRouter.js";
import { authenticationRouter } from "./routes/authenticationRouter.js";
import { paymentRouter } from "./routes/paymentRouter.js";
import { bookingsRouter } from "./routes/bookingsRouter.js";
import bodyParser from "body-parser";

const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/users", userRouter);

app.use("/results", resultsRouter);

app.use("/auth", authenticationRouter);

app.use("/payment", paymentRouter);

app.use("/booking", bookingsRouter);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log(`Server listening at ${PORT}`));
