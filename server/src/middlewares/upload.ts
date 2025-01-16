import multer from "multer";

const storage = multer.memoryStorage();

const fileFilter = (
  req: Express.Request,
  file: Express.Multer.File,
  cb: any
) => {
  if (
    (file.fieldname === "fileUrl" && file.mimetype.startsWith("audio/")) ||
    (file.fieldname === "thumbnails" && file.mimetype.startsWith("image/"))
  ) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type. Only audio and image files are allowed."));
  }
};

const upload = multer({ storage, fileFilter });

export default upload;
