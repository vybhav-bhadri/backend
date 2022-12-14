import { Body, Controller, Delete, Get,HttpStatus, Param, Patch, Post, Session, UseGuards} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { SignInUserDto } from './dto/sign-in.dto';
import { UserDto } from './dto/user.dto';
import { AuthService } from './auth.service';
import { Serialize } from 'src/interceptors/serialise.interceptors';
import { AuthGuard } from '../guards/auth.guard';
import { User } from './user.entity';
import { CurrentUser } from './decorators/current-user.decorator';

//to return only bid,name,email
@Serialize(UserDto)
@Controller('user')
export class UserController {

    constructor(private readonly userService:UserService,
      private authService: AuthService,){
    }

  @Post('/signout')
  signOut(@Session() session: any) {
    session.userId = null;
  }

  @Get('/whoami')
  @UseGuards(AuthGuard)
  whoAmI(@CurrentUser() user: User) {
    return user;
  }

  @Post('/signup')
  async createUser(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.authService.signup(body);
    console.log(session)
    session.userId = user.id;
    return user;
  }

  @Post('/signin')
  async signin(@Body() body: SignInUserDto, @Session() session: any) {
    const user = await this.authService.signin(body);
    session.userId = user.id;
    return user;
  }

  //admin controllers

  @Get('/admin/email')
  async getUserByEmail(@Body('email') email:string){
      const result = await this.userService.findByEmail(email)
      return result;
  }

  @Get('/admin/users')
  async getAll(){
    const result = await this.userService.findAll()
    return result;
  }

  @Get('/admin/:id')
  async readUser(@Param('id') id: number) {
      console.log(id)
      const data =  await this.userService.findOneById(id);
      return {
        statusCode: HttpStatus.OK,
        message: 'User fetched successfully',
        data,
      };
  }

  // @Post('admin')
  //   async createAdmin(@Body() data: CreateUserDto) {
  //      const user = await this.userService.createUser(data);
  //     return {
  //       statusCode: HttpStatus.OK,
  //       message: 'admin created successfully',
  //       user
  //     };
  // }

  @Patch('admin/:id')
    async uppdateUser(@Param('id') id: number, @Body() data: Partial<CreateUserDto>) {
      await this.userService.updateUser(id, data);
      return {
        statusCode: HttpStatus.OK,
        message: 'User updated successfully',
      };
    }

    @Delete('admin/:id')
    async deleteUser(@Param('id') id: number) {
      await this.userService.deleteUser(id);
      return {
        statusCode: HttpStatus.OK,
        message: 'User deleted successfully',
      };
    }
}
