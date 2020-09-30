import { uuid } from 'uuidv4';

import ICreateStudentDTO from '@modules/students/dtos/ICreateStudentDTO';
import Student from '@modules/students/infra/typeorm/entities/Student';
import IStudentsRepository from '../IStudentsRepository';

class FakeStudentsRepository implements IStudentsRepository {
  private students: Student[] = [];

  public async createStudent({
    age,
    cpf,
    height,
    weight,
    name,
    phone_number,
    password,
    email,
  }: ICreateStudentDTO): Promise<Student> {
    const student = new Student();

    Object.assign(student, {
      id: uuid(),
      age,
      cpf,
      height,
      weight,
      name,
      phone_number,
      password,
      email,
    });

    this.students.push(student);

    return student;
  }

  public async findByEmail(email: string): Promise<Student | undefined> {
    const checkEmailAlreadyInUse = this.students.find(
      student => student.email === email,
    );

    return checkEmailAlreadyInUse;
  }
}

export default FakeStudentsRepository;
