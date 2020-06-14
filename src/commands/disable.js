module.exports = {
  name: "ssdisable",
  description: "Disables the use of Screenshot Bot in the current channel.",
  args: false,
  guildOnly: true,
  ownerOnly: true,
  usage: ". Use in the channel that you would like to disable. Only the guild owner can use this command.",
  async execute(message, args) {
    const webhooks = await message.channel.fetchWebhooks();
    let hook = webhooks.find((hook) => hook.name === "Screenshot Bot");
    if (!hook) {
      await message.channel.send("Screenshot Bot is already disabled in this channel.");
    } else {
      await hook.delete();
      await message.reply("Screenshot Bot has been disabled.");
    }
  },
};
