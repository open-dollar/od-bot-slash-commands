const { createCommand } = require("../helpers");

module.exports = {
  AnalyticsCommand: createCommand({
    name: "analytics",
    description: "Get all analytics data",
  }),
};
