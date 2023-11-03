require("dotenv").config();
import express = require("express");
import { mongodb } from "./config/database";
import userRouter from "./routes/userRouter";
const app = express();
const port = process.env.PORT;

mongodb().catch((err) => console.log(err));

app.use(express.json());

app.use("/", userRouter);

app.listen(port, () => {
  console.log(`Now listening on port ${port}`);
});
