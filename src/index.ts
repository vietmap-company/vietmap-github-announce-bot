import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import axios from 'axios';
import {TELEGRAM_TOKEN, CHAT_ID, TEAMS_WEBHOOK_URL} from './env';
import { teamsJsonHandler } from './teams_json_handler';

const app = express();
app.use(bodyParser.json());

app.post('/github-webhook', async (req: Request, res: Response) => {
  console.log('New request called from github');
  const event = req.headers['x-github-event'];
  const payload = req.body;
  if(event === 'issues' && payload.action === 'closed'){
    const issue = payload.issue;
    const repo = payload.repository.full_name;
    const message = `🔒 *Issue Closed in ${repo}*\n\n*Title:* ${issue.title}\n*Description:* ${issue.body || 'No description provided'}\n🔗 [View Issue](${issue.html_url})  `;
    /** */
    // post to teams
    let teamsMessage = teamsJsonHandler.getNewIssueJson(issue.title, repo, issue.user.login, issue.body || 'No description provided', issue.html_url);
    try{
      await axios.post(TEAMS_WEBHOOK_URL, teamsMessage);
      console.log(`✅ Sent to Teams: ${issue.title}`);
    }catch (error: any) {
      console.error('❌ Error sending message to Teams:', error.message);
    }
    try {
      await axios.post(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
        chat_id: CHAT_ID,
        text: message,
        parse_mode: 'Markdown'
      });

      console.log(`✅ Sent to Telegram: ${issue.title}`);
    } catch (error: any) {
      console.error('❌ Error sending message:', error.message);
    }
  }else if (event === 'issues' && payload.action === 'opened') {
    
    const issue = payload.issue;
    const repo = payload.repository.full_name;
    const description = issue.body || 'No description provided';
    const labels = issue.labels.map((label: { name: string }) => label.name).join(', ') || 'No labels';
    const message = `📝 *New Issue in ${repo}*\n\n*Title:* ${issue.title}\n*Description:* ${description} \n *Labels:* ${labels}\n🔗 [View Issue](${issue.html_url})  `;
    let teamsMessage = teamsJsonHandler.getNewIssueJson(issue.title, repo, issue.user.login, issue.body || 'No description provided', issue.html_url);
    try{
      await axios.post(TEAMS_WEBHOOK_URL, teamsMessage);
      console.log(`✅ Sent to Teams: ${issue.title}`);
    }catch (error: any) {
      console.error('❌ Error sending message to Teams:', error.message);
    }
    try {
      await axios.post(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
        chat_id: CHAT_ID,
        text: message,
        parse_mode: 'Markdown'
      });

      console.log(`✅ Sent to Telegram: ${issue.title}`);
    } catch (error: any) {
      console.error('❌ Error sending message:', error.message);
    }
  }
  else if (event === 'issue_comment' && payload.action === 'created') {
    const comment = payload.comment;
    const issue = payload.issue;
    const repo = payload.repository.full_name;
    const message = `💬 *New Comment on Issue in ${repo}*\n\n*Comment:* ${comment.body}\n🔗 [View Issue](${issue.html_url})  `;
    let teamsMessage = teamsJsonHandler.getNewIssueJson(issue.title, repo, issue.user.login, issue.body || 'No description provided', issue.html_url);
    try{
      await axios.post(TEAMS_WEBHOOK_URL, teamsMessage);
      console.log(`✅ Sent to Teams: ${issue.title}`);
    }catch (error: any) {
      console.error('❌ Error sending message to Teams:', error.message);
    }
    try {
      await axios.post(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
        chat_id: CHAT_ID,
        text: message,
        parse_mode: 'Markdown'
      });

      console.log(`✅ Sent to Telegram: ${comment.body}`);
    } catch (error: any) {
      console.error('❌ Error sending message:', error.message);
    }
  }
  // Handled push event
  else if (event === 'push') {
    
    const commit = payload.head_commit;
    const repo = payload.repository.full_name;
    const message = `🔄 *New Push in ${repo}*\n\n*Commit Message:* ${commit.message}\n*Author:* ${commit.author.name}\n🔗 [View Commit](${commit.url})  `;
    let teamsMessage = teamsJsonHandler.getNewPushJson(repo, commit.message, commit.author.name, commit.url );
    try{
      await axios.post(TEAMS_WEBHOOK_URL, teamsMessage);
      console.log(`✅ Sent to Teams: ${commit.message}`);
    }catch (error: any) {
      console.error('❌ Error sending message to Teams:', error.message);
    }
    try {
      await axios.post(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
        chat_id: CHAT_ID,
        text: message,
        parse_mode: 'Markdown'
      });

      console.log(`✅ Sent to Telegram: ${commit.message}`);
    } catch (error: any) {
      console.error('❌ Error sending message:', error.message);
    }
  }
  else if (event === 'pull_request' && payload.action === 'opened') {
    const pullRequest = payload.pull_request;
    const repo = payload.repository.full_name;
    const message = `🔄 *New Pull Request in ${repo}*\n\n*Title:* ${pullRequest.title}\n*Description:* ${pullRequest.body || 'No description provided'}\n🔗 [View Pull Request](${pullRequest.html_url})  `;
    let teamsMessage = teamsJsonHandler.getNewPRJson(repo, pullRequest.title, ` ${pullRequest.body || 'No description provided'}`, pullRequest.html_url );
    try{
      await axios.post(TEAMS_WEBHOOK_URL, teamsMessage);
      console.log(`✅ Sent to Teams: ${pullRequest.title}`);
    }catch (error: any) {
      console.error('❌ Error sending message to Teams:', error.message);
    }
    try {
      await axios.post(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
        chat_id: CHAT_ID,
        text: message,
        parse_mode: 'Markdown'
      });

      console.log(`✅ Sent to Telegram: ${pullRequest.title}`);
    } catch (error: any) {
      console.error('❌ Error sending message:', error.message);
    }
  }
  else if (event === 'pull_request_review_comment' && payload.action === 'created') {
    const comment = payload.comment;
    const pullRequest = payload.pull_request;
    const repo = payload.repository.full_name;
    const message = `💬 *New Comment on Pull Request in ${repo}*\n\n*Comment:* ${comment.body}\n🔗 [View Pull Request](${pullRequest.html_url})  `;
    try {
      await axios.post(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
        chat_id: CHAT_ID,
        text: message,
        parse_mode: 'Markdown'
      });

      console.log(`✅ Sent to Telegram: ${comment.body}`);
    } catch (error: any) {
      console.error('❌ Error sending message:', error.message);
    }
  }
  else if (event === 'release' && payload.action === 'published') {
    const release = payload.release;
    const repo = payload.repository.full_name;
    const message = `🚀 *New Release in ${repo}*\n\n*Tag Name:* ${release.tag_name}\n*Description:* ${release.body || 'No description provided'}\n🔗 [View Release](${release.html_url})  `;
    try {
      await axios.post(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
        chat_id: CHAT_ID,
        text: message,
        parse_mode: 'Markdown'
      });

      console.log(`✅ Sent to Telegram: ${release.tag_name}`);
    } catch (error: any) {
      console.error('❌ Error sending message:', error.message);
    }
  }
  else if (event === 'workflow_run' && payload.action === 'completed') {
    const workflow = payload.workflow_run;
    const repo = payload.repository.full_name;
    const message = `✅ *Workflow Run Completed in ${repo}*\n\n*Workflow Name:* ${workflow.name}\n*Conclusion:* ${workflow.conclusion}\n🔗 [View Workflow](${workflow.html_url})  `;
    try {
      await axios.post(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
        chat_id: CHAT_ID,
        text: message,
        parse_mode: 'Markdown'
      });

      console.log(`✅ Sent to Telegram: ${workflow.name}`);
    } catch (error: any) {
      console.error('❌ Error sending message:', error.message);
    }
  }
  // Handled repository events
  else if (event === 'repository' && payload.action === 'created') {
    const repo = payload.repository;
    const message = `📦 *New Repository Created*\n\n*Repository Name:* ${repo.name}\n*Description:* ${repo.description || 'No description provided'}\n🔗 [View Repository](${repo.html_url})  `;
    try {
      await axios.post(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
        chat_id: CHAT_ID,
        text: message,
        parse_mode: 'Markdown'
      });

      console.log(`✅ Sent to Telegram: ${repo.name}`);
    } catch (error: any) {
      console.error('❌ Error sending message:', error.message);
    }
  }
  else if (event === 'repository' && payload.action === 'deleted') {
    const repo = payload.repository;
    const message = `❌ *Repository Deleted*\n\n*Repository Name:* ${repo.name}\n🔗 [View Repository](${repo.html_url})  `;
    try {
      await axios.post(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
        chat_id: CHAT_ID,
        text: message,
        parse_mode: 'Markdown'
      });

      console.log(`✅ Sent to Telegram: ${repo.name}`);
    } catch (error: any) {
      console.error('❌ Error sending message:', error.message);
    }
  }
  else if (event === 'repository' && payload.action === 'edited') {
    const repo = payload.repository;
    const message = `✏️ *Repository Edited*\n\n*Repository Name:* ${repo.name}\n*Description:* ${repo.description || 'No description provided'}\n🔗 [View Repository](${repo.html_url})  `;
    try {
      await axios.post(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
        chat_id: CHAT_ID,
        text: message,
        parse_mode: 'Markdown'
      });

      console.log(`✅ Sent to Telegram: ${repo.name}`);
    } catch (error: any) {
      console.error('❌ Error sending message:', error.message);
    }
  }
  else if (event === 'repository' && payload.action === 'synchronize') {
    const repo = payload.repository;
    const message = `🔄 *Repository Synchronized*\n\n*Repository Name:* ${repo.name}\n*Description:* ${repo.description || 'No description provided'}\n🔗 [View Repository](${repo.html_url})  `;
    try {
      await axios.post(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
        chat_id: CHAT_ID,
        text: message,
        parse_mode: 'Markdown'
      });

      console.log(`✅ Sent to Telegram: ${repo.name}`);
    } catch (error: any) {
      console.error('❌ Error sending message:', error.message);
    }
  }
  else if (event === 'repository' && payload.action === 'transfer') {
    const repo = payload.repository;
    const message =
      `🔄 *Repository Transferred*\n\n*Repository Name:* ${repo.name}\n*New Owner:* ${payload.changes.owner.from}\n🔗 [View Repository](${repo.html_url})  `;
    try {
      await axios.post(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
        chat_id: CHAT_ID,
        text: message,
        parse_mode: 'Markdown'
      });

      console.log(`✅ Sent to Telegram: ${repo.name}`);
    }
    catch (error: any) {
      console.error('❌ Error sending message:', error.message);
    }
  }
  else if (event === 'repository' && payload.action === 'publicized') {
    const repo = payload.repository;
    const message = `🔓 *Repository Publicized*\n\n*Repository Name:* ${repo.name}\n*Description:* ${repo.description || 'No description provided'}\n🔗 [View Repository](${repo.html_url})  `;
    try {
      await axios.post(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
        chat_id: CHAT_ID,
        text: message,
        parse_mode: 'Markdown'
      });

      console.log(`✅ Sent to Telegram: ${repo.name}`);
    } catch (error: any) {
      console.error('❌ Error sending message:', error.message);
    }
  }

  else{
    let teamsMessage = teamsJsonHandler.getUnhandledEventJson();
    try{
      await axios.post(TEAMS_WEBHOOK_URL, teamsMessage);
      console.log(`✅ Sent to Teams: Sent unhandled event`);
    }catch (error: any) {
      console.error('❌ Error sending message to Teams:', error.message);
    }
    await axios.post(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
      chat_id: CHAT_ID,
      text: "Has new unhandled event from github \n\n" + JSON.stringify(req.body),
      parse_mode: 'Markdown'
    });

  }

  res.sendStatus(200);
});

app.get('/', (req: Request, res: Response) => {
  res.send('Server is running (TS version)! 🚀');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});

