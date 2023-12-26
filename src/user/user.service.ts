import { randomUUID } from 'node:crypto';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/database/prisma.service';
import { processQuery } from 'src/utils';


@Injectable()
export class UserService {
  constructor(private prisma: PrismaService){}

  async create(createUserDto: CreateUserDto) {
    const { first_name, last_name, email, password, avatar } = createUserDto;

    const user = await this.prisma.user.create({
      data: {
        id: randomUUID(), 
        first_name,
        last_name,
        email,
        password: password,
        avatar: avatar || ''
      }
    });

    return user;
  }

  async findAll(q: any) {
    const query = processQuery(q)
    return await this.prisma.user.findMany({ where: query });
  }

  async findByEmail(email: string) {
    const user = await this.prisma.user.findUnique({where: { email }})
    return user
  }


  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({where: { id }})
    return user
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    let { first_name, last_name, avatar, nickname, password } = updateUserDto;

    const find = await this.prisma.user.findUnique({where: {id}});

    first_name = first_name || find.first_name;
    last_name = last_name || find.last_name;
    avatar = avatar || find.avatar;
    nickname = nickname || find.nickname;
    password = password || find.password;

    const user = this.prisma.user.update({
      where: {
        id
      },
      data: {
        first_name,
        last_name,
        avatar, 
        nickname,
        password
      } 
    });

    return user;
  }

  remove(id: string) {
    const user = this.prisma.user.delete({ where: { id }});
    return user;
  }
}
