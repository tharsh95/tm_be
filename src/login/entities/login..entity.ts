import { BelongsTo, Column, HasMany, Model, Table } from 'sequelize-typescript';
import { Task } from 'src/tasks/entities/task.entity';
@Table
export class Login extends Model {
  @Column
  name: string;
  @Column
  email: string;
  @Column
  password: string;
  @Column
  role: string;

  @HasMany(() => Task)
  tasks: Task[];

}