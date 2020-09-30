import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateStudentService from '@modules/students/services/CreateStudentService';

class StudentController {
  public async create(request: Request, response: Response): Promise<Response> {
    const {
      name,
      email,
      cpf,
      phone_number,
      age,
      height,
      weight,
    } = request.body;

    const createStudent = container.resolve(CreateStudentService);

    const student = await createStudent.execute({
      name,
      email,
      cpf,
      phone_number,
      age,
      height,
      weight,
    });

    return response.json(classToClass(student));
  }
}

export default StudentController;
