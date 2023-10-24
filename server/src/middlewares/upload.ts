import path from 'path';
import multer from 'multer';
import { randomUUID } from 'crypto';
import config from '@/config/config';

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, config.uploadPath);
    },
    filename(req, file, callback) {
        callback(null, randomUUID() + path.extname(file.originalname));
    },
});

export const upload = multer({ storage });
