import { BelongsTo, Column, ForeignKey, HasOne, Model, Table } from 'sequelize-typescript';
import { Login } from 'src/login/entities/login..entity';
@Table
export class Task extends Model {
  @Column
  title: string;
  @Column
  description: string;
  @Column
  link: string;
  @Column
  status: string;

  @ForeignKey(() => Login)
  @Column
  loginId: number;

  @BelongsTo(() => Login)
  login: Login;
}
