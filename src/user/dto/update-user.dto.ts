import { MinLength, IsEmail, IsStrongPassword, IsIn, IsOptional} from "class-validator"

export class UpdateUserDto {
    @IsEmail()
    @IsOptional()
    email: string

    @IsStrongPassword()
    @IsOptional()
    password: string

    @MinLength(1)
    @IsOptional()
    surname: string

    @MinLength(1)
    @IsOptional()
    lastname: string

    @IsOptional()
    @IsIn(['STUDENT', 'ADMIN', 'LIBRARIAN'])
    role: 'STUDENT'|'ADMIN'|'LIBRARIAN'

    @IsOptional()
    whiteliststatus: boolean
}
