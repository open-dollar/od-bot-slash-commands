const { Command } = require("@sapphire/framework");
const fetch = require("cross-fetch");

const createCommand = ({ name, description, optionName }) => {
  class MyCommand extends Command {
    constructor(context, options) {
      super(context, { ...options });
    }

    registerApplicationCommands(registry) {
      registry.registerChatInputCommand((builder) => {
        builder.setName(name).setDescription(description);
        if (optionName)
          builder.addStringOption((option) =>
            option
              .setName(optionName)
              .setDescription("provide additonal data")
              .setRequired(true)
          );
      });
    }

    async chatInputRun(interaction) {
      await interaction.deferReply();
      const optionString = optionName
        ? `&${optionName}=${interaction.options.getString(optionName)}`
        : "";
      const response = await fetch(
        `${process.env.OD_API_URL}/${name}?secret=${process.env.OD_API_SECRET}${optionString}`
      );
      if (response.status === 200) {
        return interaction.editReply(`Request completed`);
      }

      return interaction.editReply(`Potential failure: ${response.status}`);
    }
  }
  return MyCommand;
};

module.exports = { createCommand };
