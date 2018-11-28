const { promisify } = require("util");

const sleep = promisify(setTimeout);

module.exports.handler = async (event, context) => {
  event.Records.forEach(record => {
    const { body, attributes } = record;
    let message = JSON.parse(body);
    console.info(
      `inLatency=${attributes.SentTimestamp - message.sentTime}, outLatency=${Date.now() -
        attributes.SentTimestamp}`
    );
  });
  await sleep(1500);
  return { code: 200 };
};
