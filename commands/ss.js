const { lambdaURL } = require("../config.json");
const axios = require('axios').default;

module.exports = {
  name: "ss",
  description: "Take a full-page screenshot of any website.",
  cooldown: 60,
  args: true,
  guildOnly: true,
  aliases: ["screenshot"],
  usage: "google.com",
  async execute(message, args) {
    const webhooks = await message.channel.fetchWebhooks();
    let hook = webhooks.find(hook => hook.name === 'SSorBS');
    if (!hook) {
        hook = await message.channel.createWebhook("SSorBS", {
          avatar: "https://i.imgur.com/qT9DD0T.png",
          reason: "Used to post screenshots.",
        });
    }
    const screenshotURL = args[0];
    // make sure the URL format is ok for Puppeteer.
    await message.channel.send(`Taking a screenshot of ${url}. Please wait a moment.`);
    await axios.post(lambdaURL, {
        webhookURL: hook.url,
        screenshotURL: url,
        user: message.author.tag
    });
  },
};