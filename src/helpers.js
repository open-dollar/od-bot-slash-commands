const { Command } = require("@sapphire/framework");
const fetch = require("cross-fetch");

const createCommand = ({ name, description, options }) => {
  class MyCommand extends Command {
    constructor(context, opts) {
      super(context, { ...opts });
    }

    registerApplicationCommands(registry) {
      registry.registerChatInputCommand((builder) => {
        builder.setName(name).setDescription(description);
        if (options)
          options.map((optionName) => {
            builder.addStringOption((option) =>
              option
                .setName(optionName)
                .setDescription("Additonal info")
                .setRequired(true)
            );
          });
      });
    }

    async chatInputRun(interaction) {
      await interaction.deferReply();
      const optionString = options
        ? options
            .map(
              (optionName) =>
                `&${optionName}=${interaction.options.getString(optionName)}`
            )
            .join("")
        : "";
      const response = await fetch(
        `${process.env.OD_API_URL}/${name}?secret=${process.env.OD_API_SECRET}${optionString}`
      );
      if (response.status === 200) {
        return interaction.editReply(`Request completed`);
      }
      const json = await response.json();
      return interaction.editReply(`Potential failure: ${response.status}
\`\`\`json
${JSON.stringify(json.error, null, 2).slice(0, 500)}
\`\`\` `);
    }
  }
  return MyCommand;
};

module.exports = { createCommand };
