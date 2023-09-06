const { SapphireClient } = require("@sapphire/framework");
const { GatewayIntentBits } = require("discord.js");
const dotenv = require("dotenv");
dotenv.config();

const client = new SapphireClient({
  intents: [
    // GatewayIntentBits.MessageContent,
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
  ],
  loadMessageCommandListeners: true,
});

client.login(process.env.BOT_TOKEN);
