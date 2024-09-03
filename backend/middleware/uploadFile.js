const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/images'); // Папка для хранения загруженных файлов
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname)); // Уникальное имя файла
    }
  });
  
  const fileFilter = (req, file, cb) => {
    // Проверка расширения файла
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true); // Разрешить загрузку
    } else {
      cb(new Error('Invalid file type. Only images are allowed.'), false); // Отклонить загрузку
    }
  };
  
  const upload = multer({ storage: storage, fileFilter: fileFilter});

module.exports = upload