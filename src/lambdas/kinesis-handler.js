const { promisify } = require("util");

const sleep = promisify(setTimeout);

module.exports.handler = async (event, context) => {
  event.Records.forEach(record => {
    const { kinesis } = record;
    let message = JSON.parse(kinesis);
    console.info("Message received");
    let data = Buffer.from(message.data, "base64");
    const arrivedToKinesis = message.approximateArrivalTimestamp * 1000;
    console.info(
      `inLatency=${arrivedToKinesis - data.sentTime}, outLatency=${Date.now() -
        arrivedToKinesis},`
    );
  });
  await sleep(1500);
  return { code: 200 };
};
