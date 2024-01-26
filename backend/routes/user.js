const express = require("express");
const z = require("zod");
const jwt = require("jsonwebtoken");

const router = express.Router();
const User = require("../schema");
const { JWT_SECRET } = require("../config");

// for e.g. api/v1/user/signin will come here

const userSignUpSchema = z.object({
  username: z.string().email(),
  firstName: z.string(),
  lastName: z.string(),
  password: z.string().min(8),
});

const userSignInSchema = z.object({
  username: z.string().email(),
  password: z.string().min(8),
});

router.post("/signup", async (req, res) => {
  const username = req.body.username;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const password = req.body.password;

  if (!username || !password || !firstName || !lastName) {
    res.status(400).send({
      msg: "Please send all the parameters in request username, password, firstname, lastname.",
    });
  }

  const response = userSignUpSchema.safeParse(req.body);
  if (!response.success) {
    return res.status(400).send({
      msg: response,
    });
  }

  const checkIsUserExists = await User.findOne({ username });
  if (checkIsUserExists) {
    return res.status(400).send({
      msg: "Account has been registered with given username, please login with the same.",
    });
  }

  const user = new User({
    username: username,
    password: password,
    firstName: firstName,
    lastName: lastName,
  });
  user.save();

  // short verison of line 41 to 47
  // const user = await User.create({
  //     username: req.body.username,
  //     password: req.body.password,
  //     firstName: req.body.firstName,
  //     lastName: req.body.lastName,
  // })

  const userId = user._id;

  // payload should be json format -> jwt.sign(paylod,secretkey)

  const token = jwt.sign({ userId }, JWT_SECRET);

  return res.status(200).send({
    msg: "user registered successfully",
    res: {
      token: token,
    },
  });
});

router.post("/signin", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (!username || !password) {
    res.status(400).send({
      msg: "Please send all the parameters in request username, password.",
    });
  }

  const response = userSignInSchema.safeParse(req.body);
  if (!response.success) {
    return res.status(400).send({
      msg: response,
    });
  }

  const checkIsUserExists = await User.findOne({ username, password });
  if (checkIsUserExists) {
    const token = jwt.sign({ userId: checkIsUserExists._id }, JWT_SECRET);
    res.status(200).send({
      token: token,
    });
  } else {
    res.status(400).send({
      msg: "Error while logging in",
    });
  }
});

module.exports = router;
