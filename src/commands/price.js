const { createCommand } = require("../helpers");

module.exports = {
  PriceCommand: createCommand({
    name: "price",
    description: "Set the price for a test token",
    options: ["token", "price", "execute"],
  }),
};
