const { Router } = require("express");
const auth = require("../auth/middleware");
const Goal = require("./model");

const router = new Router();

router.post("/goal", auth, async (request, response, next) => {
  try {
    const newGoal = { ...request.body, userId: request.user.dataValues.id };
    const goal = await Goal.create(newGoal);

    response.status(201).send(goal);
  } catch (error) {
    next(error);
  }
});

router.get("/goal", async (request, response) => {
  Goal.findAll()
    .then((goals) => {
      if (!goals) {
        response.status(404).send("Oops, no goals here!").end();
      } else {
        response.send(goals);
      }
    })
    .catch((error) => next(error));
});

module.exports = router;
