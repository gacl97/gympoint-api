import { uuid } from 'uuidv4';

import ICreateAdminDTO from '@modules/admins/dtos/ICreateAdminDTO';
import IAdminsRepository from '@modules/admins/repositories/IAdminsRepository';
import Admin from '@modules/admins/infra/typeorm/entities/Admin';

class AdminsRepositories implements IAdminsRepository {
  private admins: Admin[] = [];

  public async createAdmin({
    cpf,
    password,
    name,
    email,
  }: ICreateAdminDTO): Promise<Admin> {
    const admin = new Admin();

    Object.assign(admin, {
      id: uuid(),
      cpf,
      email,
      name,
      password,
      role: 'admin',
    });

    this.admins.push(admin);

    return admin;
  }

  public async findByEmail(email: string): Promise<Admin | undefined> {
    const checkEmailIsAlreadyInUse = this.admins.find(
      admin => admin.email === email,
    );

    return checkEmailIsAlreadyInUse;
  }
}

export default AdminsRepositories;
