import { S3Client } from "@aws-sdk/client-s3";

export const s3 = new S3Client({
  region: "use-ease-1",
  endpoint: "http://localhost:9000",
  credentials: {
    accessKeyId: "minioadmin",
    secretAccessKey: "minioadmin",
  },
  forcePathStyle: true,
});
