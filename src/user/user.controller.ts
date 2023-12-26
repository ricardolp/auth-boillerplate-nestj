import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException, HttpStatus, Query, NotFoundException, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { deserialize, serialize } from 'class-transformer';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    let user = await this.userService.findByEmail(createUserDto.email);

    if (user) {
      throw new BadRequestException( 'Account with this email already exists.' );
    }

    user = await this.userService.create(createUserDto);

    return {
      statusCode: HttpStatus.OK,
      message: 'ok',
      data: new User( user )
   };
  }

  @Get()
  async findAll(@Query() q: string) {
    const users = serialize(await this.userService.findAll(q));
    
    return {
      statusCode: HttpStatus.OK,
      message: 'ok',
      data: deserialize(User, users)
   };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const user =  await this.userService.findOne(id)
    
    if (!user) {
      throw new NotFoundException( 'Resource not found.' );
    }

    return {
      statusCode: HttpStatus.OK,
      message: 'ok',
      data: new User( user )
   };
   
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    let user =  await this.userService.findOne(id)
    
    if (!user) {
      throw new NotFoundException( 'Resource not found.' );
    }

    user = await this.userService.update(id, updateUserDto);
    return {
      statusCode: HttpStatus.OK,
      message: 'ok',
      data: new User( user )
   };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    let user =  await this.userService.findOne(id)
    
    if (!user) {
      throw new NotFoundException( 'Resource not found.' );
    }

    user = await this.userService.remove(id);
    return {
      statusCode: HttpStatus.OK,
      message: 'ok',
      data: new User( user )
   };
  }
}
