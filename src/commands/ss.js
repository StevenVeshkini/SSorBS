const { accessKeyId, secretAccessKey, lambdaFunctionName } = require("../../config.json");
const AWS = require("aws-sdk");
AWS.config.update({
  accessKeyId,
  secretAccessKey,
  region: "us-east-1",
});
const lambda = new AWS.Lambda();

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
  cooldown: 60,
  args: true,
  guildOnly: true,
  aliases: ["screenshot"],
  usage: "google.com",
  async execute(message, args) {
    const webhooks = await message.channel.fetchWebhooks();
    let hook = webhooks.find(hook => hook.name === 'Screenshot Bot');
    if (!hook) {
        return await message.channel.send('Screenshot Bot is not enabled in this channel. Please enable it by using the !ssenable command.');
    }
    const screenshotURL = args[0];

    await message.channel.send(`Taking a screenshot of ${screenshotURL}. Please wait a moment.`);

    const data = {
      webhookURL: hook.url,
      screenshotURL: formatURL(screenshotURL),
      user: message.author.id,
    };
    let params = {
      FunctionName: lambdaFunctionName,
      InvocationType: "Event",
      Payload: JSON.stringify(data),
    };

    const result = await lambda.invoke(params).promise();
  },
};