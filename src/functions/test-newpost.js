
const slugify = require('slugify')

exports.handler = async event => {

  console.log(`Handling email content from webhook`);
  // console.log({event});

  const {
    subject,
    text,
    to,
    from,
    messageId
  } = JSON.parse(event.body)

  const now = new Date();  
  const timestamp = `${now.getFullYear()}/${now.getMonth() + 1}/${now.getDate()}`;
  console.log(`slug: ${timestamp}/${slugify(subject)}`);
  

//   console.log(to.value[0].address);
//   console.log(from.value[0].address);
//   console.log(date);
//   console.log(messageId);
//   console.log(subject);
//   console.log(text);

  return {
    statusCode: 200,
    body: `ok`,
  }
}