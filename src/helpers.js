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
      let quote = "";
      try {
        const res = await fetch(
          "https://api.quotable.io/random?tags=love|happiness|change|creativity|freedom|gratitude|mathematics|science|social-justice|wellness"
        );
        const json = await res.json();
        quote = `> ${json.content} - ${json.author}`;
      } catch (e) {
        // Do nothing
      }
      await interaction.editReply(
        `Received! This may take several minutes to complete...\n\n${quote}`
      );
      // Call the od-bot API
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
        return interaction.editReply(`Request complete`);
      }
      try {
        const json = await response.json();
        return interaction.editReply(`Potential failure: ${response.status}
  \`\`\`json
  ${JSON.stringify(json.error, null, 2).slice(0, 500)}
  \`\`\` `);
      } catch (e) {
        return interaction.editReply(`Potential failure: ${response.status}`);
      }
    }
  }
  return MyCommand;
};

module.exports = { createCommand };
