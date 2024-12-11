const userModel = require("../models/UserModel");

exports.registerUser = async (req, res) => {
  const { userAuthId } = req.body;
console.log("user get to add",userAuthId)
  try {
    const user = await userModel
      .create({ userAuthId: userAuthId })
      .then((user) => {
        return res.json("User created");
      })
      .catch((err) => {
        return res.json("error creating user", err);
      });
  } catch (error) {
    return res.json("Server error");
  }
};
