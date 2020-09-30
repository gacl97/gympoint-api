import AppError from '@shared/errors/AppError';

import FakeStudentsRepository from '@modules/students/repositories/fakes/FakeStudentsRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import CreateStudentService from '@modules/students/services/CreateStudentService';

let fakeStudentsRepository: FakeStudentsRepository;
let fakeHashProvider: FakeHashProvider;
let createStudent: CreateStudentService;

describe('CreateStudent', () => {
  beforeEach(() => {
    fakeStudentsRepository = new FakeStudentsRepository();
    fakeHashProvider = new FakeHashProvider();

    createStudent = new CreateStudentService(
      fakeStudentsRepository,
      fakeHashProvider,
    );
  });

  it('Should be able to create a new student.', async () => {
    const student = await createStudent.execute({
      age: 22,
      cpf: '111.111.111-11',
      email: 'john@gmail.com',
      height: 1.78,
      weight: 80,
      name: 'John doe',
      phone_number: '999999999',
    });

    expect(student).toHaveProperty('id');
  });

  it('Should not be able to create a new student with same email from another.', async () => {
    await createStudent.execute({
      age: 22,
      cpf: '111.111.111-11',
      email: 'john@gmail.com',
      height: 1.78,
      weight: 80,
      name: 'John doe',
      phone_number: '999999999',
    });

    await expect(
      createStudent.execute({
        age: 22,
        cpf: '111.111.111-11',
        email: 'john@gmail.com',
        height: 1.78,
        weight: 80,
        name: 'John doe',
        phone_number: '999999999',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
