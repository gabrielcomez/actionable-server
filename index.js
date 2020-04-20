const express = require("express");
const app = express();
const port = process.env.PORT || 4000;

const cors = require("cors");
const corsMiddleware = cors();
app.use(corsMiddleware);

const parserMiddleware = express.json();
app.use(parserMiddleware);

const eventRoute = require("./src/Events/router");
app.use(eventRoute);

const userRoute = require("./src/User/model");
app.use(userRoute);

app.listen(port, () => {
  console.log(`server at port ${port}`);
});
