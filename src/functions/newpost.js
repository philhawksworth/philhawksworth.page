require('dotenv').config();

const slugify = require('slugify');
const { Octokit } = require("@octokit/rest");
const { Base64 } = require("js-base64")

const { 
  GH_PERSONAL_ACCESS_TOKEN,
  GH_USER,
  GH_REPO
} = process.env;


// Authenticate with GitHub via an access token - https://github.com/settings/tokens
const octokit = new Octokit({
  auth: GH_PERSONAL_ACCESS_TOKEN
});


// Get the sha of a file is it exists in the repo
async function getSHA(path) {
  try {
    const { data } = await octokit.repos.getContent({
      owner: GH_USER,
      repo: GH_REPO,
      path
    });
    console.log("RESULT: ", data.sha);
    return data.sha;
  } catch (err) {
    return undefined;
  } 
};


// Commit the new file or update it if it exists
async function commitArticle(path, title, content) {
  const sha = await getSHA(path);
  try {
    const { status } = await octokit.repos.createOrUpdateFileContents({
      owner: GH_USER,
      repo: GH_REPO,
      path,
      message: `Add post "${title}"`,
      content: Base64.encode(content),
      sha
    });
    return status;
  } catch (err) {
    console.log(`Error creating or updating: ${err}`);
    return null;
  }
};


exports.handler = async (event) => {

  console.log(`Committing to GitHub`);

  // get what we need from the webhook payload
  const {
    subject,
    text,
    to,
    from,
    messageId
  } = JSON.parse(event.body)



  const now = new Date();
  const datestamp = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
  const slug = slugify(subject);
  const path = `src/site/posts/${datestamp}-${slug}.md`;
  const content = `---
title: ${subject}
date: ${now}
---
${text}
`;

  await commitArticle(path, subject, content);

  return {
    statusCode: 200,
    body: "File added to GitHub repo",
  }

}