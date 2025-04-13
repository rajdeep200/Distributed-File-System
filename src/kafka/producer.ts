import {Kafka} from 'kafkajs'

const kafka = new Kafka({
    clientId: 'file-storage-service',
    brokers: ["localhost:9092"]
})

const producer = kafka.producer()

export const connectProducer = async () => {
    console.log("Connecting kafka producer...");
    await producer.connect();
    console.log('✅ Kafka producer connected');
}

export const sendFileUploadEvent = async (file: any) => {
    await producer.send({
        topic: "file_uploaded",
        messages: [
            {
                value: JSON.stringify(file)
            }
        ]
    })
    console.log('📤 Event sent: file_uploaded');
}