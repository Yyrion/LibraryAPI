import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { LoginUserDto } from 'src/user/dto/login-user.dto';
import { UserService } from 'src/user/user.service';
import { hashPassword, verifyPassword } from 'src/utils/encrypt';

@Injectable()
export class AuthService {

    constructor(private userService: UserService) {}

    async signup(createUserDto: CreateUserDto) {

        if (await this.userService.findIfEmailIsUsed(createUserDto.email)) {
            throw new BadRequestException('Email already in use');
        }

        const password = await hashPassword(createUserDto.password);

        return this.userService.create(createUserDto.email, password, createUserDto.surname, createUserDto.lastname);
    }

    async signin(loginUserDto: LoginUserDto) {
        const user = await this.userService.findByEmail(loginUserDto.email);

        if (!user) {
            throw new NotFoundException()
        }
        if (!user.password || !(await verifyPassword(loginUserDto.password, user.password))) {
            throw new BadRequestException("Bad user/password combination")
        }

        return user;
    }
}
