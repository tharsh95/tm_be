import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';
import { Login } from './entities/login..entity';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class LoginService {
  constructor(
    @InjectModel(Login) private loginModel: typeof Login,
    private jwtService: JwtService,
  ) {}

  async login(body: any) {
    const { email, password } = body;
    if (!email && !password) {
      return {
        message: 'Email or Password is empty',
        status: 'failure',
      };
    }
    const user = await this.loginModel.findOne({
      where: {
        email,
      },
    });
    if (!user) {
      return {
        message: 'Unauthorized',
        status: 'failure',
      };
    }
    // if (await bcrypt.compare(password, user.password)) {
    if (user.password === password) {
      const jwt = await this.jwtService.signAsync(body);

      return {
        message: 'Login Successfully',
        status: 'success',
        token: jwt,
      };
    } else {
      return { message: 'Wrong Password', status: 'failure' };
    }
  }

  async getUser(body: any) {
    const { token, isGoogle } = body;
    if (isGoogle === 'true') {
      const user = await this.decodeGoogleAuthToken(token);
      return {
        data: user,
      };
    } else {
      const user = await this.decodeJwt(token);
      return {
        data: user,
      };
    }
  }

  async add(body: any) {
    const { name, email, role, password } = body;
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await this.loginModel.findOne({
      where: {
        email,
      },
    });
    if (!user) {
      try {
        await this.loginModel.create({
          name,
          email,
          role,
          password: hashedPassword,
        });
        const { data } = await this.list();
        return {
          data,
          message: 'Added Successfully',
          status: 'success',
        };
      } catch (e) {
        return {
          message: 'Error Adding',
          status: 'failure',
        };
      }
    } else {
      return {
        message: 'User Exists',
        status: 'failure',
      };
    }
  }

  async list() {
    const data = await this.loginModel.findAll();
    return {
      data,
    };
  }

  async decodeGoogleAuthToken(token: string): Promise<any> {
    try {
      const decoded = jwt.decode(token, { complete: true });
      const user = await this.loginModel.findOne({
        where: {
          email: decoded.payload['email'],
        },
        attributes: ['name', 'email', 'role'],
      });
      if (!user) {
        return {
          message: 'Unauthorized',
          status: 'failure',
        };
      }
      return {
        data: user,
        status: 'success',
        message: 'Login Successfully',
      };
    } catch (error) {
      throw new Error('Invalid token');
    }
  }

  async decodeJwt(token: string) {
    const data = await this.jwtService.verifyAsync(token);

    const user = await this.loginModel.findOne({
      where: {
        email: data['email'],
      },
      attributes: ['name', 'email', 'role'],
    });
    return {
      data: user,
    };
  }

  async verify(body: any) {
    const { token } = body;
    try {
      const decoded = jwt.decode(token, { complete: true });
      const user = await this.loginModel.findOne({
        where: {
          email: decoded.payload['email'],
        },
        attributes: ['name', 'email', 'role'],
      });
      if (!user) {
        return {
          message: 'Unauthorized',
          status: 'failure',
        };
      }
      else{

        return {
            status: 'success',
            message: 'Login Successfully',
          };
        }
    } catch (error) {
      throw new Error('Invalid token');
    }
  }
}
