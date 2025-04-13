import { Request, Response } from "express";
import File from "../models/File.model";
import path from "path";
import mime from "mime-types";
import { GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { s3 } from "../config/s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { sendFileUploadEvent } from "../kafka/producer";

export const uploadFile = async (req: Request, res: Response) => {
  try {
    const file = req.file;
    console.log("file :: ", file);
    if (!file) {
      res.status(400).json({ message: "No file uploaded" });
      return;
    }

    const fileExt = mime.extension(file.mimetype);
    const key = `${crypto.randomUUID()}.${fileExt}`;

    const uploadParams = {
      Bucket: "file-storage",
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype,
    };

    await s3.send(new PutObjectCommand(uploadParams));
    console.info("File uploaded to S3")

    const savedFile = File.create({
      originalName: file.originalname,
      storageName: key,
      mimeType: file.mimetype,
      size: file.size,
      key: key,
    });
    console.info("File saved to DB")

    await sendFileUploadEvent({
      fileName: file.originalname,
      size: file.size,
      mimeType: file.mimetype,
      key: key,
      uploadedAt: new Date().toISOString()
    })
    console.info("File uploaded event sent to Kafka")

    res.status(201).json(savedFile);
  } catch (error) {
    res.status(500).json({ error: "File upload failed", details: error });
  }
};

export const getFileById = async (req: Request, res: Response) => {
  try {
    const file = await File.findById(req.params.id);
    if (!file) {
      res.status(404).json({ message: "File not found" });
      return;
    }
    const filePath = path.join(__dirname, "../../uploads", file.storageName);
    res.download(filePath, file.originalName);
  } catch (error) {
    res.status(500).json({ error: "File download failed", details: error });
  }
};

export const getFileDownloadUrl = async (req: Request, res: Response) => {
  try {
    const file = await File.findById(req.params.id);
    if (!file) {
      res.status(404).json({ message: "File not found" });
      return;
    }

    const command = new GetObjectCommand({
      Bucket: "file-storage",
      Key: file.key,
    });

    const signedUrl = await getSignedUrl(s3, command, { expiresIn: 60 });

    res.status(200).json({ url: signedUrl });
  } catch (error) {
    res.status(500).json({ error: "File download failed", details: error });
  }
};
