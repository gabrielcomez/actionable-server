const { Router } = require("express");
const router = new Router();
const axios = require("axios");
require("dotenv").config();

const apiKey = process.env.APP_KEY;

console.log(">>>>>>>>>>>>apiKey", apiKey);
require("tls").DEFAULT_MIN_VERSION = "TLSv1"; //API node version

router.get("/category", async (req, res) => {
  const response = await axios(
    `https://api.eventful.com/json/categories/list?app_key=${apiKey}`
  );
  // console.log("response.data @category router", response.data);
  res.send(response.data);
});

//get all of the events by location
router.get("/events/:location", async (req, res) => {
  // console.log("req.params @event location router", req.params);

  const response = await axios(
    `https://api.eventful.com/json/events/search\?app_key=${apiKey}\&location=${req.params.location}`
  );
  console.log("response.data @event router", response.data);
  res.send(response.data.events.event);
});

//get one event
router.get("/event/:id", async (req, res) => {
  // console.log("req.params @event event router", req.params);

  const response = await axios(
    `https://api.eventful.com/json/events/get\?app_key=${apiKey}\&id\=${req.params.id}`
  );
  // console.log("response.data @event router", response.data);
  res.send(response.data);
});

module.exports = router;
