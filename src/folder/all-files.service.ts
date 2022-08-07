import { All, BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { AllFiles } from './all-files.model';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AllFilesService {

    constructor(@InjectRepository(AllFiles)
    private allFilesRepository:Repository<AllFiles>){}


    async createFile(fileName:string,data:Buffer,path:string,pages:number){
        let result = await this.findByFileName(fileName);

        if(!result){
            const file = this.allFilesRepository.create({filename:fileName,data:data,path:path,pages:pages});
            return await this.allFilesRepository.save(file);
        }
        else{
            try {
                throw new BadRequestException("File already exists");
            } catch (error) {
                console.log(error)
            }
        }
    }

    async findByFileName(fileName:string){
        let result:any;
        try {
            let record = await this.allFilesRepository.findOne({
                where: {
                  filename: fileName,
                },
              });
        
            record ? result=true : result= false
            return result;
        } catch (error) {
            result=false
        }
        return result;
    }

    async findAll(){
        return await this.allFilesRepository.find()
    }


}
