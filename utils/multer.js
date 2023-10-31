const multer = require('multer');
const path = require('path');

// Config Multer
module.exports = multer({
    storage: multer.diskStorage({}),
    fileFilter: (req, file, cb)=>{
        let ext = path.extname(file.originalname);
        if(ext ===! ".jpg" && ext ===! ".jpeg" && ext ===! ".png" && ext ===! ".webp"){
            cb(new error ("El tipo de archivo no es compatible"), false)
            return;
        }
        cb(null, true);
    }
})