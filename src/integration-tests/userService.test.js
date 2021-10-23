const User = require('../api/users/user');
const { expect } = require('chai');

describe('User service', () => {

    it('Inserir usuário no banco usando o service User', async () => {
        const user = new User();

        const res = await user.create('Nuno', 'nuno@gg.com', '123');

        expect(user.role).equal('user');
    });

    it('Inserir usuário admin no banco usando o service User', async () => {
        const user = new User();

        const res = await user.createAdmin('Nuno', 'nuno@gg.com', '123');

        expect(user.role).equal('admin');
    });

    it('Verificar que email já existe', async () => {
        const user = new User();

        const res = await user.createAdmin('Nuno', 'nuno@gg.com', '123');

        expect(await user.emailExists(user.email)).equal(true);
    });

});
