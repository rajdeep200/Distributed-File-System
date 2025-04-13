import { Kafka } from "kafkajs";

const kafka = new Kafka({
  clientId: "file-storage-consumer",
  brokers: ["localhost:9092"],
});

const consumer = kafka.consumer({ groupId: "file-storage-group" });

export const runConsumer = async () => {
  console.log("Connecting to kafka consumer...");
  await consumer.connect();

  // Subscribe to event
  await consumer.subscribe({ topic: "file_uploaded", fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log(`Listening to event: ${topic}`,{
        value: message.value?.toString(),
        partition,
      });
    },
  });
};
