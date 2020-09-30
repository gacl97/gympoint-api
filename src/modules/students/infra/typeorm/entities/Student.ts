import {
  PrimaryGeneratedColumn,
  Entity,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm';

import { Exclude } from 'class-transformer';

@Entity('students')
class Student {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  email: string;

  @Exclude()
  @Column()
  password: string;

  @Column({ type: 'integer' })
  age: number;

  @Column({ type: 'float' })
  height: number;

  @Column({ type: 'float' })
  weight: number;

  @Column()
  name: string;

  @Column()
  phone_number: string;

  @Column()
  cpf: string;

  @Exclude()
  @Column({
    default: 'student',
  })
  role: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Student;
