## VietMap github telegram bot
This is a telegram bot that provides information about VietMap, a Vietnamese map service. The bot will push any issue, PR, or comment to the telegram channel.
## Installation
1. Clone the repository:
```bash
   git clone 
```
2. Install the required packages:
```bash
   npm install
```
3. Create a `env.ts` file in the `src` folder directory and add your telegram bot token and chat ID:
```bash
    TELEGRAM_TOKEN=your_telegram_bot_token
    CHAT_ID=your_telegram_chat_id
```
4. Run the bot:
```bash
   npm start
```
5. Set up a webhook for your bot:
The bot is running on an outside VPS, so you need to set up a webhook to receive updates from GitHub.
VPS IP: `http://103.137.185.17:3000/`

Make any update about this webhook
```bash
    https://github.com/organizations/vietmap-company/settings/hooks/536076808
```

## Usage
The bot will automatically send messages to the specified Telegram channel whenever there is a new issue, PR, or comment on the VietMap GitHub repository.

Go to the VietMap GitHub repository and create a new issue, PR, or comment. The bot will send a message to the specified Telegram channel with the details of the update.

Invite [link](https://t.me/+9DtqgEbjSFZmZDBl):
```bash
    https://t.me/+9DtqgEbjSFZmZDBl
```
## Features