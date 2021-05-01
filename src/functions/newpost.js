
exports.handler = async event => {

console.log(`Handling email content from webhook`);
// console.log({event});



  
  const {
    subject,
    text,
    to,
    from,
    date,
    messageId
  } = JSON.parse(event.body)

  console.log(subject, date, to.text);
  

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