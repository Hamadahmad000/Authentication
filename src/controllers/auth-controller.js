const USER = require("../schema/auth-schema");

// HANDLING USER SIGNUP
const HandleSignup = async (req, res) => {
  try {
    const { name, email, password } = req?.body;
    const userExist = await USER.findOne({ email: email });
    if (userExist)
      return res.json({ success: false, message: "User already Registered" });
    const NEWUSER = await new USER({
      name: name,
      email: email,
      password: password,
    });
    await NEWUSER.save();
    res.json({ sucess: true, message: "Signup successful" });
  } catch (error) {
    console.log(error);
  }
};
// HANDLING USER LOGIN
const HandleLogin = async (req, res) => {
  try {
    const { email, password } = req?.body;
    const vUser = await USER.findOne({ email: email });
    if (!vUser)
      return res.json({
        success: false,
        message: "Not registered, Please first signup",
      });
    const PasswordMatched = await vUser.ComparePassword(password);
    if (!PasswordMatched)
      return res.json({
        success: false,
        error: "Invalid username or password",
      });
    res.status(200).json({ success: true, messae: "Login Successful" });

    // res.json({ sucess: true, message: "Signup successful" });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  HandleSignup,
  HandleLogin,
};
