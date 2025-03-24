### Create new Telegram bot and send message to channel:
## Flow
- Create **Telegram bot** and add to **Telegram channel**.
- Get **token bot** and channel **chat ID** .
- Send notify using **GitHub Webhook** or **GitHub Actions**

---

## 1. Create Telegram bot and get chat ID
### Step 1: Create Telegram bot
- Find `@BotFather` on Telegram.
- Type `/newbot` and follow the instructions:
- BotFather will send you **TOKEN API**, ex:  
```
    123456789:ABCDefGHIjklMNOpqrsTUVwxyZ
```

### Step 2: Add bot to channel 
- Go to your channel.
- Add bot as **Admin** to the channel, select the permissions you want to give it. (Bot need to have permission to send messages in the channel).

### Step 3: Get chat ID
- Send a message to your channel (any text).
- Go to this URL to get chat ID: (make sure your bot has admin permissions in the channel). `YOUR_TOKEN` is the token you got from `BotFather`.
  ```
  https://api.telegram.org/bot<YOUR_TOKEN>/getUpdates
  ```  
Replace `<YOUR_TOKEN>` with your token.  
  - Chat id usually has this format: `-1001234567890`.

---
## Usage
YOUR_TOKEN is the token you got from `BotFather`, import it to `env.ts` file as `TELEGRAM_TOKEN`.

Chat id usually has this format: `-1001234567890`, import it to `env.ts` file as `CHAT_ID`.