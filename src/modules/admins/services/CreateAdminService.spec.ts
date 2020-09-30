import AppError from '@shared/errors/AppError';

import FakeAdminsRepository from '@modules/admins/repositories/fakes/FakeAdminsRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import CreateAdminService from '@modules/admins/services/CreateAdminService';

let fakeAdminsRepository: FakeAdminsRepository;
let fakeHashProvider: FakeHashProvider;
let createAdmin: CreateAdminService;

describe('CreateAdmin', () => {
  beforeEach(() => {
    fakeAdminsRepository = new FakeAdminsRepository();
    fakeHashProvider = new FakeHashProvider();

    createAdmin = new CreateAdminService(
      fakeAdminsRepository,
      fakeHashProvider,
    );
  });

  it('Should be able to create a new admin.', async () => {
    const instructor = await createAdmin.execute({
      cpf: '111.111.111-11',
      email: 'john@gmail.com',
      name: 'John Doe',
      password: '123456',
    });

    expect(instructor).toHaveProperty('id');
  });

  it('Should not be able to create a new admin with same email from another.', async () => {
    await createAdmin.execute({
      cpf: '111.111.111-11',
      email: 'john@gmail.com',
      name: 'John Doe',
      password: '123456',
    });

    await expect(
      createAdmin.execute({
        cpf: '111.111.111-11',
        email: 'john@gmail.com',
        name: 'John Doe',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
