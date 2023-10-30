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
      isDeleted: 0,
    });
    const tasks = await this.findAll();
    return {
      data: tasks,
      message: 'Retrieved Successfully',
      status: 'success',
    };
  }

  async findAll() {
    const tasks = await this.taskModel.findAll({
      where: { isDeleted: 0 },
      include: [{ model: Login }],
    });
    return {
      data: tasks,
      message: 'Retrieved Successfully',
      status: 'success',
    };
  }
  async findTrash() {
    const tasks = await this.taskModel.findAll({
      where: { isDeleted: 1 },
      include: [{ model: Login }],
    });
    return {
      data: tasks,
      message: 'Retrieved Successfully',
      status: 'success',
    };
  }
  async recover(id: number) {
    await this.taskModel.update(
      {
        isDeleted: 0,
        deletedBy: null,
      },
      {
        where: { id },
      },
    );
    const tasks=await this.findTrash()
    return {
      data: tasks,
      message: 'Retrieved Successfully',
      status: 'success',
    };
  }

  async findOne(id: number) {
    // if (id) {
    const task = await this.taskModel.findAll({
      where: { loginId: id, isDeleted: 0 },
    });
    return task;
    // }
  }

  async update(id: number, body: any) {
    const { title, description, link, status, loginId, assignee } = body;
    console.log(body);
    await this.taskModel.update(
      {
        title,
        description,
        status,
        link,
        loginId: assignee,
      },
      { where: { id } },
    );
    const d = await this.taskModel.findOne({ where: { id } });
    return d;
  }

  async remove(id: number, body: any) {
    const { user, role } = body;
    if (role === 'Manager') {
      await this.taskModel.update(
        { isDeleted: true, deletedBy: user },
        { where: { id } },
      );
      const data = await this.findAll();
      return { data, status: 'success' };
    } else {
      return { message: 'Unauthorized', status: 'failure' };
    }
  }
}
