module.exports.handler = async (event, context) => {
  event.Records.forEach(record => {
    const { body, attributes } = record;
    let message = JSON.parse(body);
    console.info(
      `${attributes.SentTimestamp - message.sentTime},${Date.now() -
        attributes.SentTimestamp}`
    );
    return { code: 200 };
  });
};
