const jwt = require("jsonwebtoken");
const jwtKey = require("../config");
const User = require("../modals/user");

const auth = async (req, res, next) => {
  
  try {
    const token = req.header("authorization");
    const decodeData = jwt.verify(token, jwtKey);
    const user = await User.findOne({
      _id: decodeData._id,
      "tokens.token": token,
    });

    if (!user) {
      return res.json({ success: false, msg: "Authorization failed! Login Again" });
    }
    console.log(user)
    req.user = user;
   
    next();
  } catch (e) {
    res.json({ success: false, msg: "Authorization failed!" });
  }
};



module.exports = auth