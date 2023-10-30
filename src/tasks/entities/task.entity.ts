import {
  BelongsTo,
  Column,
  ForeignKey,
  HasOne,
  Model,
  Table,
} from 'sequelize-typescript';
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
  @Column
  deletedBy: string;
  @Column
  isDeleted: boolean;

  @ForeignKey(() => Login)
  loginId: Login;

  @BelongsTo(() => Login)
  login: Login;
}
