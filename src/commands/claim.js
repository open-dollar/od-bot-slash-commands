const { createCommand } = require("../helpers");

module.exports = {
  UserCommand: createCommand({
    name: "claim",
    description: "Claim testnet tokens to use as collateral",
    options: ["address"],
  }),
};
