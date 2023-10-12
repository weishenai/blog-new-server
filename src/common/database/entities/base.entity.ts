import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export abstract class Base {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @CreateDateColumn({
    name: 'createdAt',
    nullable: true,
  })
  createdAt: string;

  @UpdateDateColumn({
    name: 'updatedAt',
    nullable: true,
  })
  updatedAt: string;
}
