import {
  PrimaryGeneratedColumn,
  Entity,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity('instructors')
class Instructor {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @Column()
  phone_number: string;

  @Column()
  description: string;

  @Column()
  cpf: string;

  @Column({
    default: 'instructor',
  })
  role: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Instructor;
