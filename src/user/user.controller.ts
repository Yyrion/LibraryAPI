import { Controller, Get, Post, Body, Param, Delete, Session, Put, UseInterceptors, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthService } from 'src/auth/auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { SerializeInterceptor } from './interceptor/serializeuser.interceptor';
import { AuthGuard } from 'src/guards/auth.guard';
import { AdminGuard } from 'src/guards/admin.guard';

@Controller('auth')
export class UserController {
  constructor(private readonly userService: UserService, private readonly authService: AuthService) {}

  @Post('/signup')
  @UseInterceptors(SerializeInterceptor)
  async signup(@Body() createUserDto: CreateUserDto, @Session() session: any) {
    const user = await this.authService.signup(createUserDto);
    session.userId = user.id;
    return user;
  }

  @Post('/signin')
  @UseInterceptors(SerializeInterceptor)
  async signin(@Body() loginUserDto: LoginUserDto, @Session() session: any) {
    const user = await this.authService.signin(loginUserDto);
    session.userId = user.id;
    return user;
  }

  @Post('/signout')
  @UseGuards(AuthGuard)
  async signout(@Session() session: any) {
    session.userId = null;
    return 'ok';
  }

  @Get('/me')
  @UseGuards(AuthGuard)
  @UseInterceptors(SerializeInterceptor)
  async whoAmI(@Session() session: any) {
    return this.userService.findOne(session.userId);
  }

  @Get(':id')
  @UseGuards(AdminGuard)
  @UseInterceptors(SerializeInterceptor)
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Get('/list')
  @UseGuards(AdminGuard)
  findAll() {
    return this.userService.findAll();
  }

  @Put(':id')
  @UseGuards(AdminGuard)
  @UseInterceptors(SerializeInterceptor)
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  @UseGuards(AdminGuard)
  @UseInterceptors(SerializeInterceptor)
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
