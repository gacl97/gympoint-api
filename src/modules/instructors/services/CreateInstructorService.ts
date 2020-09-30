import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';

import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';
import Instructor from '../infra/typeorm/entities/Instructor';

import IInstructorsRepository from '../repositories/IInstructorsRepository';

interface IRequestDTO {
  name: string;
  email: string;
  cpf: string;
  phone_number: string;
  description: string;
}

@injectable()
class CreateInstructorService {
  constructor(
    @inject('InstructorsRepository')
    private instructorsRepository: IInstructorsRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    email,
    name,
    phone_number,
    description,
    cpf,
  }: IRequestDTO): Promise<Instructor> {
    let instructor = await this.instructorsRepository.findByEmail(email);

    if (instructor) {
      throw new AppError('Email is already being used.');
    }

    const cpfWithoutDotAndHyphen = cpf.split('.').join('').split('-').join('');

    const hashedPassword = await this.hashProvider.generateHash(
      `gym: ${cpfWithoutDotAndHyphen}`,
    );

    instructor = await this.instructorsRepository.createInstructor({
      cpf,
      phone_number,
      password: hashedPassword,
      name,
      description,
      email,
    });

    return instructor;
  }
}

export default CreateInstructorService;
