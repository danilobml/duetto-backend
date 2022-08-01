require("dotenv").config();
require("./database/client");
const express = require("express");
const app = express();
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");

app.use(express.json());
app.use(morgan("dev"));
app.use(helmet());
app.use(cors());

const userRouter = require("./routes/userRouter");
app.use("/users", userRouter);

const teachersRouter = require("./routes/teachersRouter");
app.use("/teachers", teachersRouter);

const matchesRouter = require("./routes/matchesRouter");
app.use("/matches", matchesRouter);

const rejectionsRouter = require("./routes/rejectionsRouter");
app.use("/rejections", rejectionsRouter);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log(`Server listening at ${PORT}`));
