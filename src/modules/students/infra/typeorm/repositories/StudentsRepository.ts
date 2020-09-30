import { Repository, getRepository } from 'typeorm';

import ICreateStudentDTO from '@modules/students/dtos/ICreateStudentDTO';
import IStudentsRepository from '@modules/students/repositories/IStudentsRepository';
import Student from '../entities/Student';

class StudentRepository implements IStudentsRepository {
  private ormRepository: Repository<Student>;

  constructor() {
    this.ormRepository = getRepository(Student);
  }

  public async createStudent({
    age,
    cpf,
    email,
    height,
    name,
    password,
    phone_number,
    weight,
  }: ICreateStudentDTO): Promise<Student> {
    const student = this.ormRepository.create({
      name,
      cpf,
      email,
      height,
      phone_number,
      password,
      weight,
      age,
      role: 'student',
    });

    await this.ormRepository.save(student);

    return student;
  }

  public async findByEmail(email: string): Promise<Student | undefined> {
    const checkEmailAlreadyInUse = await this.ormRepository.findOne({
      where: {
        email,
      },
    });

    return checkEmailAlreadyInUse;
  }
}

export default StudentRepository;
