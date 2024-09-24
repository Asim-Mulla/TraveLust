const express = require("express");
const router = express.Router();
const User = require("../models/user");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware");
const {
  renderSignupForm,
  signup,
  renderLoginForm,
  login,
  logout,
  render_login_signup_page,
  renderAdminForm,
  authenticateAdmin,
} = require("../controllers/users");

// signup
router.route("/signup").get(renderSignupForm).post(wrapAsync(signup));

// login
router
  .route("/login")
  .get(renderLoginForm)
  .post(
    saveRedirectUrl,
    passport.authenticate("local", {
      failureRedirect: "/login",
      failureFlash: true,
    }),
    login
  );

// login_signup
router.get("/login_signup", render_login_signup_page);

// LogOut
router.get("/logout", logout);

// Admin
let key = process.env.ADMIN_URL;
router.get(`/admin/${key}`, renderAdminForm).post("/admin", authenticateAdmin);

module.exports = router;
