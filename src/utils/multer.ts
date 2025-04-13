import multer from "multer";
// import path from "path";

// // For file upload in Local
// const storage = multer.diskStorage({
//   destination: function (_req, _file, cb) {
//     cb(null, "uploads/");
//   },
//   filename: function (_req, file, cb) {
//     const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//     const ext = path.extname(file.originalname);
//     cb(null, file.fieldname + "-" + uniqueSuffix + ext);
//   },
// });

const storage = multer.memoryStorage();

export const upload = multer({storage})
