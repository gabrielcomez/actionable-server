const { Router } = require("express");
const router = new Router();
const axios = require("axios");
const apiKey = require("../../config.js");

require("tls").DEFAULT_MIN_VERSION = "TLSv1"; //API node version

router.get("/category", async (req, res) => {
  const response = await axios(
    `https://api.eventful.com/json/categories/list?${apiKey}`
  );
  // console.log("response.data @category router", response.data);
  res.send(response.data);
});

//get all of the events by location
router.get("/events/:location", async (req, res) => {
  // console.log("req.params @event location router", req.params);

  const response = await axios(
    `https://api.eventful.com/json/events/search\?${apiKey}\&location=${req.params.location}`
  );
  // console.log("response.data @event router", response.data);
  res.send(response.data.events.event);
});

//get one event
router.get("/event/:id", async (req, res) => {
  // console.log("req.params @event event router", req.params);

  const response = await axios(
    `https://api.eventful.com/json/events/get\?${apiKey}\&id\=${req.params.id}`
  );
  // console.log("response.data @event router", response.data);
  res.send(response.data);
});

module.exports = router;
