export class TeamsJsonHandler {
  getNewIssueJson(
    issueTitle: string,
    fullName: string,
    user: string,
    body: string,
    issueUrl: string
  ): any {
    return {
      type: "message",
      attachments: [
        {
          contentType: "application/vnd.microsoft.card.adaptive",
          content: {
            type: "AdaptiveCard",
            body: [
              {
                type: "TextBlock",
                size: "Medium",
                weight: "Bolder",
                text: `Issue mới đã được tạo: ${issueTitle}`,
              },
              {
                type: "TextBlock",
                text: `Repository: ${fullName}`,
                wrap: true,
              },
              {
                type: "TextBlock",
                text: `Được tạo bởi: ${user}`,
                wrap: true,
              },
              {
                type: "TextBlock",
                text: `${body}`,
                wrap: true,
              },
            ],
            actions: [
              {
                type: "Action.OpenUrl",
                title: "Xem issue",
                url: `${issueUrl}`,
              },
            ],
            $schema: "http://adaptivecards.io/schemas/adaptive-card.json",
            version: "1.0",
          },
        },
      ],
    };
  }

  getNewPushJson(
    repo: string,
    commitMessage: string,
    authorName: string,
    commitUrl: string
  ): any {
    return {
      type: "message",
      attachments: [
        {
          contentType: "application/vnd.microsoft.card.adaptive",
          content: {
            type: "AdaptiveCard",
            body: [
              {
                type: "TextBlock",
                size: "Medium",
                weight: "Bolder",
                text: `New push in: ${repo}`,
              },
              {
                type: "TextBlock",
                text: `Commit message: ${commitMessage}`,
                wrap: true,
              },
              {
                type: "TextBlock",
                text: `Author: ${authorName}`,
                wrap: true,
              }
            ],
            actions: [
              {
                type: "Action.OpenUrl",
                title: "View commit",
                url: `${commitUrl}`,
              },
            ],
            $schema: "http://adaptivecards.io/schemas/adaptive-card.json",
            version: "1.0",
          },
        },
      ],
    };
  }


  getNewPRJson(
    repo: string,
    title: string,
    description: string,
    commitUrl: string
  ): any {
    return {
      type: "message",
      attachments: [
        {
          contentType: "application/vnd.microsoft.card.adaptive",
          content: {
            type: "AdaptiveCard",
            body: [
              {
                type: "TextBlock",
                size: "Medium",
                weight: "Bolder",
                text: `New push in: ${repo}`,
              },
              {
                type: "TextBlock",
                text: `Title: ${title}`,
                wrap: true,
              },
              {
                type: "TextBlock",
                text: `Description: ${description}`,
                wrap: true,
              }
            ],
            actions: [
              {
                type: "Action.OpenUrl",
                title: "View commit",
                url: `${commitUrl}`,
              },
            ],
            $schema: "http://adaptivecards.io/schemas/adaptive-card.json",
            version: "1.0",
          },
        },
      ],
    };
  }
  getUnhandledEventJson(){
    return {
      type: "message",
      attachments: [
        {
          contentType: "application/vnd.microsoft.card.adaptive",
          content: {
            type: "AdaptiveCard",
            body: [
              {
                type: "TextBlock",
                size: "Medium",
                weight: "Bolder",
                text: `An unhandled event has occurred`,
              },
            ],
            $schema: "http://adaptivecards.io/schemas/adaptive-card.json",
            version: "1.0",
          },
        },
      ],
    };
  }
}

export const teamsJsonHandler = new TeamsJsonHandler();
