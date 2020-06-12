const { lambdaURL } = require("../config.json");
const axios = require('axios').default;

const formatURL = url => {
  // Checks if there is the 'http(s)://' protocol before the URL, and if not, adds it.
  if (!/^https?\:\/\//.test(url)) {
    url = "https://" + url;
  }
  return url;
}

module.exports = {
  name: "ss",
  description: "Take a full-page screenshot of any website.",
  cooldown: 1,
  args: true,
  guildOnly: true,
  aliases: ["screenshot"],
  usage: "google.com",
  async execute(message, args) {
    const webhooks = await message.channel.fetchWebhooks();
    let hook = webhooks.find(hook => hook.name === 'Screenshot Bot');
    if (!hook) {
        hook = await message.channel.createWebhook("Screenshot Bot", {
          avatar: "https://i.imgur.com/qT9DD0T.png",
          reason: "Used to post screenshots to the channel.",
        });
    }
    const screenshotURL = args[0];

    await message.channel.send(`Taking a screenshot of ${screenshotURL}. Please wait a moment.`);
    await axios.post(lambdaURL, {
        webhookURL: hook.url,
        screenshotURL: formatURL(screenshotURL),
        user: message.author.tag
    });
  },
};