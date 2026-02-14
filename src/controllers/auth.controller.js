const userModel = require("../models/user.model")
const jwt = require("jsonwebtoken")
const emailService = require("../services/email.service")
const tokenBlackListModel = require("../models/blacklist.model")

/**
* - user register controller
* - POST /api/auth/register
*/
async function userRegisterController(req, res) {
    const { email, password, name } = req.body

    const isExists = await userModel.findOne({
        email: email
    })

    if (isExists) {
        return res.status(422).json({
            message: "User already exists with email.",
            status: "failed"
        })
    }

    const user = await userModel.create({
        email, password, name
    })

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "3d" })

  res.cookie("token", token, {
  httpOnly: true,
  secure: true,        // REQUIRED for HTTPS
  sameSite: "none",    // REQUIRED for cross-origin
  maxAge: 3 * 24 * 60 * 60 * 1000
});



    res.status(201).json({
        user: {
            _id: user._id,
            email: user.email,
            name: user.name
        },
        token
    })

    await emailService.sendRegistrationEmail(user.email, user.name)
}

/**
 * - User Login Controller
 * - POST /api/auth/login
  */

async function userLoginController(req, res) {
    const { email, password } = req.body

    console.log("LOGIN BODY:", req.body)

    const user = await userModel
  .findOne({ email })
  .select("+password +systemUser")


    console.log("USER FOUND:", user)

    if (!user) {
        return res.status(401).json({
            message: "Email or password is INVALID"
        })
    }

    const isValidPassword = await user.comparePassword(password)

    console.log("PASSWORD VALID:", isValidPassword)

    if (!isValidPassword) {
        return res.status(401).json({
            message: "Email or password is INVALID"
        })
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "3d" })

    res.cookie("token", token, {
  httpOnly: true,
  secure: true,        // REQUIRED for HTTPS
  sameSite: "none",    // REQUIRED for cross-origin
  maxAge: 3 * 24 * 60 * 60 * 1000
});


   res.status(200).json({
    user: {
        _id: user._id,
        email: user.email,
        name: user.name,
        systemUser: user.systemUser   // 👈 add this
    }
})

}



/**
 * - User Logout Controller
 * - POST /api/auth/logout
  */
async function userLogoutController(req, res) {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[ 1 ]

    if (!token) {
        return res.status(200).json({
            message: "User logged out successfully"
        })
    }



    await tokenBlackListModel.create({
        token: token
    })

    res.clearCookie("token", {
  httpOnly: true,
  secure: true,
  sameSite: "none"
});



    res.status(200).json({
        message: "User logged out successfully"
    })

}


/**
 * - GET /api/auth/me
 * - Return currently logged-in user (based on cookie)
 */
async function userMeController(req, res) {
  // authMiddleware already set req.user
  if (!req.user) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  return res.status(200).json({
    user: {
      _id: req.user._id,
      email: req.user.email,
      name: req.user.name,
      systemUser: req.user.systemUser || false
    }
  });
}

module.exports = {
  userRegisterController,
  userLoginController,
  userLogoutController,
  userMeController // <-- add here
};
