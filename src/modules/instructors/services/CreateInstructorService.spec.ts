import AppError from '@shared/errors/AppError';

import FakeInstructorsRepository from '@modules/instructors/repositories/fakes/FakeInstructorsRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import CreateInstructorService from '@modules/instructors/services/CreateInstructorService';

let fakeInstructorsRepository: FakeInstructorsRepository;
let fakeHashProvider: FakeHashProvider;
let createInstructor: CreateInstructorService;

describe('CreateInstructor', () => {
  beforeEach(() => {
    fakeInstructorsRepository = new FakeInstructorsRepository();
    fakeHashProvider = new FakeHashProvider();

    createInstructor = new CreateInstructorService(
      fakeInstructorsRepository,
      fakeHashProvider,
    );
  });

  it('Should be able to create a new instructor.', async () => {
    const instructor = await createInstructor.execute({
      cpf: '111.111.111-11',
      description: 'Instrutor de Jiu-jitsu',
      email: 'john@gmail.com',
      name: 'John Doe',
      phone_number: '999999999',
    });

    expect(instructor).toHaveProperty('id');
  });

  it('Should not be able to create a new instructor with same email from another.', async () => {
    await createInstructor.execute({
      cpf: '111.111.111-11',
      description: 'Instrutor de Jiu-jitsu',
      email: 'john@gmail.com',
      name: 'John Doe',
      phone_number: '999999999',
    });

    await expect(
      createInstructor.execute({
        cpf: '111.111.111-11',
        description: 'Instrutor de Jiu-jitsu',
        email: 'john@gmail.com',
        name: 'John Doe',
        phone_number: '999999999',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
