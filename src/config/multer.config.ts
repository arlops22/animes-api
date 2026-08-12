import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, path.resolve('uploads'));
    },
    filename: function (req, file, callback) {
        const time = new Date().getTime();
        callback(null, `${time}_${file.originalname}`);
    },
});

const upload = multer({ storage: storage });

export default upload;
