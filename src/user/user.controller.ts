import { Controller, Get, Post, Body, Param, Delete, Session, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthService } from 'src/auth/auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('auth')
export class UserController {
  constructor(private readonly userService: UserService, private readonly authService: AuthService) {}

  @Get()
  test() {
    return "Hello Gentileman"
  }

  @Post('/signup')
  async signup(@Body() createUserDto: CreateUserDto, @Session() session: any) {
    const user = await this.authService.signup(createUserDto);
    session.userId = user.id;
    return user;
  }

  @Post('/signin')
  async signin(@Body() loginUserDto: LoginUserDto, @Session() session: any) {
    const user = await this.authService.signin(loginUserDto);
    session.userId = user.id;
    return user;
  }

  @Post('/signout')
  async signout(@Session() session: any) {
    console.log(session.userId)
    session.userId = null;
    return 'ok';
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
