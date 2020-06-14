module.exports = {
  name: "ssenable",
  description: "Enables the use of Screenshot Bot in the current channel.",
  args: false,
  guildOnly: true,
  ownerOnly: true,
  usage: ". Use in the channel that you would like to enable. Only the guild owner can use this command.",
  async execute(message, args) {
    const webhooks = await message.channel.fetchWebhooks();
    let hook = webhooks.find((hook) => hook.name === "Screenshot Bot");
    if (!hook) {
      hook = await message.channel.createWebhook("Screenshot Bot", {
        avatar: "https://i.imgur.com/qT9DD0T.png",
        reason: "Used to post screenshots to the channel.",
      });
      await message.reply("Screenshot Bot has been enabled in this channel. Command !ss is now available.");
    } else {
      await message.reply("Screenshot Bot is already enabled in this channel. Use command !sshelp for more information on commands.");
    }
  },
};
