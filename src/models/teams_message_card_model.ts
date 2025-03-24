export class TeamsMessageCardModel {
  getNewIssueJson(
    issueTitle: string,
    fullName: string,
    user: string,
    body: string,
    issueUrl: string
  ): any {
    return {
      "type": "message",
      "attachments": [
        {
          "type": "AdaptiveCard",
          "contentType": "application/vnd.microsoft.card.adaptive",
          "body": [
            {
              "type": "TextBlock",
              "size": "Medium",
              "weight": "Bolder",
              "text": `Issue mới: [${issueTitle}](${issueUrl})`,
            },
            {
              "type": "TextBlock",
              "size": "Medium",
              "weight": "Bolder",
              "text": `Repository: [${fullName}](https://github.com/${fullName})`,
            },

            {
              "type": "TextBlock",
              "size": "Medium",
              "weight": "Bolder",
              "text": `Người tạo: [${user}](https://github.com/${user})`,
            },

            {
              "type": "TextBlock",
              "size": "Medium",
              "weight": "Bolder",
              "text": `🔗 Xem issue [tại đây](${issueUrl})`,
            },
          ],
          "content": {
            "type": "AdaptiveCard",
            "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
            "version": "1.0",
          },
        },
      ],
    };
  }
}

export const teamsMessageCardModel = new TeamsMessageCardModel();
