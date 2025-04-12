import { Request, Response } from "express";
import File from '../models/File.model'
import path from "path";

export const uploadFile = async(req: Request, res: Response) => {
    try {
        const file = req.file
        console.log('file :: ', file)
        if(!file){
            res.status(400).json({ message: "No file uploaded" })
            return
        }

        const savedFile = File.create({
            originalName: file.originalname,
            storageName: file.filename,
            mimeType: file.mimetype,
            size: file.size
        })

        res.status(201).json(savedFile)
    } catch (error) {
        res.status(500).json({ error: "File upload failed", details: error });
    }
}

export const getFileById = async(req: Request, res: Response) => {
    try {
        const file = await File.findById(req.params.id);
        if(!file){
            res.status(404).json({ message: "File not found" });
            return
        }
        const filePath = path.join(__dirname, '../../uploads', file.storageName)
        res.download(filePath, file.originalName)
    } catch (error) {
        res.status(500).json({ error: "File download failed", details: error });
    }
}