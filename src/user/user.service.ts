import { Injectable,HttpException,HttpStatus, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';


@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
      ) {}

      async createUser(data: CreateUserDto) {
          const user = this.usersRepository.create(data);
          await this.usersRepository.save(user);
          return user;
      }

      async findByEmail(email:string){
        let result:any;
        try {
          result =  await this.usersRepository.findOneByOrFail({
            email: email,
        });
        } catch (error) {
          result=null;  
        }
        return result; 
      }

      //admin functions

      async findAll(){
        return this.usersRepository.find();
      }

      async find(){
        return this.usersRepository.find({
          select: {
              email: true,
          },
      });
      }

      async findByName(name:string):Promise<User>{
        return await this.usersRepository.findOne({
            where: {
              name: name,
            },
          });
      }

      async findOneById(id: number) {
        if (!id) {
          return null;
        }
        const result = await this.usersRepository.findOneBy({ id:id });
        return result;
      }

      async updateUser(id: number, data: Partial<User>) {
        await this.usersRepository.update({ id }, data);
        return await this.usersRepository.findOne({ where:{
            id:id
        } });
      }

      async deleteUser(id: number) {
        await this.usersRepository.delete({ id });
        return { deleted: true };
      }
}


