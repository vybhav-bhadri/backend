import { Body, Controller, Delete, Get, HttpStatus, Param, Post, UploadedFiles, Put, Req, Res } from "@nestjs/common";
import { AuthService } from "src/service/auth-user.service";
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from "src/user/dto/create-user.dto";
import { SignInUserDto } from "src/user/dto/sign-in.dto";

@Controller('/auth')
export class AuthUserController {
    constructor(private readonly authService:AuthService,
        private jwtService: JwtService
    ) { }

    @Post('/signup')
  async createUser(@Res() response, @Body() body: CreateUserDto) {
    const newUser = await this.authService.signup(body);
    return response.status(HttpStatus.CREATED).json({
      newUser
  })
  }

  @Post('/signin')
  async signin(@Res() response, @Body() body: SignInUserDto) {
    const token = await this.authService.signin(body,this.jwtService);
    return response.status(HttpStatus.OK).json(token);
  }
}