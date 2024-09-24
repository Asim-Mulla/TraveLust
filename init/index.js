const mongoose = require("mongoose");
const Listing = require("../models/listing.js");
const initData = require("./data.js");

main()
  .then((res) => {
    console.log("connection created");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/traveLust");
}

const initDB = async () => {
  await Listing.deleteMany({});
  initData.data = initData.data.map((obj) => ({
    ...obj,
    owner: "66d9751c8e8f7e6646ca6732",
  }));
  await Listing.insertMany(initData.data);
  console.log("data inserted");
};

initDB();
