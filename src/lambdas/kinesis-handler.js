const { promisify } = require("util");

const sleep = promisify(setTimeout);

module.exports.handler = async (event, context) => {
  event.Records.forEach(record => {
    const { kinesis } = record;
    let message = JSON.parse(kinesis);
    console.info("Message received");
    console.info(message);
    let data = Buffer.from(message.data, "base64"); // Ta-da
    console.info(`latency=${Date.now() - data.sentTime},`);
  });
  await sleep(1500);
  return { code: 200 };
};
