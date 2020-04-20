const { Router } = require("express");
const { toJWT } = require("../auth/jwt");
const bcrypt = require("bcrypt");
const User = require("./model");

const router = new Router();

router.post("/user", async (request, response) => {
  console.log("request body", request.body);
  if (!request.body.email) {
    return response.status(400).send("Missing email");
  } else if (!request.body.password) {
    return response.status(400).send("Missing password");
  }

  const hashedPassword = bcrypt.hashSync(request.body.password, 10);

  try {
    await User.create({
      ...request.body,
      password: hashedPassword,
    });

    response.status(201).send("User created");
  } catch (error) {
    console.log(error.name);
    switch (error.name) {
      case "SequelizeUniqueConstraintError":
        return response.status(400).send({ message: "Email not unique" });

      default:
        return response.status(400).send("Bad request");
    }
  }
});

//FOR TESTING PURPOSES
router.get("/user", async (request, response) => {
  User.findAndCountAll()
    .then((users) => {
      if (!users) {
        response.status(404).send("Oops, no users here!").end();
      } else {
        response.send(users);
      }
    })
    .catch((error) => next(error));
});

router.post("/signin", async (request, response) => {
  // console.log("signin successful:", request.body);
  const user = await User.findOne({ where: { email: request.body.email } });

  const correctPassword = bcrypt.compareSync(
    request.body.password,
    user.password
  );

  if (correctPassword) {
    const token = toJWT({ id: user.id });
    return response.status(200).send({ token: token, name: user.name });
  }
});

module.exports = router;
