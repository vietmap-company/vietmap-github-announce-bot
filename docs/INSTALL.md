# Setup this repository
1. Clone the repository to your VPS:
```bash
   git clone https://github.com/vietmap-company/vietmap-telegram-announce-bot.git
```
2. Navigate to the cloned directory:
```bash
   cd vietmap-telegram-announce-bot
```
3. Create a `.env` file in the `root` folder directory and add your telegram bot token and chat ID:
```bash
    TELEGRAM_TOKEN = 'YOUR_TELEGRAM_BOT_TOKEN';'; 
    CHAT_ID = 'YOUR_TELEGRAM_CHAT_ID';
    TEAMS_WEBHOOK_URL = 'TEAMS_WEBHOOK_URL';
    PORT = 3000;
```
4. Install the required packages:
```bash
   npm install
```
5. Run the bot:
```bash
   npx tsc
```
6. Start the bot with pm2:
```bash
   pm2 start dist/index.js --name "vietmap-telegram-announce-bot"`
```
7. Set up a webhook for your bot:
- The bot is running on an outside VPS on default port `3000`, so you need to set up a webhook to receive updates from GitHub.
- Go to `https://github.com/organizations/{your-organization}/settings/hooks` (required admin permission) and add a new webhook with the following settings:
  - Payload URL: `http://{your-vps-ip}:{your-port}/github-webhook`
    - Content type: `application/json`
    - Secret: ``
    - Send me everything: `Yes`
    - Active: `Yes`

Note: Your port is the port you set in the `.env` file, default is `3000`. 
![Config github](./images/github_config.png)

- Make sure to replace `{your-organization}` with your GitHub organization name and `{your-vps-ip}`, `{your-port}` with your VPS IP and PORT address.

## How to setup Telegram bot token and chat ID
Follow this [link](./GET_TELEGRAM_TOKEN.md) to get your Telegram bot token and chat ID.
## How to setup Teams webhook URL
Follow this [link](./GET_TEAMS_WEBHOOK.md) to get your Teams webhook URL.