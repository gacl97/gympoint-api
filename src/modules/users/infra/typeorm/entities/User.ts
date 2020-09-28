import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm';

/* eslint no-shadow: "off" */
enum UserRoleType {
  admin = 'admin',
  student = 'student',
  instructor = 'instructor',
}

@Entity('users')
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  phone_number: string;

  @Column()
  cpf: string;

  @Column({
    type: 'enum',
    enum: UserRoleType,
    default: UserRoleType.student,
  })
  role: UserRoleType;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default User;
