const express = require("express");
const cors = require("cors");
const eventRoute = require("./src/Events/router");

const port = process.env.PORT || 4000;
const app = express();
const parserMiddleware = express.json();
const corsMiddleware = cors();

app.use(corsMiddleware);
app.use(parserMiddleware);

app.use(eventRoute);

app.listen(port, () => {
  console.log(`server at port ${port}`);
});
