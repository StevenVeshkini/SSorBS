console.log()

module.exports = {
  name: "ss",
  description: "Take a full-page screenshot of any website.",
  cooldown: 60,
  args: true,
  guildOnly: true,
  aliases: ["screenshot"],
  usage: "google.com",
  async execute(message, args) {
    const url = args[0];
    await message.channel.send(`Taking a screenshot of ${url}.`);
  },
};