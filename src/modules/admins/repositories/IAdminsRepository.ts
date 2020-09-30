import ICreateAdminDTO from '../dtos/ICreateAdminDTO';
import Admin from '../infra/typeorm/entities/Admin';

export default interface IAdminsRepository {
  createAdmin(data: ICreateAdminDTO): Promise<Admin>;
  findByEmail(email: string): Promise<Admin | undefined>;
}
