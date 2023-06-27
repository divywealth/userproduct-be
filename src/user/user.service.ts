import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly UserRepository: Repository<User>,
  ) {

  }

  findAll() {
    try {
      return this.UserRepository.find();
    } catch (error) {
      throw error.message;
    }
  }

  async findOne(id: number): Promise<User> {
    const existingUser = await this.UserRepository.findOne({
      where: {
        id: id,
      },
    });
    if (existingUser == null) {
      throw new HttpException('No user with such id', HttpStatus.BAD_REQUEST);
    } else {
      return existingUser;
    }
  }
}
