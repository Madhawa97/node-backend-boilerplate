import {
  Entity,
  Column,
} from 'typeorm';
import BaseEntity from './BaseEntity.entity';

@Entity({ name: 'user' })
export class User extends BaseEntity {
  constructor(
    firstname: string,
    lastname: string,
    gender: number,
    email: string,
    password: string
  ) {
    super();
    this.firstname = firstname;
    this.lastname = lastname;
    this.gender = gender;
    this.email = email;
    this.password = password;
  }

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column({ type: 'smallint' })
  gender: number;

  @Column()
  email: string;

  @Column()
  password: string;
}
