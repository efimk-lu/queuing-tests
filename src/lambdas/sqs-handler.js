const { promisify } = require("util");

const sleep = promisify(setTimeout);

module.exports.handler = async (event, context) => {
  event.Records.forEach(record => {
    const { body, attributes } = record;
    let message = JSON.parse(body);
    console.info(
      `${attributes.SentTimestamp - message.sentTime},${Date.now() -
        attributes.SentTimestamp}`
    );
  });
  await sleep(100);
  return { code: 200 };
};
