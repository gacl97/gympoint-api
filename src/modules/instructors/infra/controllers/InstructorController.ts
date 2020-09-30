import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateInstructorService from '@modules/instructors/services/CreateInstructorService';

class InstructorController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, cpf, phone_number, description } = request.body;

    const createInstructor = container.resolve(CreateInstructorService);

    const instructor = await createInstructor.execute({
      name,
      email,
      cpf,
      phone_number,
      description,
    });

    return response.json(classToClass(instructor));
  }
}

export default InstructorController;
