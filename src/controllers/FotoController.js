import multer from 'multer';
import multerConfig from '../config/multerConfig';

import Foto from '../models/Foto';

const upload = multer(multerConfig).single('foto'); // dentro do "single" é a chave do arquivo que precisa ser enviado no multipart form

class FotoController {
  store(req, res) { // podemos usar o req.file para pegar as informações do arquivo
    return upload(req, res, async (err) => { // padrão do multer
      if (err) {
        return res.status(400).json({
          errors: [err.code],
        });
      }

      try {
        const { originalname, filename } = req.file; // pega os dados do req.file
        const { aluno_id } = req.body; // pega o aluno_id do req.body
        const foto = await Foto.create({ originalname, filename, aluno_id });

        return res.json(foto);
      } catch (e) {
        return res.status(400).json({
          errors: ['Aluno não existe.'],
        });
      }
    });
  }
}

export default new FotoController(); // já exporta instanciado
