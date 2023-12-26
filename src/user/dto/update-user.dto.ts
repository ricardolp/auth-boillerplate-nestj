import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsEmail, IsIn, IsNotEmpty, IsOptional, IsUrl } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @IsOptional()
    first_name: string

    @IsOptional()
    last_name: string

    @IsOptional()
    @IsEmail()
    email: string
    
    @IsOptional()
    @IsUrl()
    avatar: string

    @IsOptional()
    password: string

    @IsOptional()
    nickname: string
    
    @IsOptional()
    status: string
}
