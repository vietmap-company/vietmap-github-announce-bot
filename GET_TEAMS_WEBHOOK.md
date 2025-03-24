### Send message to Teams channel using Webhook URL:
 ## Flow
 - Create **Teams Workflow** and add to **Teams channel**.
 - Get **Webhook URL**.
 - Send notify using **GitHub Webhook** or **GitHub Actions**

 #### This Project using `AdaptiveCard` card of Teams to send message to channel.
 ---
 
 ## Create Teams Workflow and get Webhook URL
 ### Step 1: Create Teams Workflow
 - Go to your channel.
 - Click on `...` and select `Workflows`.
![Image](./images/init_workflow.png)
 - Scroll down and select `Post to a channel when a webhook request is received`.
![Image](./images/team_workflow.png)
 - Give your webhook a name.
 ![Image](./images/create_workflow.png)
 - Click `Next` and wait for the Team and Channel loaded
 - Select the channel you want to send the message to.
![Image](./images/add_workflow_to_channel.png)
 - Click `Add workflow` to add the workflow to the channel.
 ![Image](./images/complete_flow.png)
 - The workflow will be added to the channel and return the webhook URL. Copy the URL and save it as `TEAMS_WEBHOOK_URL` in `env` file of this project.