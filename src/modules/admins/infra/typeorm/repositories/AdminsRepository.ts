import { getRepository, Repository } from 'typeorm';

import ICreateAdminDTO from '@modules/admins/dtos/ICreateAdminDTO';
import IAdminsRepository from '@modules/admins/repositories/IAdminsRepository';
import Admin from '../entities/Admin';

class AdminsRepository implements IAdminsRepository {
  private ormRepository: Repository<Admin>;

  constructor() {
    this.ormRepository = getRepository(Admin);
  }

  public async createAdmin({
    cpf,
    password,
    name,
    email,
  }: ICreateAdminDTO): Promise<Admin> {
    const admin = this.ormRepository.create({
      cpf,
      email,
      name,
      password,
      role: 'admin',
    });

    await this.ormRepository.save(admin);

    return admin;
  }

  public async findByEmail(email: string): Promise<Admin | undefined> {
    const checkEmailIsAlreadyInUse = await this.ormRepository.findOne({
      where: {
        email,
      },
    });

    return checkEmailIsAlreadyInUse;
  }
}

export default AdminsRepository;
