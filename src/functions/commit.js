require('dotenv').config()

const { Octokit } = require("@octokit/rest");
const { 
  GH_PERSONAL_ACCESS_TOKEN 
} = process.env;

exports.handler = async event => {

  console.log(`Preparing to commit to GitHub ${GH_PERSONAL_ACCESS_TOKEN}`);

  // Authenticate with GitHub via an access token - https://github.com/settings/tokens
  const octokit = new Octokit({
    auth: GH_PERSONAL_ACCESS_TOKEN
  });

  // sends request with `Authorization: token mypersonalaccesstoken123` header
  const { data } = await octokit.request("/user");
  console.log({data});
  



}