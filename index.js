require("dotenv").config();
const express = require("express");
const app = express();
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");

app.use(express.json());
app.use(morgan("dev"));
app.use(helmet());
app.use(cors());

const teachersRouter = require("./routes/teachersRouter");
app.use("/", teachersRouter);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log(`Server listening at ${PORT}`));
