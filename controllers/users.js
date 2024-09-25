const User = require("../models/user");

module.exports.renderSignupForm = (req, res) => {
  res.render("users/signup.ejs");
};

module.exports.signup = async (req, res, next) => {
  try {
    let { username, email, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
      req.flash("error", "Incorrect Password");
      res.redirect("/signup");
      return;
    }

    const newUser = new User({ email, username });
    const registeredUser = await User.register(newUser, password);
    req.login(registeredUser, (err) => {
      if (err) {
        return next(err);
      }
      req.flash("success", "Welcome to TraveLust");
      res.redirect("/listings");
    });
  } catch (error) {
    req.flash("error", error.message);
    res.redirect("/signup");
  }
};

module.exports.renderLoginForm = (req, res) => {
  res.render("users/login.ejs");
};

module.exports.login = async (req, res) => {
  req.flash("success", "Welcome back to TraveLust");
  if (!res.locals.redirectUrl) {
    res.redirect("/listings");
  } else {
    res.redirect(res.locals.redirectUrl);
  }
};

module.exports.logout = (req, res, next) => {
  req.logOut((err) => {
    if (err) {
      return next(err);
    }
    req.flash("success", "You are logged out");
    res.redirect("/listings");
  });
};

module.exports.render_login_signup_page = (req, res) => {
  res.render("users/login_signup.ejs");
};

module.exports.renderAdminForm = (req, res) => {
  res.render("users/admin.ejs");
};

module.exports.authenticateAdmin = (req, res) => {
  const { username, password } = req.body;
  if (
    username === process.env.ADMIN_USERNAME &&
    password === process.env.ADMIN_PASSWORD
  ) {
    req.session.admin = true;
    req.flash("success", "Welcome back Admin");
    res.redirect("/listings");
  } else {
    req.flash("error", "Failed to login as Admin");
    res.redirect("/listings");
  }
};
