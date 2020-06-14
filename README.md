# Screenshot Bot
Screenshot Bot is a Discord bot that lets you take a full page screenshot of any website with a simple command.

Invite Screenshot Bot to your server [here](https://discord.com/oauth2/authorize?client_id=720935079668613150&scope=bot&permissions=536872960).

## How it works
Screenshot Bot is designed to be a scalable Discord bot. Discord bots must be run on a server to process messages (can use AWS EC2, AWS Lightsail, AWS Fargate, etc.) since there is no outgoing webhook for Discord events. Screenshot Bot is run on an AWS EC2 instance, using pm2 to make sure it restarts if it ever crashes. It does not store any state, which makes it easy to restart if crashed and simple to shard. 

Every time `!ss!` is run, it triggers an AWS Lambda function (see [this repository](https://github.com/StevenVeshkini/chrome-lambda-screenshot)) that opens up a Puppeteer instance, takes a screenshot of the page, and uses a webhook to send the screenshot back to the channel where `!ss!` was run.

### Commands

#### `!!ssenable`
Used to enable Screenshot Bot in a specific channel.

<img src="https://github.com/StevenVeshkini/SSorBS/blob/master/images/ssenable.png" width="50%" height="50%">

#### `!!ss`
Used to take a screenshot.

##### Normal webpage
The screenshot should fit in one message.

<img src="https://github.com/StevenVeshkini/SSorBS/blob/master/images/sssimple.png" width="50%" height="50%">

##### Long webpage
Some webpages are long, and the text gets difficult to read the longer they are. For long webpages, Screenshot Bot will split the screenshot into several different chunks and send those as messages.

<img src="https://github.com/StevenVeshkini/SSorBS/blob/master/images/sscomplicated.png" width="50%" height="50%">

#### `!!ssdisable`
Used to disable Screenshot Bot in a specific channel. 

<img src="https://github.com/StevenVeshkini/SSorBS/blob/master/images/ssdisable.png" width="50%" height="50%">

### Usage
If you want to run this bot or use the code in your own bot, you will need to make `config.json` file and fill in the necessary values. See `config.json.sample` for reference. Make sure not to commit your API keys to Github.

### Todo
- [ ] !!ssalias command to give a commonly accessed webpage (i.e google.com) an alias (gg). Expected Usage: `!ss gg`. 
