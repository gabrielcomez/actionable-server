const { Router } = require("express");
const router = new Router();
const axios = require("axios");

require("tls").DEFAULT_MIN_VERSION = "TLSv1"; //API node version

const apiKey = "app_key=JgtjrXBpwvHSjN5b";

router.get("/category", async (req, res) => {
  const response = await axios(
    `https://api.eventful.com/json/categories/list?${apiKey}`
  );
  console.log("response.data @category router", response.data);
  res.send(response.data);
});

//get all of the events by location
router.get("/events/:location", async (req, res) => {
  console.log("req.params @event location router", req.params);

  const response = await axios(
    `https://api.eventful.com/json/events/search\?${apiKey}\&location=${req.params.location}`
  );
  console.log("response.data @event router", response.data.events.event);
  res.send(response.data.events.event);
});

//get one event
router.get("/event/:id", async (req, res) => {
  console.log("req.params @event event router", req.params);

  const response = await axios(
    `https://api.eventful.com/json/events/get\?${apiKey}\&id\=${req.params.id}`
  );
  console.log("response.data @event router", response.data);
  res.send(response.data);
});

module.exports = router;

// const request = require("request");

// router.get("/category", async (req, res) => {
//   request(`https://api.eventful.com/json/categories/list?${apiKey}`, function(
//     error,
//     response,
//     body
//   ) {
//     console.error("error:", error); // Print the error if one occurred
//     console.log("statusCode:", response && response.statusCode); // Print the response status code if a response was received
//     console.log("______________________________body:", body); // Print the HTML for the page.
//     res.send(body);
//   });
// });
