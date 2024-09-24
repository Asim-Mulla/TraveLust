const Listing = require("../models/listing.js");

module.exports.index = async (req, res) => {
  const allListings = await Listing.find({});
  res.render("listings/index.ejs", { allListings });
};

module.exports.renderNewForm = (req, res) => {
  res.render("listings/new.ejs");
};

module.exports.showListing = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id)
    .populate({ path: "reviews", populate: { path: "author" } })
    .populate("owner");

  if (!listing) {
    req.flash("error", "Listing you requested for does't exists");
    res.redirect("/listings");
  }
  res.render("listings/show.ejs", { listing });
};

module.exports.createListing = async (req, res, next) => {
  let url = req.file.path;
  let filename = req.file.filename;
  let { lat, lon } = req;

  const newListing = new Listing(req.body.listing);

  newListing.owner = req.user._id;
  newListing.image = { url, filename };
  newListing.geometry.type = "Point";
  newListing.geometry.coordinates = [lat, lon];

  let savedListing = await newListing.save();

  req.flash("success", "New Listing Created");
  res.redirect("/listings");
};

module.exports.renderEditForm = async (req, res) => {
  let { id } = req.params;

  let listing = await Listing.findById(id);
  if (!listing) {
    req.flash("error", "Listing you requested for does't exists");
    res.redirect("/listings");
  }
  res.render("listings/edit.ejs", { listing });
};

module.exports.updateListing = async (req, res) => {
  let { id } = req.params;
  let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });

  if (req.file) {
    let url = req.file.path;
    let filename = req.file.filename;
    listing.image = { url, filename };
    await listing.save();
  }

  let { lat, lon } = req;
  listing.geometry.type = "Point";
  listing.geometry.coordinates = [lat, lon];
  await listing.save();

  req.flash("success", "Listing Updated");
  res.redirect(`/listings/${id}`);
};

module.exports.deleteListing = async (req, res) => {
  let { id } = req.params;
  let deletedList = await Listing.findByIdAndDelete(id);
  req.flash("success", "Listing Deleted");
  res.redirect("/listings");
};

module.exports.showWishlist = (req, res) => {
  res.render("listings/wishlist.ejs");
};

module.exports.showTrips = (req, res) => {
  res.render("listings/trips.ejs");
};

module.exports.showMessages = (req, res) => {
  res.render("listings/messages.ejs");
};

module.exports.showProfile = (req, res) => {
  res.render("listings/profile.ejs");
};

module.exports.showCategorized = async (req, res) => {
  let { appliedCategory } = req.params;
  const allListings = await Listing.find({ category: appliedCategory });
  res.render("listings/categorized.ejs", { allListings, appliedCategory });
};

module.exports.showSearched = async (req, res) => {
  const searchQuery = req.query.q;
  if (!searchQuery) {
    req.flash("error", "Please enter a search term");
    return res.redirect("/listings");
  }

  let allListings = await Listing.find({
    title: new RegExp(searchQuery, "i"),
  });

  if (allListings.length === 0) {
    req.flash("error", "No results found");
    return res.redirect("/listings");
  }

  // Render the search results
  res.render("listings/categorized.ejs", { allListings, searchQuery });
};
