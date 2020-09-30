import ICreateStudentDTO from '../dtos/ICreateStudentDTO';
import Student from '../infra/typeorm/entities/Student';

export default interface IStudentsRepository {
  createStudent(data: ICreateStudentDTO): Promise<Student>;
  findByEmail(email: string): Promise<Student | undefined>;
}
