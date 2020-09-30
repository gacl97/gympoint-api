import { uuid } from 'uuidv4';

import ICreateInstructorDTO from '@modules/instructors/dtos/ICreateInstructorDTO';
import Instructor from '@modules/instructors/infra/typeorm/entities/Instructor';
import IInstructorsRepository from '../IInstructorsRepository';

class FakeInstructorsRepository implements IInstructorsRepository {
  private instructors: Instructor[] = [];

  public async createInstructor({
    cpf,
    description,
    phone_number,
    password,
    name,
    email,
  }: ICreateInstructorDTO): Promise<Instructor> {
    const instructor = new Instructor();

    Object.assign(instructor, {
      id: uuid(),
      cpf,
      description,
      phone_number,
      password,
      name,
      email,
    });

    this.instructors.push(instructor);

    return instructor;
  }

  public async findByEmail(email: string): Promise<Instructor | undefined> {
    const checkEmailAlreadyInUse = this.instructors.find(
      instructor => instructor.email === email,
    );

    return checkEmailAlreadyInUse;
  }
}

export default FakeInstructorsRepository;
