const { promisify } = require("util");

const sleep = promisify(setTimeout);

module.exports.handler = async (event, context) => {
  event.Records.forEach(record => {
    const { kinesis } = record;
    console.info("Message received");
    let data = JSON.parse(Buffer.from(kinesis.data, "base64"));
    const arrivedToKinesis = kinesis.approximateArrivalTimestamp * 1000;
    console.info(
      `inLatency=${arrivedToKinesis - data.sentTime}, outLatency=${Date.now() -
        arrivedToKinesis},`
    );
  });
  await sleep(1500);
  return { code: 200 };
};
