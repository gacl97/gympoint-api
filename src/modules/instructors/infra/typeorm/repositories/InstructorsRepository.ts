import ICreateInstructorDTO from '@modules/instructors/dtos/ICreateInstructorDTO';
import IInstructorsRepository from '@modules/instructors/repositories/IInstructorsRepository';
import { getRepository, Repository } from 'typeorm';

import Instructor from '../entities/Instructor';

class InstructorRepository implements IInstructorsRepository {
  private ormRepository: Repository<Instructor>;

  constructor() {
    this.ormRepository = getRepository(Instructor);
  }

  public async createInstructor({
    cpf,
    description,
    phone_number,
    password,
    name,
    email,
  }: ICreateInstructorDTO): Promise<Instructor> {
    const instructor = this.ormRepository.create({
      cpf,
      description,
      email,
      name,
      password,
      phone_number,
      role: 'instructor',
    });

    await this.ormRepository.save(instructor);

    return instructor;
  }

  public async findByEmail(email: string): Promise<Instructor | undefined> {
    const checkEmailIsAlreadyInUse = await this.ormRepository.findOne({
      where: {
        email,
      },
    });

    return checkEmailIsAlreadyInUse;
  }
}

export default InstructorRepository;
