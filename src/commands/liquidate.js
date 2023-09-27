const { createCommand } = require("../helpers");

module.exports = {
  UserCommand: createCommand({
    name: "liquidate",
    description: "Liquidate an under-collateralized vault",
    options: ["id"],
  }),
};
