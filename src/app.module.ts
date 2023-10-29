import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Login } from './login/entities/login..entity';
import { LoginModule } from './login/login..module';
import { Task } from './tasks/entities/task.entity';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '12345678',
      database: 'task_management',
      models: [Login,Task],
    }),
    LoginModule,
    TasksModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
