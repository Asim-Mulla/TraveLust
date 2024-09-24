const express = require("express");
const wrapAsync = require("../utils/wrapAsync.js");
const { listingSchema } = require("../schema.js");
const ExpressError = require("../utils/ExpressError.js");
const Listing = require("../models/listing.js");
const {
  isLoggedIn,
  isOwner,
  validateListing,
  validateLocation,
} = require("../middleware.js");
const {
  index,
  renderNewForm,
  showListing,
  createListing,
  renderEditForm,
  updateListing,
  deleteListing,
  showWishlist,
  showTrips,
  showMessages,
  showProfile,
  showCategorized,
  showSearched,
} = require("../controllers/listings.js");
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });
const router = express.Router();

router
  .route("/")
  .get(wrapAsync(index))
  .post(
    isLoggedIn,
    upload.single("listing[image]"),
    validateListing,
    validateLocation,
    wrapAsync(createListing)
  );

// New Route
router.get("/new", isLoggedIn, renderNewForm);

// Wishlist
router.get("/wishlist", isLoggedIn, showWishlist);

// Trips
router.get("/trips", isLoggedIn, showTrips);

// Messages
router.get("/messages", isLoggedIn, showMessages);

// Profile
router.get("/profile", isLoggedIn, showProfile);

// Categorized
router.get("/category/:appliedCategory", showCategorized);

// Search
router.get("/search", showSearched);

router
  .route("/:id")
  .get(wrapAsync(showListing))
  .put(
    isLoggedIn,
    isOwner,
    upload.single("listing[image]"),
    validateListing,
    validateLocation,
    wrapAsync(updateListing)
  )
  .delete(isLoggedIn, isOwner, wrapAsync(deleteListing));

// Edit Listing Route
router.get("/:id/edit", isOwner, isLoggedIn, wrapAsync(renderEditForm));

module.exports = router;
