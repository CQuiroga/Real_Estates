import multer from 'multer';
import path from 'path';
import { genId } from '../helpers/tokens.js';

const storage = multer.diskStorage({

    
    destination: function(req, file, cb) {
        cb(null, './public/uploads/');
    },
    filename: function(req, file, cb) {
        const date = new Date();
        const dateTimeFormatted = date.toLocaleString('es-ES', {
        timeZone: 'America/Bogota',
        day: 'numeric', month: 'numeric', year: 'numeric',
        hour: 'numeric', minute: 'numeric', second: 'numeric'
        }).replace(/[\s\/,:]/g, '_');
        
        cb(null, genId() + '_' + dateTimeFormatted + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage});

export default upload;