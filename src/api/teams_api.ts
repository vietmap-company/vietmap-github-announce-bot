import axios from "axios";

class TeamsApi {
  async sendMessage(message: string) {
    const TEAMS_WEBHOOK_URL = process.env.TEAMS_WEBHOOK_URL;
    try {
      if (!TEAMS_WEBHOOK_URL) {
        return console.error("❌ TEAMS_WEBHOOK_URL is not defined");
      }
      await axios.post(TEAMS_WEBHOOK_URL, message);
      console.log(`✅ Message was sent to Teams`);
    } catch (error: any) {
      console.error("❌ Error sending message to Teams:", error.message);
    }
  }
}

export const teamsApi = new TeamsApi();
