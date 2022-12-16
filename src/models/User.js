import Sequelize, { Model } from 'sequelize';
import bcryptjs from 'bcryptjs';

export default class User extends Model { // modelo do Sequelize
  static init(sequelize) {
    super.init({
      nome: {
        type: Sequelize.STRING,
        defaultValue: '', // seta um valor padrão se o nome não for inserido
        validate: { // gera um erro com os parâmetros abaixo se cumprir os requisitos
          len: {
            args: [3, 255], // len: tamanho mínimo e máximo de caracteres da propriedade
            msg: 'Campo nome deve ter entre 3 a 255 caracteres.',
          },
        },
      },
      email: {
        type: Sequelize.STRING,
        defaultValue: '',
        unique: {
          msg: 'E-mail já existe', // seta a mensagem de erro caso o e-mail já existir na base
        },
        validate: {
          isEmail: {
            msg: 'E-mail inválido',
          },
        },
      },
      password_hash: {
        type: Sequelize.STRING,
        defaultValue: '',
      },
      password: {
        type: Sequelize.VIRTUAL, // campo que existe virtualmente e não existe na base de dados
        defaultValue: '',
        validate: {
          len: {
            args: [6, 50],
            msg: 'A senha precisa ter entre 6 e 50 caracteres.',
          },
        },
      },
    }, {
      sequelize,
    });

    this.addHook('beforeSave', async (user) => { // faz com que o valor de password seja atribuído ao password_hash
      if (user.password) {
        user.password_hash = await bcryptjs.hash(user.password, 8);
      }
    });

    return this;
  }

  passwordIsValid(password) {
    return bcryptjs.compare(password, this.password_hash); // compara a password enviada na requisição com o password na base com bycryptjs
  }
}
