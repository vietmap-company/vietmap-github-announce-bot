import axios from "axios";

class TelegramApi {
  async sendMessage(message: string) {
    const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN;
    const CHAT_ID = process.env.CHAT_ID;
    try {
      await axios.post(
        `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`,
        {
          chat_id: CHAT_ID,
          text: message,
          parse_mode: "Markdown",
        }
      );

      console.log(`✅ Message was sent to Telegram`);
    } catch (error: any) {
      console.error("❌ Error sending message:", error.message);
    }
  }
}

export const telegramApi = new TelegramApi();
