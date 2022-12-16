import multer from 'multer';
import { extname, resolve } from 'path';

const aleatorio = () => Math.floor(Math.random() * 10000 + 10000);

export default {
  fileFilter: (req, file, cb) => {
    if (file.mimetype !== 'image/png' && file.mimetype !== 'image/jpeg') { // verifica se o arquivo é diferente de png ou jpeg, se sim, ele barra e retorna um erro
      return cb(new multer.MulterError('Arquivo precisa ser PNG ou JPG.'));
    }

    return cb(null, true);
  },
  storage: multer.diskStorage({ // configurando multer
    destination: (req, file, cb) => { // cb -> callback
      cb(null, resolve(__dirname, '..', '..', 'uploads', 'images')); // primeiro parâmetro é o erro tratado e o segundo é o destino do arquivo
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}_${aleatorio()}${extname(file.originalname)}`); // primeiro parâmetro é o erro que pode ocorrer e o segundo é o milisegundo que o arquivo foi enviado, um número aleatorio e a extensão do arquivo. (para não ter problemas com nomes iguais)
    },
  }),
};
