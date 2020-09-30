import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';
import IStudentsRepository from '../repositories/IStudentsRepository';
import Student from '../infra/typeorm/entities/Student';

interface IRequestDTO {
  name: string;
  email: string;
  cpf: string;
  phone_number: string;
  age: number;
  height: number;
  weight: number;
}

@injectable()
class CreateStudentServcice {
  constructor(
    @inject('StudentsRepository')
    private studentsRepository: IStudentsRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    age,
    phone_number,
    name,
    weight,
    height,
    email,
    cpf,
  }: IRequestDTO): Promise<Student> {
    let student = await this.studentsRepository.findByEmail(email);

    if (student) {
      throw new AppError('Email is already being used.');
    }

    const cpfWithoutDotAndHyphen = cpf.split('.').join('').split('-').join('');

    const hashedPassword = await this.hashProvider.generateHash(
      `gym: ${cpfWithoutDotAndHyphen}`,
    );

    student = await this.studentsRepository.createStudent({
      age,
      cpf,
      email,
      height,
      name,
      password: hashedPassword,
      phone_number,
      weight,
    });

    return student;
  }
}

export default CreateStudentServcice;
