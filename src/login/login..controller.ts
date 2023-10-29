import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  Req,
} from '@nestjs/common';
import { LoginService } from './login..service';
import { UpdateLoginDto } from './dto/update-login..dto';
import { Response, Request } from 'express';
import { JwtService } from '@nestjs/jwt';

@Controller('login')
export class LoginController {
  constructor(private loginService: LoginService) {}

  @Post()
  async login(@Body() body: any, @Res({ passthrough: true }) res: Response) {
    const data = await this.loginService.login(body);
    res.status(200).json(data);
  }
  @Post("verify")
  async verify(@Body() body:any,@Res () res:Response){
    const data=await this.loginService.verify(body)
    res.json(data)
  }

  @Post('getuser')
  async getToken(@Body() body: any, @Res() res: Response) {
    // const { loggedIn, isGoogle } = body;
    const data = await this.loginService.getUser(body);
    res.status(200).json(data);
  }

  @Post('/add')
  async add(@Body() body: any, @Res() res: Response) {
    const data = await this.loginService.add(body);
    res.json(data);
  }

  @Get('/list')
  async list(@Res() res: Response) {
    const data = await this.loginService.list();
    res.json(data);
  }
}
