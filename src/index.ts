import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import { teamsMessageCardModel } from "./models/teams_message_card_model";
import { telegramApi } from "./api/telegram_api";
import { teamsApi } from "./api/teams_api";

const app = express();
app.use(bodyParser.json());
require('dotenv').config();

app.post("/github-webhook", async (req: Request, res: Response) => {
  console.log("New request called from github");
  const event = req.headers["x-github-event"];
  const payload = req.body;
  if (event === "issues" && payload.action === "closed") {
    const issue = payload.issue;
    const repo = payload.repository.full_name;
    const message = `🔒 *Issue Closed in ${repo}*\n\n*Title:* ${
      issue.title
    }\n*Description:* ${
      issue.body || "No description provided"
    }\n🔗 [View Issue](${issue.html_url})  `;
    /** */

    telegramApi.sendMessage(message);
  } else if (event === "issues" && payload.action === "opened") {
    const issue = payload.issue;
    const repo = payload.repository.full_name;
    const description = issue.body || "No description provided";
    const labels =
      issue.labels.map((label: { name: string }) => label.name).join(", ") ||
      "No labels";
    const message = `📝 *New Issue in ${repo}*\n\n*Title:* ${issue.title}\n*Description:* ${description} \n *Labels:* ${labels}\n🔗 [View Issue](${issue.html_url})  `;
    let teamsMessage = teamsMessageCardModel.getNewIssueJson(
      issue.title,
      repo,
      issue.user.login,
      issue.body || "No description provided",
      issue.html_url
    );

    teamsApi.sendMessage(teamsMessage);
    telegramApi.sendMessage(message);
  } else if (event === "issue_comment" && payload.action === "created") {
    const comment = payload.comment;
    const issue = payload.issue;
    const repo = payload.repository.full_name;
    const message = `💬 *New Comment on Issue in ${repo}*\n\n*Comment:* ${comment.body}\n🔗 [View Issue](${issue.html_url})  `;
    let teamsMessage = teamsMessageCardModel.getNewIssueJson(
      issue.title,
      repo,
      issue.user.login,
      issue.body || "No description provided",
      issue.html_url
    );
    teamsApi.sendMessage(teamsMessage);
    telegramApi.sendMessage(message);
  }
  else if (event === "push") {
    const commit = payload.head_commit;
    const repo = payload.repository.full_name;
    const message = `🔄 *New Push in ${repo}*\n\n*Commit Message:* ${commit.message}\n*Author:* ${commit.author.name}\n🔗 [View Commit](${commit.url})  `;
    telegramApi.sendMessage(message);
  } else if (event === "pull_request" && payload.action === "opened") {
    const pullRequest = payload.pull_request;
    const repo = payload.repository.full_name;
    const message = `🔄 *New Pull Request in ${repo}*\n\n*Title:* ${
      pullRequest.title
    }\n*Description:* ${
      pullRequest.body || "No description provided"
    }\n🔗 [View Pull Request](${pullRequest.html_url})  `;
    telegramApi.sendMessage(message);
  } else if (
    event === "pull_request_review_comment" &&
    payload.action === "created"
  ) {
    const comment = payload.comment;
    const pullRequest = payload.pull_request;
    const repo = payload.repository.full_name;
    const message = `💬 *New Comment on Pull Request in ${repo}*\n\n*Comment:* ${comment.body}\n🔗 [View Pull Request](${pullRequest.html_url})  `;
    telegramApi.sendMessage(message);
  } else if (event === "release" && payload.action === "published") {
    const release = payload.release;
    const repo = payload.repository.full_name;
    const message = `🚀 *New Release in ${repo}*\n\n*Tag Name:* ${
      release.tag_name
    }\n*Description:* ${
      release.body || "No description provided"
    }\n🔗 [View Release](${release.html_url})  `;
    telegramApi.sendMessage(message);
  } else if (event === "workflow_run" && payload.action === "completed") {
    const workflow = payload.workflow_run;
    const repo = payload.repository.full_name;
    const message = `✅ *Workflow Run Completed in ${repo}*\n\n*Workflow Name:* ${workflow.name}\n*Conclusion:* ${workflow.conclusion}\n🔗 [View Workflow](${workflow.html_url})  `;
    telegramApi.sendMessage(message);
  }
  else if (event === "repository" && payload.action === "created") {
    const repo = payload.repository;
    const message = `📦 *New Repository Created*\n\n*Repository Name:* ${
      repo.name
    }\n*Description:* ${
      repo.description || "No description provided"
    }\n🔗 [View Repository](${repo.html_url})  `;
    telegramApi.sendMessage(message);
  } else if (event === "repository" && payload.action === "deleted") {
    const repo = payload.repository;
    const message = `❌ *Repository Deleted*\n\n*Repository Name:* ${repo.name}\n🔗 [View Repository](${repo.html_url})  `;
    telegramApi.sendMessage(message);
  } else if (event === "repository" && payload.action === "edited") {
    const repo = payload.repository;
    const message = `✏️ *Repository Edited*\n\n*Repository Name:* ${
      repo.name
    }\n*Description:* ${
      repo.description || "No description provided"
    }\n🔗 [View Repository](${repo.html_url})  `;
    telegramApi.sendMessage(message);
  } else if (event === "repository" && payload.action === "synchronize") {
    const repo = payload.repository;
    const message = `🔄 *Repository Synchronized*\n\n*Repository Name:* ${
      repo.name
    }\n*Description:* ${
      repo.description || "No description provided"
    }\n🔗 [View Repository](${repo.html_url})  `;
    telegramApi.sendMessage(message);
  } else if (event === "repository" && payload.action === "transfer") {
    const repo = payload.repository;
    const message = `🔄 *Repository Transferred*\n\n*Repository Name:* ${repo.name}\n*New Owner:* ${payload.changes.owner.from}\n🔗 [View Repository](${repo.html_url})  `;
    telegramApi.sendMessage(message);
  } else if (event === "repository" && payload.action === "publicized") {
    const repo = payload.repository;
    const message = `🔓 *Repository Publicized*\n\n*Repository Name:* ${
      repo.name
    }\n*Description:* ${
      repo.description || "No description provided"
    }\n🔗 [View Repository](${repo.html_url})  `;
    telegramApi.sendMessage(message);
  } else {
    let message =
      "Has new unhandled event from github \n\n" + JSON.stringify(req.body);
    telegramApi.sendMessage(message);
  }

  res.sendStatus(200);
});

app.get("/", (req: Request, res: Response) => {
  res.send("Server is running (TS version)! 🚀");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
