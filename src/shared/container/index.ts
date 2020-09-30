import { container } from 'tsyringe';

import '@modules/users/providers';

import StudentsRepository from '@modules/students/infra/typeorm/repositories/StudentsRepository';
import IStudentsRepository from '@modules/students/repositories/IStudentsRepository';

import InstructorsRepository from '@modules/instructors/infra/typeorm/repositories/InstructorsRepository';
import IInstructorsRepository from '@modules/instructors/repositories/IInstructorsRepository';

import AdminsRepository from '@modules/admins/infra/typeorm/repositories/AdminsRepository';
import IAdminsRepository from '@modules/admins/repositories/IAdminsRepository';

container.registerSingleton<IStudentsRepository>(
  'StudentsRepository',
  StudentsRepository,
);

container.registerSingleton<IInstructorsRepository>(
  'InstructorsRepository',
  InstructorsRepository,
);

container.registerSingleton<IAdminsRepository>(
  'AdminsRepository',
  AdminsRepository,
);
