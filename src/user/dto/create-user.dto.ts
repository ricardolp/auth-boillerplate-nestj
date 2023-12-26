import { IsNotEmpty, IsEmail, IsIn, IsOptional, IsUrl } from 'class-validator'


export class CreateUserDto {
    @IsNotEmpty()
    first_name: string

    @IsNotEmpty()
    last_name: string

    @IsNotEmpty()
    @IsEmail()
    email: string
    
    @IsOptional()
    @IsUrl()
    avatar: string

    @IsNotEmpty()
    password: string
}
