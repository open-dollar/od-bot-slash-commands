const { createCommand } = require("../helpers");

module.exports = {
  UserCommand: createCommand({
    name: "user",
    description: "Get user data",
    options: ["address"],
  }),
};
