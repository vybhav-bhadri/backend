import {
    Injectable,
    BadRequestException,
    NotFoundException,
  } from '@nestjs/common';
  import { UserService } from './user.service';
  import { randomBytes, scrypt as _scrypt } from 'crypto';
  import { promisify } from 'util';
import { CreateUserDto } from './dto/create-user.dto';
import { SignInUserDto } from './dto/sign-in.dto';
  
  const scrypt = promisify(_scrypt);
  
  @Injectable()
  export class AuthService {
    constructor(private userService: UserService) {}
  
    async signup(UserDto:CreateUserDto) {
      // See if email is in use
      let {name,email,password} = UserDto;
      let user = await this.userService.findByEmail(email);

      if (user) {
        throw new BadRequestException('email in use, use another email');
      }
  
      // Hash the users password
      // Generate a salt
      const salt = randomBytes(8).toString('hex');
  
      // Hash the salt and the password together
      const hash = (await scrypt(password, salt, 32)) as Buffer;
  
      // Join the hashed result and the salt together
      const result = salt + '.' + hash.toString('hex');

      UserDto.password = result

      // Create a new user and save it
      let newuser = await this.userService.createUser(UserDto);
  
      // return the user
      return newuser;
    }
  
    async signin(userDto:SignInUserDto) {
        const {email,password} = userDto
      const user= await this.userService.findByEmail(email);
      
      if (!user) {
        throw new NotFoundException('user not found, try again');
      }
  
      const [salt, storedHash] = user.password.split('.');
  
      const hash = (await scrypt(password, salt, 32)) as Buffer;
  
      if (storedHash !== hash.toString('hex')) {
        throw new BadRequestException('wrong password, try again');
      }
  
      return user;
    }
  }
  