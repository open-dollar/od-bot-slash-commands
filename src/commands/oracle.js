const { createCommand } = require("../helpers");

module.exports = {
  OracleCommand: createCommand({
    name: "oracle",
    description: "Update Collateral Oracle Prices",
  }),
};
