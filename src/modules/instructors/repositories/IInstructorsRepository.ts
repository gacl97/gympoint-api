import ICreateInstructorDTO from '../dtos/ICreateInstructorDTO';
import Instructor from '../infra/typeorm/entities/Instructor';

export default interface IInstructorsRepository {
  createInstructor(data: ICreateInstructorDTO): Promise<Instructor>;
  findByEmail(email: string): Promise<Instructor | undefined>;
}
