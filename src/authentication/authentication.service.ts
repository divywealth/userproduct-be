import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAuthenticationDto } from './dto/create-authentication.dto';
import { UpdateAuthenticationDto } from './dto/update-authentication.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class AuthenticationService {
  constructor(
    @InjectRepository(User)
    private readonly UserRepository: Repository<User>,
    private jwtService: JwtService,
  ) {

  }
  async create(createAuthenticationDto: CreateAuthenticationDto) {
    const existingUser = await this.UserRepository.findOne({
      where: {
        email: createAuthenticationDto.email,
      },
    });
    if (existingUser != null) {
      throw new HttpException('user already exist', HttpStatus.BAD_REQUEST);
    } else {
      const createdUser = await this.UserRepository.save(
        createAuthenticationDto,
      );
      console.log(createdUser);
      return {
        user: createdUser,
        access_token: await this.jwtService.signAsync({ user: createdUser }),
      };
    }
  }

  async loginUser(loginUserDto: LoginUserDto) {
    if (!loginUserDto.phoneNo || !loginUserDto.password) {
      throw new HttpException('email and password required', HttpStatus.BAD_REQUEST);
    }
    const existingUser = await this.UserRepository.findOne({
      where: {
        phoneNo: loginUserDto.phoneNo,
      },
    });
    if (existingUser == null) {
      throw new HttpException("PhoneNo dosen't have an account try creating an account instead", HttpStatus.BAD_REQUEST);
    } else if (
      !(await bcrypt.compare(loginUserDto.password, existingUser.password))
    ) {
      throw new HttpException('Incorrect Password', HttpStatus.BAD_REQUEST);
    } else {
      return {
        user: existingUser,
        access_token: this.jwtService.sign({ user: existingUser }),
      };
    }
  }

  update(id: number, updateAuthenticationDto: UpdateAuthenticationDto) {
    return `This action updates a #${id} authentication`;
  }

  remove(id: number) {
    return `This action removes a #${id} authentication`;
  }
}
