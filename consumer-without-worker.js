const { Kafka } = require("kafkajs");
const {Worker} = require("worker_threads");
const getFib =require('./fibo');

const worker = new Worker("./worker.js");
const kafka = new Kafka({
  clientId: "my-app",
  brokers: ["localhost:9092", "localhost:9092"],
});


const consumer = kafka.consumer({
  groupId: "test-group-without-worker",
  minBytes: 5,
  maxBytes: 1e6,
});

//Listen for a message from worker
// worker.on("message", result => {
//     console.log(`${result.num}th Fibonacci Number: ${result.fib}`);
//   });
  
//   worker.on("error", error => {
//     console.log(error);
//   });

const run = async () => {

  // Consuming
  await consumer.connect();
  await consumer.subscribe({ topic: "test-topic", fromBeginning: true });
//   let counter = 0;
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
        let start = new Date().getTime();
        const val = getFib(message.value.toString());
        console.log(`fibo value ${val}`);
        console.log(`fibo value ${message.value.toString()}`);
        // worker.postMessage({num: 40});
      //   console.log({
      //   partition,
      //   offset: message.offset,
      //   value: message.value.toString(),
      // });
      var end = new Date().getTime();
      var time = end - start;
      console.log('Execution time: ' + time);
    },
  });
};

run().catch(console.error);
