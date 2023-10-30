import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Login } from './login/entities/login..entity';
import { LoginModule } from './login/login..module';
import { Task } from './tasks/entities/task.entity';
import { TasksModule } from './tasks/tasks.module';
import * as dotenv from 'dotenv';


dotenv.config();
console.log( Boolean(process.env.autoloadmodels),'env')
@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: process.env.host,
      port: 3306,
      username: process.env.db_username,
      password: process.env.db_password,
      database: process.env.database,
      models: [Login, Task],
      autoLoadModels:  Boolean(process.env.autoloadmodels),

      synchronize: Boolean(process.env.synchronize),
    }),
    LoginModule,
    TasksModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
