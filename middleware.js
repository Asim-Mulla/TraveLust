const Listing = require("./models/listing.js");
const Review = require("./models/review.js");
const ExpressError = require("./utils/ExpressError.js");
const { listingSchema, reviewSchema } = require("./schema.js");

module.exports.isLoggedIn = (req, res, next) => {
  req.session.redirectUrl = req.originalUrl;

  if (res.locals.admin) {
    return next();
  }

  if (req.isAuthenticated()) {
    return next();
  }
  req.flash("error", "You must be logged in.");
  return res.redirect("/login");

  // if (!req.isAuthenticated()) {
  //   req.flash("error", "You must be logged in.");
  //   return res.redirect("/login");
  // }
  // next();
};

module.exports.saveRedirectUrl = (req, res, next) => {
  if (req.session.redirectUrl) {
    res.locals.redirectUrl = req.session.redirectUrl;
  }
  next();
};

module.exports.isOwner = async (req, res, next) => {
  let { id } = req.params;
  let listing = await Listing.findById(id);
  if (res.locals.admin) {
    return next();
  }
  if (listing.owner.equals(res.locals.currUser._id)) {
    return next();
  }
  req.flash("error", "You are not the owner of this listing");
  return res.redirect(`/listings/${id}`);
};

module.exports.isAuthor = async (req, res, next) => {
  let { id, reviewId } = req.params;
  let review = await Review.findById(reviewId);
  if (res.locals.admin) {
    return next();
  }
  if (review.author.equals(res.locals.currUser._id)) {
    return next();
  }
  req.flash("error", "You are not the author of this review");
  return res.redirect(`/listings/${id}`);
};

module.exports.validateListing = (req, res, next) => {
  let { error } = listingSchema.validate(req.body);
  if (error) {
    throw new ExpressError(400, error);
  } else {
    next();
  }
};

module.exports.validateReview = (req, res, next) => {
  let { error } = reviewSchema.validate(req.body);
  if (error) {
    throw new ExpressError(400, error);
  } else {
    next();
  }
};

module.exports.validateLocation = (req, res, next) => {
  geocode();

  function geocode() {
    let address = req.body.listing.location;
    let url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
      address
    )}`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (data.length === 0) {
          req.flash("error", "Enter a valid location");
          return res.redirect("/listings/new");
        } else {
          req.lat = data[0].lat;
          req.lon = data[0].lon;
          next();
        }
      })
      .catch((err) => {
        throw new ExpressError(500, "Something went wrong");
      });
  }
};
