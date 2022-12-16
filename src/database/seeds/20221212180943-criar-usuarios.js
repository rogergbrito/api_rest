const bcryptjs = require('bcryptjs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) { // insere usuários na tabela desejada
    await queryInterface.bulkInsert(
      'users', // nome da tabela que vai utilizar
      [
        { // parâmetros do usuário
          nome: 'Luiz',
          email: 'luiz1@gmail.com',
          password_hash: await bcryptjs.hash('123456', 8), // insere a senha desejada e ele faz o bcrypt
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          nome: 'Luiz 2 ',
          email: 'luiz2@gmail.com',
          password_hash: await bcryptjs.hash('654321', 8),
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          nome: 'Luiz 3',
          email: 'luiz3@gmail.com',
          password_hash: await bcryptjs.hash('12448787', 8),
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}, // executando esse seeders, cria os usuários acima na base de dados -> npx sequelize db:seed:all
    );
  },
  // async down() {},
};
