const { createCommand } = require("../helpers");

module.exports = {
  AuctionCommand: createCommand({
    name: "auction",
    description: "Get all auction data",
  }),
};
