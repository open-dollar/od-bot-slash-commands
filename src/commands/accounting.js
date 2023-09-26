const { createCommand } = require("../helpers");

module.exports = {
  OracleCommand: createCommand({
    name: "accounting",
    description:
      "Run accounting tasks: popDebtFromQueue, auctionDebt, auctionSurplus, transferExtraSurplus",
  }),
};
