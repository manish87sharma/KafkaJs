const { Kafka } = require("kafkajs");

const kafka = new Kafka({
  clientId: "my-app",
  brokers: ["localhost:9092", "kafka2:9092"],
});

const producer = kafka.producer();


function getRandomNumber() {
  // returns random number between 20 and 30
  return Math.floor(Math.random() * 10 + 20);
}

const run = async () => {
  // Producing
  await producer.connect();

  setInterval(async () => {
      //producer will send message in every 1 sec
    let fiboNum= getRandomNumber();  
    await producer.send({
        topic: "test-topic",
        messages: [
          {
            value: fiboNum.toString()
          },
        ],
      });
      console.log(`sent message for ${getRandomNumber()}`);   
  }, 10000);
  
};

run();
