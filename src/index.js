const { SapphireClient } = require("@sapphire/framework");
const {
  ApplicationCommandRegistries,
  RegisterBehavior,
} = require("@sapphire/framework");
const runJobs = require("./jobs")

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

ApplicationCommandRegistries.setDefaultBehaviorWhenNotIdentical(
  RegisterBehavior.BulkOverwrite
);

 client.login(process.env.DISCORD_BOT_TOKEN);

runJobs()
setInterval(runJobs, 3600000);