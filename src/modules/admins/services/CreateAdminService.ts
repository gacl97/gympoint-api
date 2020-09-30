import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';

import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';
import IAdminsRepository from '../repositories/IAdminsRepository';
import Admin from '../infra/typeorm/entities/Admin';

interface IRequestDTO {
  name: string;
  email: string;
  cpf: string;
  password: string;
}

@injectable()
class CreateAdminService {
  constructor(
    @inject('AdminsRepository')
    private adminsRepository: IAdminsRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    email,
    password,
    name,
    cpf,
  }: IRequestDTO): Promise<Admin> {
    let admin = await this.adminsRepository.findByEmail(email);

    if (admin) {
      throw new AppError('Email is already being used.');
    }

    const hashedPassword = await this.hashProvider.generateHash(password);

    admin = await this.adminsRepository.createAdmin({
      cpf,
      password: hashedPassword,
      name,
      email,
    });

    return admin;
  }
}

export default CreateAdminService;
