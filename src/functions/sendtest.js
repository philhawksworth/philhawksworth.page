
const request = require('request');

exports.handler = async event => {
  
  const payload = {
    "attachments": [],
    "headers": {},
    "text": "This is the body of the email and will be the content of the post\n",
    "textAsHtml": "<p>Test</p>",
    "subject": `testing ${new Date()} `,
    "date": "2000-11-09T18:44:00.000Z",
    "to": {
      "value": [
        {
          "address": "blogpost@secret.fyi",
          "name": ""
        }
      ],
      "html": "<span class=\"mp_address_group\"><a href=\"mailto:blogpost@secret.fyi\" class=\"mp_address_email\">blogpost@secret.fyi</a></span>",
      "text": "blogpost@secret.fyi"
    },
    "from": {
      "value": [
        {
          "address": "phil@netlify.com",
          "name": "Test"
        }
      ],
      "html": "<span class=\"mp_address_group\"><span class=\"mp_address_name\">Test</span> &lt;<a href=\"mailto:phil@netlify.com\" class=\"mp_address_email\">phil@netlify.com</a>&gt;</span>",
      "text": "Test <test@examplecom>"
    },
    "messageId": "<123.abc@test>",
    "html": false,
    "raw": "DKIM-Signature: v=1; a=rsa-sha256; c=relaxed/relaxed; d=forwardemail.net;\r\n q=dns/txt; s=default; bh=fdkeB/A0FkbVP2k4J4pNPoeWH6vqBm9+b0C3OY87Cw8=;\r\n h=from:subject:date:message-id:to:mime-version:content-type:content-transfer-encoding;\r\n b=KJZp0q0u/cQhcjwilKMainmlystwHgCZ7/ncK1uBmmdGoaXlQcMHsfenLyn/uribhMVrdfWw6\r\n YhQ5AIOAGoft/fwpGhl3zP1b5qrPwYu0kLMPr2MSwkLo0YVdbHB6xF+VGeg2vaduJk6CipXjMW7\r\n Mlohmvjw0m1tnN6dAYGOkwQ=\r\nMessage-ID: <123.abc@test>\r\nDate: Thu, 9 Nov 2000 10:44:00 -0800 (PST)\r\nTo: blogpost@secret.fyi\r\nFrom: Test <phil@netlify.com>\r\nSubject: testing webhooks\r\nMime-Version: 1.0\r\nContent-Type: text/plain; charset=us-ascii\r\nContent-Transfer-Encoding: 7bit\r\n\r\nTest\r\n"
  };
  
  const rootURL = process.env.URL ? process.env.URL : "https://localhost:8888";

  console.log(`test will post to: ${rootURL}/api/newpost`);


 
  request.post({
    headers: {
      'content-type' : 'application/x-www-form-urlencoded'
    },
    url: `${rootURL}/api/newpost`,
    body: JSON.stringify(payload)
  }, function(error, response, body){
    console.log(body);
  });

  return {
    statusCode: 200,
    body: `test sent`,
  }
}