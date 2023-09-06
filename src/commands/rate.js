const { createCommand } = require("../helpers");

module.exports = {
  RateCommand: createCommand({
    name: "rate",
    description: "Update Redemption Rate",
  }),
};
