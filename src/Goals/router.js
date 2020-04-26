const { Router } = require("express");
const auth = require("../auth/middleware");
const Goal = require("./model");

const router = new Router();

router.post("/goal/:eventId", auth, async (request, response, next) => {
  try {
    console.log(">>>goal adding response", response);

    const newGoal = {
      ...request.body,
      userId: request.user.dataValues.id,
    };
    const goal = await Goal.create(newGoal);

    response.status(201).send(goal);
  } catch (error) {
    next(error);
  }
});

router.get("/goal/:eventId", auth, async (request, response) => {
  console.log(">>>request @goalsRouter GET", request.user.dataValues.id);

  Goal.findAll({ where: { userId: request.user.dataValues.id } })
    .then((goals) => {
      if (!goals) {
        response.status(404).send("Oops, no goals here!").end();
      } else {
        return response.send(goals);
      }
    })
    .catch((error) => next(error));
});

module.exports = router;

// /* DELETE individual article. */
// router.delete("/goal", auth, async (request, response) => {
//   Goal.findByPk(request.body.eventId).then((goal) => {
//     goal.destroy();
//   });
// });
