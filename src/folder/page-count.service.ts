import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as fs from 'fs'
import * as path from 'path'
import * as pdf from 'pdf-page-counter';
import { Repository } from 'typeorm';
import { PageCount } from './page-count.model';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PageCountService {

    constructor(@InjectRepository(PageCount)
    private pageCountRepository:Repository<PageCount>){}

    async countPageInPdf(filePath:string){
      let dataBuffer = fs.readFileSync(filePath)
    
      let pages:number = await pdf(dataBuffer).then(function(data) {
        // number of pages
        console.log(`pages in ${filePath} : ${data.numpages}`);
        let page = data.numpages;
        return page;
      });

      this.createPageRecord(pages,filePath);
      return pages;
    }

    async getTotalPageCount(){
        let records = await this.findAll()
        let totalPages = 0;
        records.forEach((record) => {
            let pages = record.pages;
            totalPages = totalPages + pages;
        });

        return totalPages;
    }

    async createPageRecord(pages:number,fileName:string){
        let result = await this.findByFileName(fileName);

        if(!result){
            const pageRecord = this.pageCountRepository.create({pages:pages,fileName:fileName});
            return await this.pageCountRepository.save(pageRecord);
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
            let record = await this.pageCountRepository.findOne({
                where: {
                  fileName: fileName,
                },
              });
        
            record ? result=true : result= false
            return result;
        } catch (error) {
            result=null
        }
        return result;
    }

    async findAll(){
        return await this.pageCountRepository.find()
    }


}
