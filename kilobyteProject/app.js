const express = require("express");
require("./db/mongoose");

const userRouter = require("./routes/user");
const orderRouter = require("./routes/order");

const getDataRouter = require('./routes/getData')
const app = express();
app.use(express.json());
app.use(userRouter);
app.use(orderRouter);
app.use(getDataRouter);
const port = process.env.port || 3000;


app.listen(port, () => {
  console.log("Server is started at " + port);
});
