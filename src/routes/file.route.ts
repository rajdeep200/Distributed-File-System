import {Router} from 'express'
import { getFileById, getFileDownloadUrl, uploadFile } from '../controllers/file.controller'
import { upload } from '../utils/multer'

const router = Router()

router.post('/upload', upload.single('file'), uploadFile)
router.get('/:id', getFileById)
router.get('/:id/download', getFileDownloadUrl)

export default router