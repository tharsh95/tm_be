import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Login } from 'src/login/entities/login..entity';
import { Task } from './entities/task.entity';

@Injectable()
export class TasksService {
  constructor(@InjectModel(Task) private taskModel: typeof Task) {}
  async create(body: any) {
    const { title, description, status, assignee, link } = body;
    await this.taskModel.create({
      title,
      description,
      status,
      loginId: assignee,
      link,
    });
   const tasks= await this.findAll()
   return {
    data: tasks,
    message: 'Retrieved Successfully',
    status: 'success',
  };
  }

  async findAll() {
    const tasks = await this.taskModel.findAll({
      include: [{ model: Login }]
    });
    return {
      data: tasks,
      message: 'Retrieved Successfully',
      status: 'success',
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} task`;
  }

  update(id: number) {
    return `This action updates a #${id} task`;
  }

  remove(id: number) {
    return `This action removes a #${id} task`;
  }
}
