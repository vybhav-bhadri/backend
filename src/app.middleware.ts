import { JwtService } from '@nestjs/jwt';
import { Injectable, NestMiddleware, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { UserService } from './user/user.service';
import { User } from './user/user.entity';
interface UserRequest extends Request {
    user: User
}
@Injectable()
export class isAuthenticated implements NestMiddleware {
    constructor(private readonly jwt: JwtService, private readonly userService: UserService) { }
    async use(req: UserRequest, res: Response, next: NextFunction) {
        try{
            console.log("req",req.headers)
            if (
                req.headers.authorization 
                &&
                req.headers.authorization.startsWith('Bearer')
            ) {
                const token = req.headers.authorization.split(' ')[1];
                console.log("tokwn",token)
                const decoded = this.jwt.decode(token);
                console.log("decoded",decoded)
                const user = await this.userService.findByEmail('')
                if (user) {
                    req.user = user
                    next()
                } else {
                    throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED)
                    
                }
            } else {
                throw new HttpException('No token found', HttpStatus.NOT_FOUND)
                
            }
        }catch {
         throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED)
       }
    }
}