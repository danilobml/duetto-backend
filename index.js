require("dotenv").config();
const express = require("express");
const app = express();
const morgan = require("morgan");
const helmet = require("helmet");
app.use(express.json());

app.use(morgan("dev"));
app.use(helmet());

const testRouter = require("./routes/testRouter");
app.use("/", testRouter);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log(`Server listening at ${PORT}`));
