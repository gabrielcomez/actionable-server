const { Router } = require("express");
const auth = require("../auth/middleware");
const Goal = require("./model");

const router = new Router();

router.post("/goal/:eventId", auth, async (request, response, next) => {
  try {
    // console.log(">>>goal adding response", response);

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

router.get("/goal", auth, async (request, response) => {
  // console.log(">>>request @goalsRouter GET", request.user.dataValues.id);
  try {
    const goalsById = await Goal.findAll({
      where: { userId: request.user.dataValues.id },
    });

    response.status(201).send(goalsById);
  } catch (error) {
    next(error);
  }
});

router.get("/goal/:eventId", auth, async (request, response) => {
  try {
    const goalById = await Goal.findOne({
      where: {
        eventId: request.params.eventId,
      },
    });
    console.log(">>>goals router userID", request.user.dataValues.id);

    console.log(">>>goalById @goalsRouter", goalById);
    response.status(201).send(goalById);
  } catch (error) {
    next(error);
  }
});

module.exports = router;

// /* DELETE individual article. */
// router.delete("/goal", auth, async (request, response) => {
//   Goal.findByPk(request.body.eventId).then((goal) => {
//     goal.destroy();
//   });
// });
