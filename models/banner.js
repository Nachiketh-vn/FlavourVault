const mongoose = require("mongoose");

const restaurantBannerSchema = new mongoose.Schema({
  restaurantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Restaurant",
    required: true,
  },
  banner1: { type: String, default: null },
  banner2: { type: String, default: null },
  banner3: { type: String, default: null },
  banner4: { type: String, default: null },
  banner5: { type: String, default: null },
});

const RestaurantBanner =
  mongoose.models.RestaurantBanner ||
  mongoose.model("RestaurantBanner", restaurantBannerSchema);

module.exports = RestaurantBanner;
