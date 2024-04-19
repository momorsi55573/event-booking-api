/* eslint-disable prettier/prettier */
import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthDto, UserDto } from 'src/utils/dto';
import * as argon from 'argon2';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private userModel: Model<UserDto>, private jwt: JwtService) {}

  async createUser(dto: UserDto): Promise<string> {
    try {
        const hash = await argon.hash(dto.password);
      await this.userModel.create(
        { password: hash,
            name: dto.name,
            email: dto.email,
          },
        
      )
      return 'created'
    } catch (error) {
     if (error.code === 11000) {
       throw new ForbiddenException('Email already exists');
     }
      throw error;
    }
  }

  async auth(dto: AuthDto): Promise<{ access_token: string }> {
    try {
      const user = await this.userModel.findOne({
        email: dto.email,
      })
      if (!user) {
        return { access_token: 'user incorrect' };
      }
      const pwMatches = await argon.verify(user.password, dto.password)

      if (!pwMatches) {
        return { access_token: 'password incorrect' };
      }

      return await this.signUser(
        user.id,
      );
    } catch (e) {
      throw e;
    }
  }

  async signUser(
    sub: string,
  
  ): Promise<{ access_token: string }> {
    try {
      const payload = {
        id: sub,
      };
      const token = await this.jwt.signAsync({ payload });

      return {
        access_token: token,
      };
    } catch (e) {
      throw e;
    }
  }

}
